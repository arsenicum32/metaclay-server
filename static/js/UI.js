(function(){
  window.tooltip = d3.select("body")
    .append("div").attr('class', 'tooltip')
    .text("a simple tooltip");

  window.fullinfopanel = d3.select("body")
    .append("div").attr('class', 'fullinfopanel frame')
    .html('error');

  var hamburger = svg.append('g');

  var crs = hamburger.append('circle').attr({
    "class": "hamburger",
    "cx": x - 60,
    "cy": 40,
    "r": 20
  });

  var l = [
    hamburger.append('line').attr({
      "class": "hamburger",
      "x1": x - 48,
      "y1": 47,
      "x2": x - 72,
      "y2": 47,
      "stroke-width": 3
    }),hamburger.append('line').attr({
      "class": "hamburger",
      "x1": x - 48,
      "y1": 39.5,
      "x2": x - 72,
      "y2": 39.5,
      "stroke-width": 3
    }),hamburger.append('line').attr({
      "class": "hamburger",
      "x1": x - 48,
      "y1": 32,
      "x2": x - 72,
      "y2": 32,
      "stroke-width": 3
    })
  ];

  resf.push(function(){
    crs.attr({
      "cx": x - 60
    });
    for (var n in l){
      l[n].attr({
        "x1": x - 48,
        "x2": x - 72
      });
    }
  });

  hamburger.on('click', function(){
    effects.go('/about');
  })

  window.clickpos = function(x, y) {
    var w = $(window).width(),
        h = $(window).height();
    return [Math.round(x / w), Math.round(y / h)];
  }
})();
