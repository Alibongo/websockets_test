var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Ensure we're listening the correct port.
http.listen(3000, function(){
  console.log('listening on *:3000');
});

// looks up index.html path
// when someone looks up the route of the site
// this then sends the HTML file.
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// io is a server side instance of the websocket
// that we create. Listens to events created on the clientside
// listening and disconnecting to/from chat messages.
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});
