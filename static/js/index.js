(function() {
  window.x = $(window).width();
  window.y = $(window).height();
  window.svg = d3.select('body').append('svg').attr({
    width: x,
    height: y
  });

  window.objs = [];
  window.resf = [];
  window.stage = svg.append('g').attr('visibility','hidden');
  window.navpanel = svg.append('g');

  window.redrawall =  function() {
    x = $(window).width();
    y = $(window).height();
    svg.attr("width", x).attr("height", y);
    for(var i in resf){
      resf[i]();
    }
  }

  $(window).on('resize load', redrawall );

  window.effects = {
    go: function(path){
      svg.append('rect').attr({
        'fill': 'white',
        'x': 0,
        'y': 0,
        'width': x,
        'height': y
      }).style('opacity', 0).transition().style('opacity', 1).each('end', function(){
        d3.select(this).remove();
        setTimeout(function(){
          d3.selectAll('img').transition().style('opacity', '1');
          d3.selectAll('div').transition().style('opacity', '1');
          d3.selectAll('p').transition().style('opacity', '1');
        }, 100);
        if(path === 'back'){
          window.history.back();
        }else{
          window.location.href = path;
        }
      });
      d3.selectAll('img').transition().style('opacity', '0');
      d3.selectAll('div').transition().style('opacity', '0');
      d3.selectAll('p').transition().style('opacity', '0');
    },
    lurl: function(){
      return decodeURI( window.location.href).split('/')[ window.location.href.split('/').length - 1 ];
    }
  }

})();


(function(){  // такая приятная штука - пишется текст слева снизу
  window.textspeak = d3.select('body').append('p').attr({
    'class': 'textspeak',
  }).text('');

  textspeak.fully = function(text){
    var el = this;
    if(text){
      //el.text(text);
      var index = 0;
      if(el.inter) clearInterval(el.inter);
      el.inter = setInterval(function(){
          index<text.length?index+=0.1:clearInterval(el.inter);
          el.text( text.substring(0,  Math.floor(index)   ) );
        }, 10);
    }else{
      if(el.inter) clearInterval(el.inter);
      el.text( "" );
    }
  }

  textspeak.rebind = function(){
    $('.texts').on({
      'mouseenter': function(){
        textspeak.fully($(this).attr('texts'));
      },
      'mouseleave': function(){
        textspeak.fully();
      }
    })
  }

})();

(function(){ //////  делаем глитч-текст
  window.rletter = function(obj , end){
    var strg = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЗЖИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
    var timer = 0;
    var fin = obj.text();
    var end = end || 100;
    var inter = setInterval( function(){
      timer<end?timer++:clearInterval(inter);
      for(var n in [0,1,2,3]){
        if(timer < end - 12){
          var text = obj.text();
          var index = n;
          text = text.substr(0, index) + strg[ Math.floor( Math.random()* strg.length ) ] + text.substr(index + 1);
          obj.text( text );
        }
        else {
          obj.text( fin );
        }
      }
    }, 50);
  }
})();
