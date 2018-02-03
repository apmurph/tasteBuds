var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    blogger: false,
    image: String,
    description: String,
    restaurants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Restaurant"
        }
    ]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);