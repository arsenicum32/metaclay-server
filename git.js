var spawn = require('child_process').spawn;

var gits = spawn('git', ['status']);


function tracking(){
  gits.stdout.on('data', function(data) {
    if(data.indexOf("nothing to commit, working directory clean") !== -1){
      return "all right";
    }else{
      return "need pull";
    }
  });
  gits.stderr.on('data', function(data) {
    console.log(`stderr: ${data}`);
  });
  gits.on('close', function(code) {
    return "close";
  });
}

setInterval(function(){
   console.log(tracking());
}, 20000);
