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
