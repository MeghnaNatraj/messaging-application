  var socket = io();
  var users;
  var myself;

  /* Initially called to display and store current user data in myself */
  socket.on('add_user_id', function (data) {
     $('#name').append($('<span>').text(data));
     myself = data;
  });

/* When the user submits the message, you emit the message */
  $('form').submit(function(){
  	data = $('#m').val();
  	socket.emit('message', data);

    $('#m').val('');
    $('#messages').append($('<li class = "myself">').html(data+'&nbsp;&nbsp;'));
    return false;
  });

  socket.on('message', function (message) {

     $('#messages').append($('<li>').html("&nbsp;&nbsp;User "+ message.userid+" :").attr('style','color:#EC407A').append($('<div>').html('&nbsp;&nbsp;'+message.data).attr('style','color:black !important')));
  });

  