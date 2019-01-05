var express = require('express'); 
var app = express(); 
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('Messaging service started and listening on *:3000');
});

app.use(express.static(__dirname));

var users = {};
var userNumber = 1;

io.sockets.on('connection', function (socket) {
  var myNumber = userNumber++;
  var myName = myNumber;
  users[myName] = socket;

  socket.emit('add_user_id', myName);

  socket.on('message', function (message) {
     socket.broadcast.emit('message', { userid : myNumber , data : message });
  });

});