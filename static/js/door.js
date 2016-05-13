(function(){
  $(document).ready(function(){
    var door = d3.select('body').append('svg').style({
      'position':'absolute',
      'left': '0',
      'top': '0',
      'width': '100vw',
      'height': '100vh',
      'z-index': 120
    });

    var defs = door.append('defs');

    var gr = defs.append('radialGradient').attr({
      id:"grad2", x1:"0%", y1:"0%",x2:"0%", y2:"100%"
    })
    gr.append('stop').attr({
      offset:"0%", style:"stop-color:#fff;stop-opacity:1"
    });
    gr.append('stop').attr({
      offset:"100%", style:"stop-color:#ccc;stop-opacity:1"
    });

    var gr = defs.append('radialGradient').attr({
      id:"grad", x1:"0%", y1:"0%",x2:"0%", y2:"100%"
    })
    gr.append('stop').attr({
      offset:"30%", style:"stop-color:#fff;stop-opacity:1"
    });
    gr.append('stop').attr({
      offset:"90%", style:"stop-color:#eee;stop-opacity:1"
    });
    gr.append('stop').attr({
      offset:"100%", style:"stop-color:#eee;stop-opacity:1"
    });

    var gr = defs.append('radialGradient').attr({
      id:"gradtile", x1:"0%", y1:"0%",x2:"0%", y2:"100%"
    })
    gr.append('stop').attr({
      offset:"30%", style:"stop-color:#fff;stop-opacity:1"
    });
    gr.append('stop').attr({
      offset:"90%", style:"stop-color:#eee;stop-opacity:1"
    });
    gr.append('stop').attr({
      offset:"100%", style:"stop-color:#eaeaea;stop-opacity:1"
    });


    var lanim = [], ranim = [];

    var ldoor = door.append('rect').attr({
      'width': x/2,
      'height': y,
      'fill': 'url(#grad)',
      'stroke-width': '2px',
      'stroke': '#ccc',
      'x': 0,
      'y': 0
    }).style({
      'height': '100vh'
    });

    //console.log(ldoor.attr('height') +':'+window.innerHeight);


    lanim.push(ldoor);

    var rdoor = door.append('rect').attr({
      'width': x/2,
      'height': y,
      'fill': 'url(#grad)',
      'stroke-width': '2px',
      'stroke': '#ccc',
      'x': x/2,
      'y': 0
    });


////////////// tiles //////////////
    var distb = 4;
    for(var i=0;i<25;i++){
      var tile = door.append('rect').attr({
        'width': x/10,
        'height': x/10,
        'fill': 'url(#gradtile)',
        // 'stroke-width': '1px',
        // 'stroke': '#ccc',
        'x': x/2 + (i%5)*(x/10+distb) + distb,
        'y': (x/10+distb) * ~~(i/5) + (y - (x/10+distb)*5)/2
      });
      ranim.push(tile);
    }
    for(var i=0;i<25;i++){
      var tile = door.append('rect').attr({
        'width': x/10,
        'height': x/10,
        'fill': 'url(#gradtile)',
        // 'stroke-width': '1px',
        // 'stroke': '#ccc',
        'x': x/2 - x/10 - (i%5)*(x/10+distb) - distb,
        'y': (x/10+distb) * ~~(i/5) + (y - (x/10+distb)*5)/2
      });
      lanim.push(tile);
    }
//////////////////////////////////


//////////////// docor for door

    var decr = x/9,
        shtsize = 1.12,
        raduiscircle = 4;

    var decorl = door.append('path').attr({
      'd': 'M '+x/2+','+(y/2 - decr)+' a '+decr+','+decr+' 0 1,0 0,'+2*decr
    }).style({
      fill:'none',
      stroke:'#333',
      'stroke-width':3
    });

    var decorr = door.append('path').attr({
      'd': 'M '+x/2+','+(y/2 - decr)+' a '+decr+','+decr+' 0 1,1 0,'+2*decr
    }).style({
      fill:'none',
      stroke:'#333',
      'stroke-width':3
    });



    // for(var l=0;l<4;l++){
    //   var lbox = door.append('line').attr({
    //     'x1' : x/2 + x/4 + 20 * (l==0||l==2?-1:1) ,
    //     'y1' : (y/2) + y/4 + 20 * (l==1||l==3?-1:1),
    //     'x2' : x/2 + x/4 + 20 * (l==1||l==3?-1:1) + 10 * (l==0||l==2?-1:1),
    //     'y2' : (y/2) + y/4 + 20 * (l==0||l==2?-1:1) + 10 * (l==1||l==3?-1:1),
    //     'stroke-width': 2,
    //     'stroke': '#333'
    //   });
    // }

    var ltext = door.append('text').attr({
      'x' :  x/12 ,
      'y' : y/8,
      'font-family':"sans-serif",
       'font-size':"20px",
       fill:"#333"
    }).text('Metaclay');
    var ltextb = door.append('text').attr({
      'x' :  x/12 ,
      'y' : y/8 + 25,
      'font-family':"sans-serif",
       'font-size':"20px",
       fill:"#333"
    }).text('Lab v0.1');

    lanim.push(ltext);
    lanim.push(ltextb);

    var box = door.append('rect').attr({
      'x' : x/2 + x/4 ,
      'y' : (y/2) + y/4 ,
      'width' : 40,
      'height' : 40,
      'fill': 'none',
      'stroke-width': 2,
      'stroke': '#333'
    });

    ranim.push(box);

    var indexiter = 0;

    for (var i=-1.55; i< 1.45 ; i+=0.2){
      indexiter++;
      var pointdel = true;

      function dlines(ind , dt ){
        // var dt = {
        //   rd: 2, //
        //   xp: - x/4,
        //   csx: - 4,
        //   ofs: 1.2,
        //   ypl: ???,
        //   dt.left - левая дверь или правая
        // }
        var k = dt.right && dt.right==true ? -1: 1;
        if(indexiter==ind){  ////////////// рисуем хуергу с линиями
          pointdel = false;
          var longline1 = door.append('line').attr({
            'x1' : x/2 - k * ( Math.cos(i)*decr*(shtsize)*(dt.ofs||1)),
            'y1' : (y/2) + Math.sin(i)*decr*(shtsize)*(dt.ofs||1) + (dt.ypl||0),
            'x2' : x/2 - k * (Math.cos(i)*decr*shtsize*dt.rd),
            'y2' : (y/2) + Math.sin(i)*decr*shtsize*dt.rd+ (dt.ypl||0),
            'stroke-width': 2,
            'stroke': '#333'
          }),
          longline2 = door.append('line').attr({
            'x1' : x/2 - k * ( Math.cos(i)*decr*shtsize*dt.rd) ,
            'y1' : (y/2) + Math.sin(i)*decr*shtsize*dt.rd + (dt.ypl||0),
            'x2' : (x/2 - k * ( Math.cos(i)*decr*shtsize*dt.rd)) + (dt.xp||0),
            'y2' : (y/2) + Math.sin(i)*decr*shtsize*dt.rd + (dt.yp||0)+ (dt.ypl||0),
            'stroke-width': 2,
            'stroke': '#333'
          }),
          circleend = door.append('circle').attr({
            'cx' : (x/2 - k * ( Math.cos(i)*decr*shtsize*dt.rd)) + (dt.xp||0) + (dt.csx||0),
            'cy' : (y/2) + Math.sin(i)*decr*shtsize*dt.rd + (dt.yp||0) + (dt.csy||0)+ (dt.ypl||0),
            'r': raduiscircle,
            'class': 'door-circle'
          });
          if(dt.startc){
            var anyitem = door.append('circle').attr({
              'cx' : x/2 - k * ( Math.cos(i)*decr*(shtsize)*(dt.ofs||1)),
              'cy' : (y/2) + Math.sin(i)*decr*(shtsize)*(dt.ofs||1) + (dt.ypl||0),
              'r': raduiscircle,
              'class': 'door-circle'
            });
            dt.right==true?ranim.push(anyitem):lanim.push(anyitem);
          }
          if(dt.right==true){
            ranim.push(longline1),ranim.push(longline2),ranim.push(circleend);
          }else{
            lanim.push(longline1),lanim.push(longline2),lanim.push(circleend);
          }
        }
      }

      dlines(5,{
        rd: 2,
        xp: - x/4,
        csx: - 4
      }),dlines(5,{
        rd: 2,
        xp: - x/20,
        csx: - 4,
        ofs: 1.9,
        ypl: 15,
        startx: true
      }),dlines(12,{
        rd: 2.3,
        xp: - x/16,
        csx: - 4
      }),dlines(12,{
        rd: 2.3,
        xp: - x/30,
        csx: - 4,
        ofs: 1.8,
        ypl: 20,
        startc: true
      }),dlines(13,{
        rd: 1.2,
        yp: x/16,
        csy: 4
      });


      dlines(6,{
        rd: 1.3,
        xp: + x/4,
        csx: + 4,
        right: true
      });

      dlines(6,{
        rd: 1.3,
        xp: + x/20,
        csx: + 4,
        ofs: 1.1,
        ypl: -50,
        right: true
      });

      dlines(12,{
        rd: 2.3,
        xp: + x/16,
        csx: + 4,
        right: true
      });

      var line = door.append('line').attr({
        'x1' : x/2 - Math.cos(i)*decr ,
        'y1' : (y/2) + Math.sin(i)*decr,
        'x2' : x/2 - Math.cos(i)*decr*shtsize,
        'y2' : (y/2) + Math.sin(i)*decr*shtsize,
        'stroke-width': 2,
        'stroke': '#333'
      });
      if(Math.random()> 0.6 && pointdel && (indexiter - 1)){
        var circle = door.append('circle').attr({
          'cx' : x/2 - Math.cos(i)*decr*(shtsize+0.02) ,
          'cy' : (y/2) + Math.sin(i)*decr*(shtsize+0.02),
          'r': raduiscircle,
          'class': 'door-circle'
        });
        lanim.push(circle);
      }
      lanim.push(line);



      var rline = door.append('line').attr({
        'x1' : x/2 + Math.cos(i)*decr ,
        'y1' : (y/2) + Math.sin(i)*decr,
        'x2' : x/2 + Math.cos(i)*decr*shtsize,
        'y2' : (y/2) + Math.sin(i)*decr*shtsize,
        'stroke-width': 2,
        'stroke': '#333'
      });
      if(Math.random()> 0.6 && pointdel && (indexiter - 1)){
        var circle = door.append('circle').attr({
          'cx' : x/2 + Math.cos(i)*decr*(shtsize+0.02) ,
          'cy' : (y/2) + Math.sin(i)*decr*(shtsize+0.02),
          'r': raduiscircle,
          'class': 'door-circle'
        });
        ranim.push(circle);
      }
      ranim.push(rline);
    }


///////////////////////////////////

    ranim.push(rdoor);

    var logob = door.append('circle').attr({
      'r': 100,
      'fill': 'url(#grad2)',
      'stroke-width': '5px',
      'stroke': '#bbb',
      //'filter':"url(#dropshadow)",
      'cx': x/2,
      'cy': y/2
    });

    lanim.push(logob);

    var logo = door.append('image').attr({
      'width': 180,
      'height': 180,
      'fill': '#f00',
      'opacity': 1,
      'xlink:href':"/images/logog.png",
      'transform-origin': 'center',
      'x': (x/2 - 90),
      'y': (y/2 - 90)
    });
    // var logo =
    // door.append('g').attr('transform-origin','center');
    // for(var n in paths){
    //   logo.append('path').attr({
    //     'd': paths[n].attr('d'),
    //     'class': paths[n].attr('class')
    //   });
    // }


    var t = 0;
    var inter = setInterval(function(){
      if(t<360){
        t+=3;
        logo.attr('transform', 'rotate('+t+' '+x/2+' '+y/2+')');
      }else{
        logo.attr('transform','');
        clearInterval(inter);
        logorun();     //////// когда доделаешь раскомментируй
        nexstep();
      }
    },10);

    function logorun(){
      //logo.transition().duration(1200);
      logo.transition().attr('opacity', 0).attr('transform', 'translate(-'+x/4+', -'+y/4+') scale(1.5)').duration(1200);
    }
    //lanim.push(logo);

    function nexstep(){

      decorl.transition().attr('transform', 'translate(-'+x*1.2+',0)'  ).delay(50).duration(2500);
      decorr.transition().attr('transform', 'translate('+(-x/2+x*1.2)+',0)'  ).delay(50).duration(2500);

      for(var n in ranim){
        if(ranim[n].attr('x')){
          var cpos = ranim[n].attr('x');
          ranim[n].transition().attr('x', cpos - x/2 + x*1.2 ).delay(50).duration(2500);
        }
        else if(ranim[n].attr('x1')){
          var cpos = ranim[n].attr('x1');
          var cpos2 = ranim[n].attr('x2');
          ranim[n].transition().attr({'x1': cpos - x/2 + x*1.2,'x2': cpos2 - x/2 + x*1.2} ).delay(50).duration(2500);
        }else if(ranim[n].attr('cx')){
          var cpos = ranim[n].attr('cx');
          ranim[n].transition().attr('cx', cpos - x/2 + x*1.2 ).delay(50).duration(2500);
        }
      }

      for(var n in lanim){
        if(lanim[n].attr('x')){
          var cpos = lanim[n].attr('x');
          lanim[n].transition().attr('x', cpos - x*1.2 ).delay(50).duration(2500).each('end', function(){
            door.remove();
          } );
        }else if(lanim[n].attr('cx')){
          var cpos = lanim[n].attr('cx');
          lanim[n].transition().attr('cx', cpos - x*1.2 ).delay(50).duration(2500);
        }else if(lanim[n].attr('x1')){
          var cpos = lanim[n].attr('x1');
          var cpos2 = lanim[n].attr('x2');
          lanim[n].transition().attr({'x1': cpos - x*1.2,'x2': cpos2 - x*1.2} ).delay(50).duration(2500);
        }
      }
    }
    // setTimeout(function(){
    //   door.remove();
    // }, 5000);
  })
})();
