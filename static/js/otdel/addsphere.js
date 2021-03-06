(function(){
  var used = [[],[],[]];
  var number = 0;
  var addAtom = function(xf,yf, data){   // data.r = радиус кружка, data.file = файл открывающийся при наведении... data.img = картинка у кружка, data.text = текст кружка, data.html = всё поянтно
    var genpos = function(){
      var posY = Math.floor(Math.random()*3) - 1;
      var posX = Math.floor(Math.random()*5) - 2;
      if(used[posY+1] && used[posY+1].indexOf(posX)!=-1){
        return genpos();
      }else{
        used[posY+1].push(posX);
        return [posX,posY];
      }
    }

    // для автодобавления кружочка на свободное место
    if(xf && yf){
      used[yf +1].push(xf);
    }
    var atom = stage.append('circle').attr({
      "cx": x/2 - (xf=='undefined'?genpos()[0]:xf)*x/6,
      "cy": y/2 - (yf=='undefined'?genpos()[1]:yf)*x/6,
      "class": "otdel-items atom",
      "r": data.r || x/15
    });

    if(data.file){
      atom.attr('file', data.file);
    }
    if(data.bd){
      atom.attr('bd', data.bd);
    }

    var atomhtml;


    if(data.hasOwnProperty("img")){
      atomhtml = d3.select('body').append('img').attr({
        'class': 'otdel-img otdel-items nocopy',
        'src': data.img || "/images/image.png"
      });
      makeasetter(1);

    }else if(data.hasOwnProperty("text")){
      atomhtml = stage.append('text').attr({
        'class': 'otdel-items',
        "font-size": "12px",
        "text-anchor":"middle",
        "textLength": (data.r || x/15)*2,
        "fill": "black",
        "x": 100,
        "y": 100
      }).text(data.text);
      makeasetter(0);

    }else if(data.html){ // html: {attr: {}, body: ""}
      atomhtml = d3.select('body').append('div')
      .attr(data.html.attr)
      .attr('class', 'otdel-img flexmiddle column otdel-items')
      .html(data.html.body);
      makeasetter(1);
    }else{
      atomhtml = stage.append('text').attr({
        'class': 'otdel-items',
        "font-size": "20px",
        "text-anchor":"middle",
        "fill": "#ccc",
        "x": 100,
        "y": 100
      }).text("пусто");
      makeasetter(0);
    }

    if(data.file){
      atomhtml.attr('file', data.file);
    }
    if(data.bd){
      atomhtml.attr('bd', data.bd);
    }

    function makeasetter(b){ // эта функция добавляет геттеры и сеттеры для изменения масштаба и позиции добавленного
      if(b){ // объекта в зависимости от того svg он или блочный
        atomhtml.setpos = function(xxx,yyy){
          atomhtml.style({
            'left': xxx - atomhtml.style('width').slice(0, -2)/2 + "px",
            'top': yyy - atomhtml.style('width').slice(0, -2)/2 + "px"
          });
          //console.log( atomhtml.style('width').slice(0, -2)/2 );
        }
        atomhtml.setscale = function(s){
          atomhtml.style({
            'width': s*1.9 + "px",
            "height": s*1.9 + "px"
          });
        }
      }else{
        atomhtml.setpos = function(xxx,yyy){
          atomhtml.attr({
            'x': xxx,
            'y': yyy
          });
          //console.log( atomhtml.style('width').slice(0, -2)/2 );
        }
        atomhtml.setscale = function(s){
          atomhtml.attr({
            'width': s,
            "height": s,
            "radius": s
          });
        }
      }
    }

    resf.push(function(){
      atomhtml.setpos((x/2 - (xf=='undefined'?genpos()[0]:xf)*x/6) , (y/2 - (yf=='undefined'?genpos()[1]:yf)*x/6) );
      atomhtml.setscale( data.r || x/15 );
      atom.attr({
        "cx": x/2 - (xf=='undefined'?genpos()[0]:xf)*x/6,
        "cy": y/2 - (yf=='undefined'?genpos()[1]:yf)*x/6,
        "r": data.r || x/15
      });
      startx = parseInt(atom.attr("cx"));
      starty = parseInt(atom.attr("cy"));
    });

    var tmrca = (data.r || x/15)/2;
    var createanim  = setInterval(function(){
      tmrca<(data.r || x/15)?tmrca+=0.55:clearInterval(createanim);
      atom.attr('r', tmrca);
      atomhtml.setscale( tmrca );
    },10);
    var timer = 0;
    var startx = parseInt(atom.attr("cx"));
    var starty = parseInt(atom.attr("cy"));
    function rf(){
      var stp = [Math.random(),Math.random(),Math.random()];
      return function(t){
        var sc = stp[0]>0.5?Math.sin(t):Math.cos(t);
        var fin = 0;
        for(var i=0;i<Math.floor(stp[1]*4+1);i++){
          fin+=sc*Math.floor(stp[2]*5);
        }
        return fin;
      };
    }
    var sxf = rf(); var syf = rf();
    number++;
    var inter = setInterval(function(){
      timer+=0.01;
      atomhtml.setpos( startx + sxf(timer),  starty + syf(timer) );
      atom.attr({
        "cx": startx + sxf(timer),
        "cy": starty + syf(timer)
      });
      //drawPath.updatec(startx + sxf(timer),starty + sxf(timer), number);  //////////
    },10);
    return [atom, inter];
  }

  window.renderotdel = function( otdel ){
    stage.selectAll('circle').remove();

    var range = otdel;
    for(var n in range){
      addAtom(range[n][0],range[n][1], range[n][2]);
    }

    ////////// после перезагрузки страницы иногда происходит шлак
    fullinfopanel.style("visibility", "hidden");
    fullinfopanel.style('opacity', 0);

    var animation = {
      sys: {
        x: 0,
        y: 0
      },
      run: function(xx,yy){
        animation.sys.x = xx;
        animation.sys.y = yy;
        for(var k=0;k<50;k++){
          svg.append('circle').attr({
            "cx": xx ,
            "cy": yy ,
            "fill": '#eee',
            "class": 'spritec',
            'opacity': 0,
            "r": Math.floor(Math.random()*20 + 1)
          }).transition().attr('opacity',0.45).duration(90).each('end', function(){
            d3.select(this).transition().attr({
              'opacity':1,
              "cx": xx + Math.floor(Math.random()*500 - 250),
              "cy": yy + Math.floor(Math.random()*500 - 250)
            }).duration(1900);
          });
        }
      },
      stop: function(){
        svg.selectAll('.spritec').transition().attr({
          'opacity': 0,
          'cx': animation.sys.x,
          'cy': animation.sys.y
        }).duration(900).each('end', function(){
          d3.select(this).remove();
        })
      }
    }

    var animated = false;
    $('.otdel-items').on({
      'mouseenter': function(e){
        animation.run(e.pageX, e.pageY); /////////////// это анимация подложки
        if($(this).attr('file')){
          $.get('/g/'+ $(this).attr('file') + ($(this).attr('bd')?'?bd='+$(this).attr('bd'):'') , function(data){
            fullinfopanel.html(data);
            //console.log(data);
          });
        }
        fullinfopanel.style("visibility", "visible");
        fullinfopanel.transition().style('opacity', 1.0).duration(900).each('end', function(){
          animated = true;
        });
      },
      'mousemove': function(e){
        if(true){ //$(this).attr('file')
          if(animated) fullinfopanel.style("visibility", "visible").style('opacity', 1.0);
          fullinfopanel
          .style("top",(e.pageY+ ( clickpos(e.pageX,e.pageY)[1]? -10-y/2: 10 ) )+"px")
          .style("left",(e.pageX+ ( clickpos(e.pageX,e.pageY)[0]? -10-x/2: 10 ) )+"px");
        }
      },
      'click': function(){
        if($(this).attr('file'))
        effects.go('/full/'+$(this).attr('file') + ($(this).attr('bd')?'?bd='+$(this).attr('bd'):'') );
      },
      'mouseleave': function(){
        animation.stop(); /////////////// это анимация подложки
        fullinfopanel.transition().style('opacity', 0).duration(400).each('end', function(){
          fullinfopanel.style("visibility", "hidden");
          animated = false;
        });
      }
    })
  }
})();
