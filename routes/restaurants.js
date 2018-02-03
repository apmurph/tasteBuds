var express = require("express");
var router  = express.Router();
var Restaurant = require("../models/restaurant");
var Blogger = require("../models/user");
var middleware = require("../middleware")

// INDEX Route: show all restaurants
router.get("/", function(req, res){
    //get all restaurants from BD and then render that file

    Restaurant.find().sort({name: 1}).populate("authDetails").exec(function(err, allRestaurants){
        if(err){
            console.log(err);
        } else {
                res.render("restaurants/index", {restaurants: allRestaurants}) 
        }
    });
});

// CREATE Route: add new restaurant to DB
router.post("/", middleware.isLoggedin, function(req, res){
//lookup blogger using ID
    Blogger.findById(req.user._id, function(err, blogger){
        if (err){
            req.flash("error", "Something went wrong");
            res.redirect("/restaurants");    
        } else {
            console.log(blogger);
            //create new restaurant    
            var name = req.body.name;
            var address = req.body.address;
            var postcode = req.body.postcode;
            var contact = req.body.contact;
            var website = req.body.website;
            var email = req.body.email;
            var image = req.body.image;
            var desc = req.body.description;
            var quote = req.body.quote;
            var author = {
                id: req.user._id
            };
            var authDetails = [];
            var ratings = {
                taste: req.body.taste,
                price: req.body.price,
                service: req.body.service
            }
            var newRestaurant = {name: name, address: address, postcode: postcode, contact: contact, website: website, email: email, image: image, description: desc, quote: quote, author: author, authDetails: authDetails, ratings: ratings}
            //create a new restaurant and save to the DB
            Restaurant.create(newRestaurant, function(err, restaurant){
                if(err){
                    console.log(err);
                } else { 
                     restaurant.authDetails.push(blogger);
                     restaurant.save();
                     blogger.restaurants.push(restaurant);
                     blogger.save();                    
                     res.redirect("/restaurants");
                }
            })
        }
    })
});

// NEW Route: show form to create new restaurant
router.get("/new", middleware.isLoggedin, function(req,res){
    res.render("restaurants/new")
});

// SHOW Route: show information about selected restaurant
router.get("/:id", function(req, res) {
    //find the restaurant with provided ID
    Restaurant.findById(req.params.id).populate("authDetails").populate("comments").exec(function(err, foundRestaurant){
       if(err){
           console.log(err);
       }  else {
                    res.render("restaurants/show", {restaurant: foundRestaurant});  
       }
    });
});

// Edit Restaurant Route
router.get("/:id/edit", middleware.checkRestaurantOwnership, function(req, res) {
        Restaurant.findById(req.params.id, function(err, foundRestaurant){
            res.render("restaurants/edit", {restaurant: foundRestaurant});
        });
});

// Update Restaurant Route
router.put("/:id", middleware.checkRestaurantOwnership, function(req,res){
    //find and update the correct restaurant
    Restaurant.findByIdAndUpdate(req.params.id, req.body.restaurant, function(err, updateRestaurant){
        if (err) {
            res.redirect("/restaurant");
        } else {
            res.redirect("/restaurants/" + req.params.id);
        }
    });
});

//Destroy Restaurant Route
router.delete("/:id", function(req, res){
    Restaurant.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            res.redirect("/restaurants");
        } else {
            res.redirect("/restaurants");
        }
    });
});





module.exports = router;