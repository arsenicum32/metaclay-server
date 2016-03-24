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
    var gifs = [];

    for(var i in pla){
      timer.push((pla[i].start || 0));

      planet.push(nav.append('circle').attr({
        "cx": x/2,
        "cy": y/2 + orb.r,
        "name": pla[i].name || "planet"+i,
        "texts": pla[i].desc || "небольшое описание отдела, которое ненавязчиво рассказывает пользователю про то, что это не просто фан под номером "+i,
        "class": "planet texts",
        "r": pla[i].r || 30
      }));

      gifs.push(d3.select('body').append('img').attr({
        'class': 'otdel-img otdel-items nocopy texts',
        'src': pla[i].img || "/images/image.png",
        "name": pla[i].name || "planet"+i,
        "texts": pla[i].desc || "небольшое"
      }));
    }

    for(var i in gifs){
      gifs[i].setpos = function(xxx,yyy){
        this.style({
          'left': xxx - this.style('width').slice(0, -2)/2 + "px",
          'top': yyy - this.style('width').slice(0, -2)/2 + "px"
        });
      }
      gifs[i].setscale = function(s){
        this.style({
          'width': (pla[i].r || 30)*s*1.9 + "px",
          "height": (pla[i].r || 30)*s*1.9 + "px"
        });
      }

      gifs[i].setpos(x/2, y/2 + orb.r);
      gifs[i].setscale( 1 );
    }

    var ohr = 1; // эта штука двигает картинки ставит их на орбиту когда масштаб становится в 2 раза больше

    function setRotation(set){
      intervalRotation = setInterval(function(){
        for(var n in planet){
          timer[n]+=0.001;
          planet[n].attr({
            "cx": x/2 + Math.cos(timer[n]*(pla[n].speed||1))*orb.r,
            "cy": y/2 + Math.sin(timer[n]*(pla[n].speed||1))*orb.r
          });
          gifs[n].setpos(x/2 + Math.cos(timer[n]*(pla[n].speed||1))*orb.r*ohr,
          y/2 + Math.sin(timer[n]*(pla[n].speed||1))*orb.r*ohr);
        }
      }, 10);
    }

    setRotation();

    var clickcount = 0;

    // Заказчик: неоходимо увеличить меню навигации в 2 раза, что бы было понятно, что надо на него тыкать...
    // Я: окееей
    resf.push(function(){
      if(!clickcount){
        if(x>y*1.2){
          navpanel.attr('transform', 'scale(2,2) translate(-'+x/4+',-'+y/4+')');
          for(var i in gifs){
            gifs[i].setscale(2);
            ohr = 2;
          }
        }
        else{
          navpanel.attr('transform', 'scale(1,1)');
          for(var i in gifs){
            gifs[i].setscale(1);
            ohr = 1;
          }
        }
      }
    });

    for(var i in gifs){
      gifs[i].on('mouseover', function(){
        var current = pla[i].r || 30;
        clearInterval(intervalRotation);
        $(this).attr({
          "r": current*2.4
        });
        $(this).css('transform', 'scale(1.2)');
        tooltip.text( $(this).attr('name') );      ////////////////////// переменная name отвечает за название раздела
        return tooltip.style("visibility", "visible");
      });

      gifs[i].on('click', function(){
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
        //socket.emit('loc', $(this).attr('name') );
        rletter(currentSel, 20);
        //drawPath.draw([[$(this).attr('cx'),$(this).attr('cy')],[200,200],[300,300]]); /////////////////////////////////////////
      });
      gifs[i].on('mousemove', function(){
        return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
      });
      gifs[i].on('mouseout', function(){
        var current = pla[i].r || 30;
        setRotation();
        $(this).attr({
          "r": current
        });
        $(this).css('transform', 'scale(1)');
        return tooltip.style("visibility", "hidden");
      });
    }
  }


  var pi = 3.14;
  $.get('/data', function(data){
    var menu = data.navigation;
    for(var n in menu){ // добавляем стартовую позицию элементам
      menu[n].r = 18; menu[n].speed = 0.25; menu[n].start = 2*pi*n;
    }
    addPlanet({r: 100 , draw: true} ,  menu );
    textspeak.rebind();
    redrawall();
  });

})();
