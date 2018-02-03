var db = require("../models/notesindex");

exports.getNotes = function(req, res){
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    db.Note.find({author: author})
    .then(function(notes){
        res.json(notes);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.createNote = function(req, res){
    var name = req.body.name;
    var completed = req.body.completed;
    var created_date = req.body.created_date;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newNote = {name: name, completed: completed, created_date: created_date, author: author}
  db.Note.create(newNote)
  .then(function(newNote){
      res.status(201).json(newNote);
  })
  .catch(function(err){
      res.send(err);
  })
}

exports.getNote = function(req, res){
   db.Note.findById(req.params.noteId)
   .then(function(foundNote){
       res.json(foundNote);
   })
   .catch(function(err){
       res.send(err);
   })
}

exports.updateNote =  function(req, res){
   db.Note.findOneAndUpdate({_id: req.params.noteId}, req.body, {new: true})
   .then(function(note){
       res.json(note);
   })
   .catch(function(err){
       res.send(err);
   })
}

exports.deleteNote = function(req, res){
   db.Note.remove({_id: req.params.noteId}) 
   .then(function(){
       res.json({message: 'We deleted it!'});
   })
   .catch(function(err){
       res.send(err);
   })
}

module.exports = exports;