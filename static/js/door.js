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

    // var filter = door.append('defs')
    //     .append('filter').attr('id',"inset-shadow")
    // filter.append('feComponentTransfer').attr({'in':"SourceAlpha",'result':"inset-selection"})
    //     .append('feFuncA').attr({type:"discrete",tableValues:"0 1 1 1 1 1"});
    // filter.append('feComponentTransfer').attr({"in":"SourceGraphic","result":"original-no-fill"})
    //     .append('feFuncA').attr({ttype:"discrete",tableValues:"0 0 1"});
    // filter.append('feColorMatrix').attr({type:"matrix","in":"original-no-fill",result:"new-source-alpha",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"});
    // filter.append('feGaussianBlur').attr({"in":"new-source-alpha",result:"blur",stdDeviation:"5"});
    // filter.append('feGaussianBlur').attr({"in":"new-source-alpha",result:"blur1",stdDeviation:"10"});
    // filter.append('feGaussianBlur').attr({"in":"new-source-alpha",result:"blur2",stdDeviation:"15"});
    // var merge = filter.append('feMerge').attr("result","blur");
    // merge.append('feMergeNode').attr({"in":"blur",mode:"normal"});
    // merge.append('feMergeNode').attr({"in":"blur2",mode:"normal"});
    // merge.append('feMergeNode').attr({"in":"blur3",mode:"normal"});
    // filter.append('feComposite').attr({operator:"in","in":"inset-selection",in2:"blur",result:"inset-blur"});
    // filter.append('feComposite').attr({operator:"over","in":"original-no-fill",in2:"inset-blur"});

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

    var gr = defs.append('linearGradient').attr({
      id:"grad", x1:"0%", y1:"0%",x2:"0%", y2:"100%"
    })
    gr.append('stop').attr({
      offset:"0%", style:"stop-color:#ccc;stop-opacity:1"
    });
    gr.append('stop').attr({
      offset:"50%", style:"stop-color:#fff;stop-opacity:1"
    });
    gr.append('stop').attr({
      offset:"100%", style:"stop-color:#ccc;stop-opacity:1"
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
        nexstep();
      }
    },10);

    lanim.push(logo);

    function nexstep(){
      for(var n in ranim){
        var cpos = lanim[n].attr('x');
        ranim[n].transition().attr('x', cpos + x*1.2 ).delay(50).duration(2500);
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
        }
      }
    }
    // setTimeout(function(){
    //   door.remove();
    // }, 5000);
  })
})();
