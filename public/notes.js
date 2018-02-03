/*global $ */
$(document).ready(function(){
  
  $.getJSON("/api/blognotes")
  .then(addNotes)
  
  $('#noteInput').keypress(function(event){
    if(event.which == 13) {
      createNote();
    }
  });
  
  $('.list').on('click', 'li', function(){
    updateNote($(this));
  })
  
  $('.list').on('click', 'span', function(e){
    e.stopPropagation();
    removeNote($(this).parent());
  })
});

function addNotes(notes) {
  //add notes to page here
  notes.forEach(function(note){
    addNote(note);
  });
}

function addNote(note){
  var newNote = $('<li class="task">'+note.name +' <span>X</span></li>');
  newNote.data('id', note._id);
  newNote.data('completed', note.completed);
  if(note.completed){
    newNote.addClass("done");
  }
  $('.list').append(newNote);
}

function createNote(){
  //send request to create new note
  var usrInput = $('#noteInput').val();
  $.post('/api/blognotes',{name: usrInput})
  .then(function(newNote){
    $('#noteInput').val('');
    addNote(newNote);
  })
  .catch(function(err){
    console.log(err);
  })
}

function removeNote(note){
  var clickedId = note.data('id');
  var deleteUrl = '/api/blognotes/' + clickedId; 
  $.ajax({
    method: 'DELETE',
    url: deleteUrl
  })
  .then(function(data){
    note.remove();
  })
  .catch(function(err){
    console.log(err);
  })
}

function updateNote(note){
  var updateUrl = '/api/blognotes/' + note.data('id');
  var isDone = !note.data('completed');
  var updateData = {completed: isDone}
  $.ajax({
    method: 'PUT',
    url: updateUrl,
    data: updateData
  })
  .then(function(updatedNote){
    note.toggleClass("done");
    note.data('completed', isDone);
  })
}