(function(){
  window.tooltip = d3.select("body")
    .append("div").attr('class', 'tooltip')
    .text("a simple tooltip");

  window.fullinfopanel = d3.select("body")
    .append("div").attr('class', 'fullinfopanel frame')
    .html('error');

////////////////////////////////// лэйбл лаборатории ///////////
  window.label = d3.select("body")
    .append("div").attr({
      'class': 'label nocopy',
    }).style({
      'left': '20px',
      'top': '20px'
    })
    .text("Metaclay");

    label.intr = null;
  resf.push(function(){
    var t = 0,
    stng = 'Научно-Технологическая Лаборатория «Метаклэй»';
    if(label.intr) clearInterval(label.intr);
    label.intr = setInterval(function(){
      t<stng.length?t++:clearInterval(label.intr);
      label.text(stng.substring(0, t));
    },85);
  });

  //////////////////////////////////////////////////////////////

  window.aboutmenu = [
    d3.select("body")
    .append("div").attr('class', 'aboutmenu')
    .html('error'),
    d3.select("body")
    .append("div").attr('class', 'aboutmenu')
    .html('error')
  ];

  $.get('/g/abouttop.html', function(data){
    aboutmenu[0].html(data);
  })
  $.get('/g/aboutbottom.html', function(data){
    aboutmenu[1].html(data);
  })

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
