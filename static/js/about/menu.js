(function(){
  window.panels = [];

  var shortview = 30;
  var longview = 70;

  var activeobject;

  function addPage(n , dd){
    var text = (dd.text || "название раздела").split("").join("<br>");
    var desc = (dd.desc || "краткое описание раздела не очень большое, но и не такое маленькое, чтобы не заметить");
    var file = dd.file;
    var obj = d3.select("body")
      .append("div");

    var control = 0;

    var leftpos = (x- shortview * (n||1));

    obj.attr("leftpos" , leftpos);
    obj.attr("text" , text);
    obj.attr("desc" , desc);
    obj.attr("file" , (file || 'desc.html'));

    obj.attr('class', 'fullinfopanel fullall')
      .style("visibility", "visible")  //.style('line-height', '2em')
      .style("top", "0px").style("left", leftpos+"px")
      .html('<div class="flexblock" ><h1 class="razdel">'+text+'</h1><p>'+desc+'</p></div>');

    if(dd.active){
      $.get('/g/'+ obj.attr('file'), function(data){
          obj.html(data);
      });
      obj.classed('active', true)
      .transition().style('left' , x/8 + "px" ).duration(980);
    }

    obj.on({
      'mouseover': function(){
        if(! d3.select(this).classed('active')){
          d3.select(this).transition().style('left' , leftpos - longview + "px" );
        }
      },
      'mouseout': function(){
        if(! d3.select(this).classed('active')){
          d3.select(this).transition().style('left' , leftpos + "px" );
        }
      },
      'click': function(){
        if(d3.select(this).classed('active')==false){
          for (var n in panels){
            panels[n].transition().style("left", panels[n].attr("leftpos")+"px").duration(980);
            panels[n].classed('active', false);
          }
          $.get('/g/'+ d3.select(this).attr('file'), function(data){
            $('.fullinfopanel').each(function(){
              if($(this).hasClass('active')){
                $(this).html(data);
              }else{
                $(this).html('<div class="flexblock" ><h1 class="razdel">'+$(this).attr('text')+'</h1><p>'+$(this).attr('desc')+'</p></div>');
              }
            })
          });
          d3.select(this).classed('active', true);
          d3.select(this).transition().style('left' , x/8 + "px" ).duration(980);
        }
      }
    });

    resf.push(function(){
      leftpos = (x- shortview * (n||1));
      obj.attr("leftpos" , leftpos);
      if(!obj.classed('active')) obj.style("left", leftpos+"px");
      else {
        obj.style("left" , x/8 + "px");
      }
    });

    return obj;
  }

  $.get('/data', function(data){
    for(var n in data.about){
      panels.push(addPage( data.about.length - n , data.about[n] ));
    }
    if(activeobject) $(activeobject).click();
  })

  //
  // panels.push(addPage(3, "раздел 3"));
  // panels.push(addPage(2, "раздел 2"));
  // panels.push(addPage(1, "раздел 1"));

})();
