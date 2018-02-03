var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Restaurant = require("../models/restaurant");
var middleware = require("../middleware")


router.get("/", function(req, res){
    User.find({}, function(err, allBloggers){
        if(err){
            console.log(err);
        } else {
                res.render("bloggers/index", {bloggers: allBloggers}) 
        }
    });
});

router.get("/notes", function(req, res){
    res.render("bloggers/notes") 
});

// SHOW Route: show information about selected blogger
router.get("/:id", function(req, res) {
    //find the blogger with provided ID
    User.findById(req.params.id).populate("restaurants").exec(function(err, foundBlogger){
       if(err){
           console.log(err);
       }  else {
             // render show template with that blogger
             res.render("bloggers/show", {blogger: foundBlogger});
       }
    });
});

// Edit Blogger Route
router.get("/:id/edit", middleware.checkBloggerOwnership, function(req, res) {
        User.findById(req.params.id, function(err, foundBlogger){
            res.render("bloggers/edit", {blogger: foundBlogger});
        });
});

// Update blogger Route
router.put("/:id", middleware.checkBloggerOwnership, function(req,res){
    //find and update the correct blogger
    User.findByIdAndUpdate(req.params.id, req.body.blogger, function(err, updateBlogger){
        if (err) {
            res.redirect("/bloggers");
        } else {
            res.redirect("/bloggers/" + req.params.id);
        }
    });
});

//Destroy Blogger Route
router.delete("/:id", function(req, res){
    User.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            res.redirect("/bloggers");
        } else {
            res.redirect("/bloggers");
        }
    });
});
  
module.exports = router;