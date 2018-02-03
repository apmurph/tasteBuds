var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalPassport = require("passport-local"),
    methodOverride = require("method-override"),
    Restaurant  = require("./models/restaurant"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds")

// requiring routes   
var commentRoutes    = require("./routes/comments"),
    restaurantRoutes = require("./routes/restaurants"),
    indexRoutes       = require("./routes/index"),
    bloggersRoutes = require("./routes/bloggers"),
    apiblognoteRoutes = require("./routes/apiblognotes")
  
mongoose.connect("mongodb://localhost/taste_buds_v3");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(flash());


// seedDB(); //seed the database 

// PASSPORT CONFIGURATION

app.use(require("express-session")({
    secret: "",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalPassport(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware that works on all routes
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/restaurants/:id/comments", commentRoutes);
app.use("/api/blognotes", apiblognoteRoutes);
app.use("/bloggers", bloggersRoutes);



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The TasteBuddies Server has Started!!")
});