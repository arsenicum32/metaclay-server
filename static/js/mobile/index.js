$.get('/data', function(data){
  var dec = function(){
    return decodeURI( window.location.href).split('/')[ window.location.href.split('/').length - 1 ];
  };
  $(document).ready(function(){
    if(data.otdel[dec()]){
      var otdel = data.otdel[dec()];
      for (var i in otdel){
        if(otdel[i][2].img){
          $('body').append('<div preid="'+i+'" class="section"> \
            <div class="sec"><img src="../'+otdel[i][2].img+'" class="sphere"/>\
              <h2 class="title">название планеты</h2>\
              <p class="desc">краткое описание планеты что там да как</p>\
            </div>\
            <div class="bod">\
              <p class="desc"></p>\
            </div>\
          </div>');
        }
      }
      navigator();
    }else{
      window.location.href = "/404";
    }
  });
});
