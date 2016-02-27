var express = require('express');
var cors = require('cors');

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/', express.static(__dirname + '/static'));
app.use(cors());

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

testroom = io.of('/test');

testroom.on('connection', function(socket){
  console.log('new client!');
  socket.on('getdata', function(msg){
  	console.log('msg');
    testroom.emit('getdata', msg );
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
