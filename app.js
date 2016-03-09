var express = require('express');
var cors = require('cors');
var fs = require('fs');

var app = express();

var http = require('http').Server(app);

app.use('/', express.static(__dirname + '/static'));
app.use(cors());


app.get('/g/:file', function(req, res, next){
  fs.stat( __dirname + '/static/html/'+req.params.file , function(err, stat){
    if(err) {
      res.send( err );
    }
    if(stat){
      fs.readFile( __dirname + '/static/html/'+req.params.file , function(err, data){
        if (err){
          res.send(err);
        }
        res.send( data.toString('utf8') );
      });
    }else{
      res.send('no file on server');
    }
  });
});

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

app.get('/otdel/:id', function(req, res, next){
  res.sendFile(__dirname + '/otdel.html');
});


app.get('/', function(req, res, next){
  res.sendFile(__dirname + '/index.html');
});

http.listen(4800, function(){
  console.log('listening on *:3000');
});
