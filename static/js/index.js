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

  $(window).on('resize load', function() {
    x = $(window).width();
    y = $(window).height();
    svg.attr("width", x).attr("height", y);
    for(var i in resf){
      resf[i]();
    }
  });

  window.effects = {
    go: function(path){
      svg.append('rect').attr({
        'fill': 'white',
        'x': 0,
        'y': 0,
        'width': x,
        'height': y
      }).style('opacity', 0).transition().style('opacity', 1).each('end', function(){
        window.location.href = path;
      });
      d3.selectAll('img').transition().style('opacity', '0');
      d3.selectAll('div').transition().style('opacity', '0');
      d3.selectAll('p').transition().style('opacity', '0');
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
          index<text.length?index+=0.1:clearInterval(inter);
          el.text( text.substring(0,  Math.floor(index)   ) );
        }, 10);
    }else{
      if(el.inter) clearInterval(el.inter);
      el.text( "" );
    }
  }

  $(document).ready( function(){
    $('.texts').on({
      'mouseenter': function(){
        textspeak.fully($(this).attr('texts'));
      },
      'mouseleave': function(){
        textspeak.fully();
      }
    })
  });

})();
