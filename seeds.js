var mongoose = require("mongoose");
var Restaurant = require("./models/restaurant");
var Comment  = require("./models/comment");

//create some starter data for testing and loop trought using Restaurant.create
var data = [
    { 
        name: "Camp Applie",
        image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
        description: "Java frappuccino roast java grounds aftertaste decaffeinated. Skinny as ristretto, crema milk, eu, a brewed id eu french press extraction. Trifecta doppio, iced blue mountain pumpkin spice eu siphon. Java mug, cup milk cappuccino grounds iced cultivar. Aroma, plunger pot, latte extraction breve latte whipped aftertaste beans arabica kopi-luwak brewed."
    },
    { 
        name: "Camp Bable",
        image: "https://farm5.staticflickr.com/4016/4369518024_0f64300987.jpg",
        description: "Java frappuccino roast java grounds aftertaste decaffeinated. Skinny as ristretto, crema milk, eu, a brewed id eu french press extraction. Trifecta doppio, iced blue mountain pumpkin spice eu siphon. Java mug, cup milk cappuccino grounds iced cultivar. Aroma, plunger pot, latte extraction breve latte whipped aftertaste beans arabica kopi-luwak brewed."
    },
    { 
        name: "Camp Campy",
        image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg",
        description: "Java frappuccino roast java grounds aftertaste decaffeinated. Skinny as ristretto, crema milk, eu, a brewed id eu french press extraction. Trifecta doppio, iced blue mountain pumpkin spice eu siphon. Java mug, cup milk cappuccino grounds iced cultivar. Aroma, plunger pot, latte extraction breve latte whipped aftertaste beans arabica kopi-luwak brewed."
    }
    ]


function seedDB(){
    //removed all restaurants
    Restaurant.remove({}, function(err){
        if (err) {
            console.log(err);
        }
        console.log('removed restaurants!!')
        //add a few restaurants
        data.forEach(function(seed){
            Restaurant.create(seed, function(err, restaurant){
                if(err){
                    console.log(err)
                } else {
                    console.log('added a restaurant!!')
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish I knew what i was doing!!",
                            author: "Murph"
                        }, function(err, comment){
                            if (err){
                                console.log(err);
                            } else {
                                restaurant.comments.push(comment);
                                restaurant.save();
                                console.log("Created a new comment!")
                            }
                        });
                        
                }
            })
        })
    });  
}


module.exports = seedDB;
