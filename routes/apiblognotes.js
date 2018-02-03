var express = require("express");
var router = express.Router();
var db = require("../models/notesindex");
var helpers = require("../helpers/notes");

router.route('/')
 .get(helpers.getNotes)
 .post(helpers.createNote)
 
router.route('/:noteId')
  .get(helpers.getNote)
  .put(helpers.updateNote)
  .delete(helpers.deleteNote)
  
module.exports = router;