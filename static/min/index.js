function drawlines(){}!function(){var t=0;window.onpopstate=function(e){t++,t-1&&window.location.reload()},window.onunload=function(t){location.reload()},window.x=$(window).width(),window.y=$(window).height(),window.svg=d3.select("body").append("svg").attr({width:x,height:y}),drawlines(),window.objs=[],window.resf=[],window.stage=svg.append("g").attr("visibility","hidden"),window.navpanel=svg.append("g"),window.redrawall=function(){x=$(window).width(),y=$(window).height(),svg.attr("width",x).attr("height",y);for(var t in resf)resf[t]()},$(window).on("resize load",redrawall),window.effects={go:function(t){svg.append("rect").attr({fill:"white",x:0,y:0,width:x,height:y}).style("opacity",0).transition().style("opacity",1).each("end",function(){d3.select(this).remove(),setTimeout(function(){d3.selectAll("img").transition().style("opacity","1"),d3.selectAll("div").transition().style("opacity","1"),d3.selectAll("p").transition().style("opacity","1")},100),"back"===t?window.history.back():window.location.href=t}),d3.selectAll("img").transition().style("opacity","0"),d3.selectAll("div").transition().style("opacity","0"),d3.selectAll("p").transition().style("opacity","0")},lurl:function(){return decodeURI(window.location.href).split("/")[window.location.href.split("/").length-1]}}}(),function(){window.textspeak=d3.select("body").append("p").attr({"class":"textspeak"}).text(""),textspeak.fully=function(t){var e=this;if(t){var n=0;e.inter&&clearInterval(e.inter),e.inter=setInterval(function(){n<t.length?n+=.1:clearInterval(e.inter),e.text(t.substring(0,Math.floor(n)))},10)}else e.inter&&clearInterval(e.inter),e.text("")},textspeak.rebind=function(){$(".texts").on({mouseenter:function(){textspeak.fully($(this).attr("texts"))},mouseleave:function(){textspeak.fully()}})}}(),function(){window.rletter=function(t,e){var n="абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЗЖИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ",i=0,o=t.text(),e=e||100,a=setInterval(function(){e>i?i++:clearInterval(a);for(var l in[0,1,2,3])if(e-12>i){var r=t.text(),s=l;r=r.substr(0,s)+n[Math.floor(Math.random()*n.length)]+r.substr(s+1),t.text(r)}else t.text(o)},50)}}();