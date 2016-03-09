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
      "file": data.file || "desc.html",
      "r": data.r || x/15
    });

    var atomhtml = d3.select('body').append('img').attr({
      'class': 'otdel-img otdel-items',
      'src': "http://placehold.it/200x200?text=image"
    });

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

    var range = [
      [-1,-1],
      [-1,0],
      [0,-1],
      [0,0],
      [0,1],
      [1,0],
      [-1,1],
      [1,-1],
      [1,1]
    ];
    for(var n in range){
      addAtom(range[n][0],range[n][1]);
    }

    // d3.xml("images/test1.svg", "image/svg+xml", function(error, xml) {
    //   if (error) throw error;
    //   var el = xml.documentElement;
    // });

    $('.otdel-items').on({
      'mouseenter': function(e){
        if($(this).attr('file')){
          socket.emit( 'fullinfopanel', $(this).attr('file'));
        }
      },
      'mousemove': function(e){
        fullinfopanel.style("visibility", "visible");
        fullinfopanel.style("top", "0px").style("left",(e.pageX+ ( clickpos(e.pageX,e.pageY)[0]? -10-x/2: 10 ) )+"px");
      },
      'mouseout': function(){
        fullinfopanel.style("visibility", "hidden");
      }
    })
  }
})();
