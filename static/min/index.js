function drawlines(){}!function(){window.x=$(window).width(),window.y=$(window).height(),window.svg=d3.select("body").append("svg").attr({width:x,height:y}),drawlines(),window.objs=[],window.resf=[],window.stage=svg.append("g").attr("visibility","hidden"),window.navpanel=svg.append("g"),window.redrawall=function(){x=$(window).width(),y=$(window).height(),svg.attr("width",x).attr("height",y);for(var t in resf)resf[t]()},$(window).on("resize load",redrawall),window.effects={go:function(t){svg.append("rect").attr({fill:"white",x:0,y:0,width:x,height:y}).style("opacity",0).transition().style("opacity",1).each("end",function(){d3.select(this).remove(),setTimeout(function(){d3.selectAll("img").transition().style("opacity","1"),d3.selectAll("div").transition().style("opacity","1"),d3.selectAll("p").transition().style("opacity","1")},100),"back"===t?window.history.back():window.location.href=t}),d3.selectAll("img").transition().style("opacity","0"),d3.selectAll("div").transition().style("opacity","0"),d3.selectAll("p").transition().style("opacity","0")},lurl:function(){return decodeURI(window.location.href).split("/")[window.location.href.split("/").length-1]}}}(),function(){window.textspeak=d3.select("body").append("p").attr({"class":"textspeak"}).text(""),textspeak.fully=function(t){var e=this;if(t){var i=0;e.inter&&clearInterval(e.inter),e.inter=setInterval(function(){i<t.length?i+=.1:clearInterval(e.inter),e.text(t.substring(0,Math.floor(i)))},10)}else e.inter&&clearInterval(e.inter),e.text("")},textspeak.rebind=function(){$(".texts").on({mouseenter:function(){textspeak.fully($(this).attr("texts"))},mouseleave:function(){textspeak.fully()}})}}(),function(){window.rletter=function(t,e){var i="абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЗЖИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ",n=0,o=t.text(),e=e||100,l=setInterval(function(){e>n?n++:clearInterval(l);for(var a in[0,1,2,3])if(e-12>n){var s=t.text(),r=a;s=s.substr(0,r)+i[Math.floor(Math.random()*i.length)]+s.substr(r+1),t.text(s)}else t.text(o)},50)}}();