$.get('/data', function(data){
  window.items = [];
  var dec = function(){
    return decodeURI( window.location.href).split('/')[ window.location.href.split('/').length - 1 ];
  };
  $(document).ready(function(){
    if(data.otdel[dec()]){
      var otdel = data.otdel[dec()];
      for (var i in otdel){
        if(otdel[i][2].img){
          items.push(otdel[i][2]);
        }
      }
      $('head').append('<link rel="stylesheet" href="../../css/style.css">\
      <link rel="stylesheet" href="../../css/mobileotdel.css">');
      navigator();
    }else{
      window.location.href = "/404";
    }
  });
});
