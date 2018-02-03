var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/taste_buds');

mongoose.Promise = Promise;

module.exports.Note = require("./note");