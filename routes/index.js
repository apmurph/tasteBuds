var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User  = require("../models/user");

 router.get("/", function(req, res){
    res.render("landing")
});

// ===========================
//======= Auth Routes ========
// ===========================

//show register form
 router.get("/register", function(req, res){
    res.render("register");
});
//handle sign up logic
 router.post("/register", function(req, res){
    var username = req.body.username;
    var blogger = req.body.blogger;
    var image = req.body.image;
    var desc = req.body.description;

    var newUser = new User({username: username, blogger: blogger,  image: image, description: desc});
    User.register(newUser, req.body.password, function(err, user){
        if(err) {
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to YelpCamp " + user.username);
           res.redirect("/restaurants");
        });
    })  
})

//show login form
 router.get("/login", function(req, res){
    res.render("login");
});

 router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/restaurants",
        failureRedirect: "/login"
    }), function(req, res){

});

// logout route
 router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/restaurants")
});


module.exports =  router;