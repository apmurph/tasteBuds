var express = require("express");
var router  = express.Router({mergeParams: true});
var Restaurant = require("../models/restaurant");
var Comment = require("../models/comment");
var middleware = require("../middleware")

//comments new ===========================
router.get("/new", middleware.isLoggedin, function(req, res){
    //find restaurant by id
    Restaurant.findById(req.params.id, function(err, restaurant){
       if (err){
           console.log(err)
       } else {
            res.render("comments/new", {restaurant: restaurant});           
       }
    });

});

//comments create ===========================
router.post("/", middleware.isLoggedin, function(req, res){
    //lookup restaurant using ID
    Restaurant.findById(req.params.id, function(err, restaurant){
        if (err){
            req.flash("error", "Something went wrong");
            res.redirect("/restaurants");
        } else {
            //create new comment
            Comment.create(req.body.comment, function(err, comment){
                if (err) {
                    req.flash("error", "Something went wrong");
                    console.log(err)
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //connect new comment to restaurant
                    comment.save();
                    restaurant.comments.push(comment);
                    restaurant.save();
                    console.log(comment);
                    //redirect to restaurant show page 
                    req.flash("success", "Comment uploaded!");
                    res.redirect('/restaurants/' + restaurant._id);
                }
            })
 
        }
    })
});

//comments edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {restaurant_id: req.params.id, comment: foundComment}) 
        }
    });
});

//comments update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err) {
            res.redirect("back");
        } else {
            res.redirect("/restaurants/" + req.params.id)
        }
    });
});

//comments destroy route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if (err) {
            res.redirect("back");
        } else {
             req.flash("success", "Comment delteted");
            res.redirect("/restaurants/" + req.params.id);
        }
    });
});





module.exports = router;