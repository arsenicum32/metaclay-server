(function(){
  function addPlanet(orb , pla){
    var nav = navpanel.append('g');

    if(orb.draw){
      var orbit = nav.append('circle').attr({
        "cx": x/2,
        "cy": y/2,
        'opacity': 0,
        "class": "orbit",
        "r": orb.r
      });

      orbit.transition().attr('opacity',1).duration(1500);

      resf.push(function(){
        orbit.attr({
          "cx": x/2,
          "cy": y/2,
          "r": orb.r
        });
      });
    }

    var currentSel =  nav.append('text').attr({
      "x": x/2,
      "y": y/2 + orb.r + 80,
      "font-size": 60,
      "text-anchor": "middle"
    }).text('');

    resf.push(function(){
      currentSel.attr({
        "x": x/2,
        "y": y/2 + orb.r + 80,
      });
    });

    var timer = [];
    var intervalRotation;
    var planet = [];

    for(var i in pla){
      timer.push((pla[i].start || 0));

      planet.push(nav.append('circle').attr({
        "cx": x/2,
        "cy": y/2 + orb.r,
        'opacity': 0,
        "name": pla[i].name || "planet"+i,
        "texts": pla[i].desc || "небольшое описание отдела, которое ненавязчиво рассказывает пользователю про то, что это не просто фан под номером "+i,
        "class": "planet texts",
        "r": pla[i].r || 30
      }));
    }

    for(var k in planet){
      planet[k].transition().attr('opacity',1).duration(500);
    }

    function setRotation(set){
      intervalRotation = setInterval(function(){
        for(var n in planet){
          timer[n]+=0.001;
          planet[n].attr({
            "cx": x/2 + Math.cos(timer[n]*(pla[n].speed||1))*orb.r,
            "cy": y/2 + Math.sin(timer[n]*(pla[n].speed||1))*orb.r
          });
        }
      }, 10);
    }

    setRotation();

    navpanel.attr({
      "transform": "scale( "+0.35+" "+0.35+") translate(0 0)"
    });

    for(var i in planet){
      planet[i].on('mouseover', function(){
        var current = pla[i].r || 30;
        clearInterval(intervalRotation);
        $(this).attr({
          "r": current*2.4
        });
        tooltip.text( $(this).attr('name') );      ////////////////////// переменная name отвечает за название раздела
        return tooltip.style("visibility", "visible");
      });

      planet[i].on('click', function(){
          clearInterval(intervalRotation);
          var tmr = 0;
          var obj = $(this);
          var inter = setInterval( function(){
            if(tmr<0.25){
              tmr+=0.005;
            }else{
              clearInterval(inter);
              if(effects.lurl() !=  obj.attr('name') ){
                logog.destroy(x*2, 1500, 1);
                for(var k in planet){
                  planet[k].transition().attr('opacity', 0).duration(1500);
                }
                orbit.transition().attr('opacity', 0).duration(1500).each('end', function(){
                  effects.go('/otdel/'+obj.attr('name'));
                });
              }
            }
            for(var n in timer){
              timer[n]+=tmr;
            }
          },20);
          currentSel.text( $(this).attr('name') ); ////////////////////////   переменная name отвечает за название раздела
          rletter(currentSel, 20);
        //drawPath.draw([[$(this).attr('cx'),$(this).attr('cy')],[200,200],[300,300]]); /////////////////////////////////////////
      });
      planet[i].on('mousemove', function(){
        return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
      });
      planet[i].on('mouseout', function(){
        var current = pla[i].r || 30;
        setRotation();
        $(this).attr({
          "r": current
        });

        return tooltip.style("visibility", "hidden");
      });
    }
  }

  var pi = 3.14;
  $.get('/data', function(data){
    var menu = data.navigation;
    for(var n in menu){
      menu[n].r = 16; menu[n].speed = 0.25; menu[n].start = 2*pi*n;
    }
    addPlanet({r: 100 , draw: true} ,  menu );
    textspeak.rebind();
    redrawall();

    $(document).ready(function(){
      renderotdel( data.otdel[effects.lurl()] );
      stage.attr('visibility',"visible");
    });

  });
})();
