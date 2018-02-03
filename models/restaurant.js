var  mongoose = require("mongoose");

//SCHEMA SETUP
var restaurantSchema = new mongoose.Schema({
    name: String,
    address: String,
    postcode: String,
    contact: String,
    website: String,
    email: String,
    image: String,
    description: String,
    quote: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    authDetails: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    ratings: {
        taste: String,
        price: String,
        service: String,
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Restaurant", restaurantSchema);



