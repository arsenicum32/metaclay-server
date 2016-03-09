(function(){
  function addPlanet(orb , pla){
    var nav = navpanel.append('g');

    if(orb.draw){
      var orbit = nav.append('circle').attr({
        "cx": x/2,
        "cy": y/2,
        "class": "orbit",
        "r": orb.r
      });

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
        "name": "planet"+i,
        "class": "planet",
        "r": pla[i].r || 30
      }));
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

    var clickcount = 0;

    // Заказчик: неоходимо увеличить меню навигации в 2 раза, что бы было понятно, что надо на него тыкать...
    // Я: окееей
    resf.push(function(){
      if(!clickcount){
        if(x>y*1.2)
        navpanel.attr('transform', 'scale(2,2) translate(-'+x/4+',-'+y/4+')');
        else
        navpanel.attr('transform', 'scale(1,1)');
      }
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
        clickcount++;
        var obj = $(this);
        if(clickcount===1){
          var scale=1;
          var inter = setInterval( function(){
            if(scale>0.35) scale-=0.05;
            else{
              clearInterval(inter);
              effects.go('/otdel/'+ obj.attr('name') );
            }
            navpanel.attr({
              "transform": "scale( "+scale+" "+scale+") translate(0 0)"
            });
            stage.attr('visibility',"visible");
          },10);
        }else{
          var tmr = 0;
          var inter = setInterval( function(){
            tmr<0.25?tmr+=0.005:clearInterval(inter);
            for(var n in timer){
              timer[n]+=tmr;
            }
          },20);
        }

        renderotdel( $(this).attr('name') );
        currentSel.text( $(this).attr('name') ); ////////////////////////   переменная name отвечает за название раздела
        socket.emit('loc', $(this).attr('name') );
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

  function rletter(obj , end){    //////  делаем глитч-текст
    var strg = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЗЖИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
    var timer = 0;
    var fin = obj.text();
    var end = end || 100;
    var inter = setInterval( function(){
      timer<end?timer++:clearInterval(inter);
      for(var n in [0,1,2,3]){
        if(timer < end - 12){
          var text = obj.text();
          var index = n;
          text = text.substr(0, index) + strg[ Math.floor( Math.random()* strg.length ) ] + text.substr(index + 1);
          obj.text( text );
        }
        else {
          obj.text( fin );
        }
      }

    }, 50);
  }


  var pi = 3.14;
  addPlanet({r: 100 , draw: true} ,  // r = x/6
    [{r: 16, speed: 0.25, start: pi*2},
     {r: 16, speed: 0.25, start: pi*4},
     {r: 16, speed: 0.25, start: pi*6},
     {r: 16, speed: 0.25, start: pi*8}
    ]);
})();
