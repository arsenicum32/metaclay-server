var express = require('express');
var cors = require('cors');
var fs = require('fs');

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/', express.static(__dirname + '/static'));
app.use(cors());


app.get('/d/:file', function(req, res, next){
  fs.stat( __dirname + '/static/files/' + req.params.file , function(err, stat){
    if(err) console.log(err);
    if(stat){
      res.download(__dirname + '/static/files/' + req.params.file);
    }else{
      res.json({"error":"no such file"});
    }
  });
});

app.get('/about', function(req, res, next){
  res.sendFile(__dirname + '/about.html');
});


app.get('/', function(req, res, next){
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

http.listen(4800, function(){
  console.log('listening on *:3000');
});
