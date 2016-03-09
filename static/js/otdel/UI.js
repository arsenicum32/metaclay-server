(function(){
  window.tooltip = d3.select("body")
    .append("div").attr('class', 'tooltip')
    .text("a simple tooltip");

  window.fullinfopanel = d3.select("body")
    .append("div").attr('class', 'fullinfopanel frame')
    .html('error');

  socket.on('fullinfopanel', function(msg){
    fullinfopanel.html(msg);
  });

  var hamburger = svg.append('g');

  var crs = hamburger.append('circle').attr({
    "class": "hamburger",
    "cx":  x - 60,
    "cy": 40,
    "r": 20
  });

  var l = [
    hamburger.append('path').attr({
      "class": "hamburger",
      "d": "M 60 47 L 52 39.5 L 60 32",
      "stroke-width": 3
    })
  ];

  resf.push(function(){
    crs.attr({
      "cx":  x - 60
    });
    for (var n in l){
      l[n].attr({
        "d": "M "+(x - 45 - 20)+" 47 L "+(x - 45 - 8)+" 39.5 L "+(x - 45 - 20)+" 32",
      });
    }
  });

  hamburger.on('click', function(){
    effects.go('/');
  });

  window.clickpos = function(x, y) {
    var w = $(window).width(),
        h = $(window).height();
    return [Math.round(x / w), Math.round(y / h)];
  }

})();
