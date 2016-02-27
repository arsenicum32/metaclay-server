var express = require('express');
var cors = require('cors');
var fs = require('fs');

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
    testroom.emit('getdata', msg );
  });

  socket.on('fullinfopanel', function(msg){
    fs.stat( __dirname + '/static/html/'+msg , function(err, stat){
      if(err) console.log(err);
      if(stat){
        fs.readFile( __dirname + '/static/html/'+msg , function(err, data){
          if (err) console.log(err);
          testroom.emit('fullinfopanel', data.toString('utf8') );
        });
      }
    });
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
