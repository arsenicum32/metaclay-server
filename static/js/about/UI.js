(function() {
  var hamburger = svg.append('g');

  var crs = hamburger.append('circle').attr({
    "class": "hamburger",
    "cx":  60,
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
      "cx":  60
    });
    for (var n in l){
      l[n].attr({
        "x1":  48,
        "x2":  72
      });
    }
  });
  hamburger.on('click', function(){
    effects.go('/nodoor');
  });
})();
