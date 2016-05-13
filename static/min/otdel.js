!function(){window.tooltip=d3.select("body").append("div").attr("class","tooltip").text("a simple tooltip"),window.fullinfopanel=d3.select("body").append("div").attr("class","fullinfopanel frame fullhalf").html("error");var t=svg.append("g"),a=t.append("circle").attr({"class":"hamburger",cx:x-60,cy:40,r:20}),c=[t.append("path").attr({"class":"hamburger",d:"M 60 47 L 52 39.5 L 60 32","stroke-width":3})];resf.push(function(){a.attr({cx:x-60});for(var t in c)c[t].attr({d:"M "+(x-45-20)+" 47 L "+(x-45-8)+" 39.5 L "+(x-45-20)+" 32"})}),t.on({click:function(){effects.go("/nodoor")},mouseover:function(){tooltip.style("visibility","visible"),tooltip.text("на главную"),tooltip.style("top",d3.event.pageY-10+"px").style("left",d3.event.pageX-120+"px")},mouseout:function(){tooltip.style("visibility","hidden")}}),window.clickpos=function(t,a){var c=$(window).width(),e=$(window).height();return[Math.round(t/c),Math.round(a/e)]}}(),function(){function t(t,a){function c(c){r=setInterval(function(){for(var c in i)s[c]+=.001,i[c].attr({cx:x/2+Math.cos(s[c]*(a[c].speed||1))*t.r,cy:y/2+Math.sin(s[c]*(a[c].speed||1))*t.r})},10)}var e=navpanel.append("g");if(t.draw){var n=e.append("circle").attr({cx:x/2,cy:y/2,opacity:0,"class":"orbit",r:t.r});n.transition().attr("opacity",1).duration(1500),resf.push(function(){n.attr({cx:x/2,cy:y/2,r:t.r})})}var o=e.append("text").attr({x:x/2,y:y/2+t.r+80,opacity:1,"font-size":60,"text-anchor":"middle"}).text("");resf.push(function(){o.attr({x:x/2,y:y/2+t.r+80})});var r,s=[],i=[];for(var l in a)s.push(a[l].start||0),i.push(e.append("circle").attr({cx:x/2,cy:y/2+t.r,opacity:0,name:a[l].name||"planet"+l,texts:a[l].desc||"небольшое описание отдела, которое ненавязчиво рассказывает пользователю про то, что это не просто фан под номером "+l,"class":"planet texts",r:a[l].r||30}));for(var p in i)i[p].transition().attr("opacity",1).duration(500);c(),navpanel.attr({transform:"scale( 0.35 0.35) translate(0 0)"});for(var l in i)i[l].on("mouseover",function(){var t=a[l].r||30;return clearInterval(r),$(this).attr({r:2.4*t}),tooltip.text($(this).attr("name")),tooltip.style("visibility","visible")}),i[l].on("click",function(){clearInterval(r);var t=0,a=$(this),c=setInterval(function(){if(.25>t)t+=.005;else if(clearInterval(c),effects.lurl()!=a.attr("name")){logog.destroy(2*x,1500,1);for(var e in i)i[e].transition().attr("opacity",0).duration(1500);n.transition().attr("opacity",0).duration(1500).each("end",function(){effects.go("/otdel/"+a.attr("name"))})}for(var o in s)s[o]+=t},20);o.transition().attr("opacity",1),o.text($(this).attr("name")),rletter(o,20),o.transition().attr("opacity",0).duration(1800)}),i[l].on("mousemove",function(){return tooltip.style("top",d3.event.pageY-10+"px").style("left",d3.event.pageX+10+"px")}),i[l].on("mouseout",function(){var t=a[l].r||30;return c(),$(this).attr({r:t}),tooltip.style("visibility","hidden")})}var a=3.14;$.get("/data",function(c){var e=c.navigation;for(var n in e)e[n].r=16,e[n].speed=.25,e[n].start=2*a*n;t({r:100,draw:!0},e),textspeak.rebind(),redrawall(),$(document).ready(function(){renderotdel(c.otdel[effects.lurl()]),stage.attr("visibility","visible")})})}(),function(){function t(t){return t/2+Math.floor(-1*Math.random())*Math.floor(Math.random()*t)}window.logog=navpanel.append("g"),logog.on("click",function(){effects.go("/about")}),logog.append("circle").attr({cx:45,cy:45,r:90,fill:"red",opacity:"0"}),resf.push(function(){logog.attr("transform","translate("+(x/2-45)+","+(y/2-45)+")")});var a=logog.append("path").attr({"class":" st3 ",d:" M66.1,56.9c-0.9-0.6-2-0.9-3-0.7c-1.1,0.3-2.3,0.8-3.3,1.5c0.2,5-3.2,11.3-7.5,13.8c0.1,1,0.3,2,0.7,2.9c0.4,0.9,1.2,1.5,2.1,1.9c3.1-3,8.8-4.7,12.7-3.2c1-0.8,1.7-1.6,2.2-2.5c0.6-1.1,0.8-2.5,0.8-4C68,65,66.1,60.6,66.1,56.9z "}),c=logog.append("path").attr({"class":" st3 ",d:" M84.9,43.2c0.8,1.5,1.7,2.8,2.4,3.4c2.3,2,3.7-5.2,2.6-11c-0.8-4.2-3.1-7.1-5.5-5.8c-0.3,0.1-0.5,0.3-0.7,0.5 	C85.5,34.3,87,41.5,84.9,43.2z "}),e=logog.append("path").attr({"class":" st3 ",d:" M55,76.4c-0.5,0.5-1,1-1.3,1.6c-0.4,0.6-0.4,1.3-0.2,2c3.6,1.1,6,3.1,6,5.1c1.1,0.3,2.2,0.5,3.1,0.3 	c2-0.5,4.3-2.3,5.9-4.4c-0.5-1.7,0-4.4,0.8-6.8c-0.5-0.4-1-0.7-1.6-0.9C64.2,76.1,58.4,77.9,55,76.4z "}),n=logog.append("path").attr({"class":" st3 ",d:" M48.2,58c-4.1,0.1-8.2-0.8-11.1-2.8c-0.3,0.8-0.5,1.6-0.5,2.5c4.4,2.9,7.8,8.9,7.5,13.8 	c1.2,0.7,2.5,1.1,3.8,1.1c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c1.3,0,2.6-0.4,3.8-1.1c-0.3-5,3.1-11,7.5-13.8c0-0.9-0.2-1.8-0.5-2.5 	C56.3,57.2,52.3,58.1,48.2,58z "}),o=logog.append("path").attr({"class":" st3 ",d:" M30.5,44.8c0.9,0.9,2,1.6,3.1,1.9c1.2-5.3,6.3-11.2,11.4-13.1c0-0.3-0.1-0.7-0.2-1c-0.3-1.2-1.1-2.2-2.2-3.1 	c-4.3,0.8-9.9-0.2-11.7-3c-1.1,0.3-2.1,0.9-2.8,1.8c-0.7,0.9-1.2,2-1.5,3.3C30.1,33.4,31.3,39.7,30.5,44.8z "}),r=logog.append("path").attr({"class":" st3 ",d:" M81.7,43.1c0.5,0.2,1,0.4,1.5,0.5c0.7,0.1,1.2,0,1.6-0.3c-2.2-4.1-4-10.4-1.2-12.9c-0.2-0.5-0.4-0.9-0.6-1.3 	c-0.1-0.2-0.3-0.5-0.5-0.7c-0.7,1.6-2.9,1.5-6.6-2.3c-1,0.1-1.7,0.6-1.7,1.5c0,1.2,0.2,2.5,0.4,3.9C78.3,33,81,38.2,81.7,43.1z "}),s=logog.append("path").attr({"class":" st3 ",d:" M82.3,51.4c-0.3-0.7-0.8-1.2-1.4-1.6c-2.2,2.6-8.1,3-11.6,1.2c-1.1,0.7-1.9,1.5-2.4,2.4c-0.5,1-0.8,2.2-0.8,3.5 	c2.6,1.7,4.4,6.1,4.6,9.8c0.9,0.6,1.8,0.8,2.8,0.7c0.8-0.1,1.7-0.4,2.4-0.8c0.4-5.6,2.7-11.4,6.5-14.8 	C82.4,51.7,82.4,51.5,82.3,51.4z "}),i=logog.append("path").attr({"class":" st3 ",d:" M27,51c0.9-0.5,1.7-1.1,2.1-1.9c0.7-1.2,1.1-2.7,1.4-4.3c-3.2-3.1-4.8-9-3.8-13.4c-0.6-0.4-1.3-0.6-2.1-0.6 	c-1,0-1.9,0.2-2.8,0.6c-0.9,4.9-3.2,10.1-7.2,11.7c-0.3,1.9-0.3,3.8,0.1,5.4c0.1,0.5,0.4,1,0.7,1.4C18.3,48,23.7,48.8,27,51z "}),l=logog.append("path").attr({"class":" st3 ",d:" M13.9,51.8c-1.6-1.4-3.4-2.4-5.5-2.8C4.7,48.3,5,56.1,8.3,62.2c1.2,2.2,3.7,4.8,6,6.5c0.5-1.6,3.4-1.5,6.2-0.6 	c0-0.2,0-0.5,0-0.7c0-0.3,0-0.5-0.1-0.8C15.6,64,12,56.5,13.9,51.8z "}),p=logog.append("path").attr({"class":" st3 ",d:" M12.7,30.3c-0.2-0.2-0.5-0.4-0.7-0.5c-2.5-1.3-4.7,1.7-5.5,5.8c-1.1,5.8,0.3,13,2.6,11c0.7-0.6,1.6-1.8,2.4-3.4 	C9.4,41.5,10.9,34.3,12.7,30.3z "}),d=logog.append("path").attr({"class":" st3 ",d:" M41.4,76.4c0.9-0.4,1.6-1,2.1-1.9c0.4-0.9,0.6-1.9,0.7-2.9c-4.3-2.5-7.7-8.9-7.5-13.8c-1.1-0.7-2.2-1.2-3.3-1.5 	c-1.1-0.2-2.1,0-3,0.7c0,3.7-1.9,8.1-4.6,9.8c-0.1,1.5,0.2,2.9,0.8,4c0.5,0.9,1.3,1.8,2.2,2.5C32.5,71.7,38.3,73.4,41.4,76.4z "}),f=logog.append("path").attr({"class":" st3 ",d:" M88,49c-2.1,0.4-3.9,1.4-5.5,2.8c1.9,4.8-1.7,12.3-6.5,14.8c0,0.3,0,0.5-0.1,0.8c0,0.3,0,0.5,0,0.7 	c2.8-0.9,5.7-0.9,6.2,0.6c2.4-1.7,4.8-4.3,6.1-6.6C91.4,56.1,91.7,48.3,88,49z "}),u=logog.append("path").attr({"class":" st3 ",d:" M65.6,21.9c0.9,0.1,1.8,0.2,2.6,0.1c1.4-0.1,2.3-1,2.8-2.2c-2-3.1-3.2-6.1-0.9-6.2c-0.5-0.8-1.2-1.4-2-1.8 	c-0.9-0.4-2.5-1-4.3-1.5c-0.6,0.9-5.9,1.1-9.8,0.8c-0.3,0.5-0.4,1-0.4,1.7c0,0.2,0,0.3,0.1,0.5C58.5,13.9,64,17.6,65.6,21.9z "}),h=logog.append("path").attr({"class":" st3 ",d:" M42.4,11.1C42.4,11.1,42.4,11.1,42.4,11.1c4.8-0.4,7.2-6,0.6-5.7c-4.3,0.2-9,1.1-10.4,4.6c0,0.1,0,0.2,0,0.3 	C36.3,9.3,41,8.8,42.4,11.1z "}),g=logog.append("path").attr({"class":" st3 ",d:" M42.9,80c0.2-0.7,0.2-1.4-0.2-2c-0.3-0.6-0.8-1.1-1.3-1.6c-3.3,1.5-9.2-0.3-12.7-3.2c-0.6,0.2-1.2,0.5-1.7,0.9 	c0.9,2.3,1.3,5.1,0.8,6.7c1.6,2.1,4,4,5.9,4.5c0.9,0.2,2,0.1,3.1-0.3C36.8,83.2,39.3,81.1,42.9,80z "}),v=logog.append("path").attr({"class":" st3 ",d:" M42.8,13.3c0-0.2,0.1-0.3,0.1-0.5c0-0.7-0.1-1.3-0.4-1.7c-3.8,0.3-9.2,0.1-9.8-0.8c-1.9,0.5-3.5,1.1-4.3,1.5 	c-0.8,0.4-1.5,1-2,1.8c2.2,0.2,1.1,3.1-0.9,6.1c0.4,1.3,1.4,2.2,2.8,2.3c0.8,0,1.7,0,2.6-0.1C32.4,17.6,37.9,13.9,42.8,13.3z "}),m=logog.append("path").attr({"class":" st3 ",d:" M65.8,44.8c0.2,1.6,0.7,3.1,1.4,4.3c0.4,0.8,1.2,1.4,2.1,1.9c3.4-2.2,8.8-3,11.6-1.2c0.3-0.4,0.6-0.9,0.7-1.4 	c0.4-1.6,0.4-3.5,0.1-5.4c-3.9-1.7-6.3-6.9-7.2-11.7c-0.9-0.4-1.8-0.6-2.8-0.6c-0.8,0-1.5,0.3-2.1,0.6C70.6,35.8,69,41.7,65.8,44.8z 	 "}),M=logog.append("path").attr({"class":" st3 ",d:" M53.7,29.4c-1.1,0.9-1.8,2-2.2,3.1c-0.1,0.3-0.2,0.7-0.2,1c5.1,1.9,10.3,7.8,11.4,13.1c1.1-0.3,2.2-1,3.1-1.9 	c-0.8-5.1,0.5-11.4,3.8-13.4c-0.3-1.2-0.7-2.4-1.5-3.3c-0.7-0.9-1.6-1.4-2.8-1.8C63.6,29.2,58,30.2,53.7,29.4z "}),b=logog.append("path").attr({"class":" st3 ",d:" M30.2,56.9c0-1.3-0.2-2.5-0.8-3.5C29,52.5,28.1,51.7,27,51c-3.5,1.8-9.4,1.4-11.6-1.2c-0.6,0.4-1.1,0.9-1.4,1.6 	c-0.1,0.1-0.1,0.2-0.1,0.3c3.8,3.4,6.1,9.2,6.5,14.8c0.8,0.4,1.6,0.7,2.4,0.8c1,0.1,1.9-0.1,2.8-0.7C25.8,63,27.7,58.6,30.2,56.9z "}),z=logog.append("path").attr({"class":" st3 ",d:" M53.5,80c-1.6-0.5-3.4-0.8-5.3-0.8c-1.9,0-3.7,0.3-5.3,0.8c-0.6,2.1-3.4,4.2-6,5.1c0,0.7,0.3,1.4,1.1,2c2.5,2.1,6.4,3,10.3,3c3.9,0.1,7.8-0.9,10.3-3c0.7-0.6,1.1-1.3,1.1-2C56.9,84.3,54.1,82.1,53.5,80z "}),C=logog.append("path").attr({"class":" st3 ",d:" M63.7,10.3c0.1-0.1,0.1-0.2,0-0.3c-1.4-3.5-6.1-4.4-10.4-4.6c-6.6-0.3-4.2,5.2,0.6,5.7c0,0,0,0,0,0 	C55.4,8.8,60,9.3,63.7,10.3z "}),w=logog.append("path").attr({"class":" st3 ",d:" M21.8,31.3c0.2-1.3,0.4-2.6,0.4-3.9c0-1-0.7-1.4-1.8-1.5c-3.7,3.8-5.8,3.9-6.6,2.4c-0.2,0.2-0.3,0.4-0.5,0.6 	c-0.2,0.4-0.4,0.8-0.6,1.3c2.8,2.5,1,8.8-1.2,12.9c0.4,0.3,0.9,0.5,1.6,0.3c0.5-0.1,1-0.3,1.5-0.5C15.4,38.2,18.1,33,21.8,31.3z "}),$=logog.append("path").attr({"class":" st4 ",d:" M27,74.2L27,74.2L27,74.2c-0.5-1.5-1.1-2.8-1.8-3.6c-0.9-1-2.7-2-4.6-2.6c-0.2,3.5-3.2,2.8-6.2,0.6l0,0c-0.1,0.2-0.1,0.4-0.1,0.7c0.4,5.8,5.8,12.3,11.6,13c1.1,0.1,1.7-0.5,2-1.5C26,78.5,25.2,75.7,27,74.2z "}),I=logog.append("path").attr({"class":" st4 ",d:" M20.4,26c0.2-0.2,0.3-0.4,0.5-0.5c1.3-1.4,3.1-3.6,4.4-5.7l0,0c-0.6-1.8-0.3-4.3,0.9-6.1l0,0 	c-0.2,0-0.4,0-0.7,0c-4.5,0.5-8,4.3-10.6,8.7c-1.4,2.3-1.8,4.8-1.1,6.1l0,0C15.2,26.9,18.4,25.8,20.4,26z "}),k=logog.append("path").attr({"class":" st4 ",d:" M81.3,22.3c-2.6-4.3-6-8.1-10.6-8.7c-0.2,0-0.4,0-0.6,0l0,0c1.2,1.8,1.5,4.4,0.9,6.2v0c1.3,2.1,3,4.2,4.3,5.6 	l0.5,0.6c2-0.2,5.2,0.9,6.6,2.3l0-0.1C83.1,27,82.6,24.5,81.3,22.3z "}),L=logog.append("path").attr({"class":" st4 ",d:" M82,68.7c-3,2.2-6,2.8-6.2-0.6c-1.9,0.6-3.7,1.5-4.6,2.6c-0.7,0.8-1.4,2.1-1.9,3.5l0,0l0.1,0.1 	c1.8,1.5,0.9,4.3-0.9,6.7c0.3,1,0.9,1.6,2,1.5c5.8-0.7,11.3-7.2,11.6-13C82.1,69.2,82.1,69,82,68.7L82,68.7z "}),X=logog.append("path").attr({"class":" st4 ",d:" M62.7,46.7L62.7,46.7c-5.5,1.5-12-7.2-11.4-13.2c-1.1-0.4-2.1-0.6-3.1-0.6c-1,0-2.1,0.2-3.1,0.6 	c0.6,5.9-5.9,14.6-11.4,13.2l-0.1,0c0.1-0.3,0.2-0.6,0.3-1c-0.8,2.5-0.7,5,0.6,6.9c0.7,1,1.6,1.9,2.7,2.6c0.1-0.3,0.3-0.6,0.4-0.9 	c1.8-3.1,6.2-4.7,10.6-4.8c4.4,0.1,8.8,1.7,10.6,4.8c0.2,0.3,0.3,0.6,0.4,0.9c1.1-0.7,2-1.6,2.7-2.6c1.3-1.9,1.3-4.3,0.6-6.8 	C62.6,46.1,62.7,46.4,62.7,46.7z "}),Y=logog.append("path").attr({"class":" st3 ",d:" M65.6,21.9c-5.3-0.7-11.5-3.9-12-8.6c-1.2-0.1-2.4-0.1-3.5,0.1c-0.8,0.2-1.5,0.7-1.9,1.3v0.5 	c1.3,2.3,1.2,6.1,0.1,9.2c-0.5,1.3,1.2,3,2.1,3.7c0.9,0.6,2,1,3.3,1.3c3-2.6,8.2-4.1,11.7-3c0.4-0.6,0.6-1.3,0.6-2 	C66,23.5,65.9,22.7,65.6,21.9z "}),O=logog.append("path").attr({"class":" st3 ",d:" M46.2,13.5c-1.1-0.3-2.3-0.3-3.5-0.1c-0.5,4.7-6.7,7.9-12,8.6c-0.3,0.8-0.5,1.6-0.5,2.4c0,0.8,0.2,1.4,0.6,2 	c3.6-1,8.7,0.4,11.7,3c1.3-0.3,2.4-0.7,3.3-1.3c0.2-0.1,0.3-0.2,0.5-0.4c0.2-0.1,0.3-0.3,0.4-0.4c0.1-0.2,0.3-0.3,0.4-0.5 	c0.1-0.2,0.3-0.4,0.4-0.5c0.1-0.2,0.2-0.4,0.3-0.6c0-0.1,0.1-0.1,0.1-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.1,0-0.2c0-0.1,0-0.2,0-0.3 	c0-0.2-0.1-0.5-0.1-0.7c0-0.2-0.1-0.5-0.2-0.7c-0.1-0.4-0.2-0.8-0.3-1.2c-0.2-0.8-0.3-1.7-0.3-2.6c0-1.5,0.2-3.1,0.9-4.4v-0.5 	C47.7,14.1,47.1,13.6,46.2,13.5z "}),A=[a,c,e,n,o,r,s,i,l,p,d,f,u,h,g,v,m,M,b,z,C,w,$,I,k,L,X,Y,O],P=[],j=0;logog.destroy=function(t,a,c){c&&(logog.blockev=!0);var e=t||40;for(var n in A){var o=A[n],r=Math.random()*e*2-e,s=Math.random()*e*2-e;o.transition().attr("transform","translate("+r+","+s+")").duration(a||12.5*e).each("end",function(){o.transition().attr("transform","translate(0,0)").duration(a||12.5*e)})}};for(var q in A)P[P.length]={x:t(2*x),y:t(2*y),path:A[q]},A[q].attr("transform","translate("+P[q].x+","+P[q].y+")"),A[q].on("mouseover",function(){d3.select(this).attr("transform","translate("+(40*Math.random()-20)+","+(40*Math.random()-20)+")")}),A[q].on("mouseout",function(){d3.select(this).transition().attr("transform","translate(0,0)").duration(500)});var B=setInterval(function(){j++;for(var t in P)P[t].x>0?P[t].x-=j:P[t].x+=j,P[t].y>0?P[t].y-=j:P[t].y+=j,P[t].path.attr("transform","translate("+P[t].x+","+P[t].y+")");if(j>25){clearInterval(B);for(var t in A)A[t].attr("transform","translate(0,0)")}},12)}(),function(){var t=[[],[],[]],a=0,c=function(c,e,n){function o(t){t?(l.setpos=function(t,a){l.style({left:t-l.style("width").slice(0,-2)/2+"px",top:a-l.style("width").slice(0,-2)/2+"px"})},l.setscale=function(t){l.style({width:1.9*t+"px",height:1.9*t+"px"})}):(l.setpos=function(t,a){l.attr({x:t,y:a})},l.setscale=function(t){l.attr({width:t,height:t,radius:t})})}function r(){var t=[Math.random(),Math.random(),Math.random()];return function(a){for(var c=t[0]>.5?Math.sin(a):Math.cos(a),e=0,n=0;n<Math.floor(4*t[1]+1);n++)e+=c*Math.floor(5*t[2]);return e}}var s=function(){var a=Math.floor(3*Math.random())-1,c=Math.floor(5*Math.random())-2;return t[a+1]&&-1!=t[a+1].indexOf(c)?s():(t[a+1].push(c),[c,a])};c&&e&&t[e+1].push(c);var i=stage.append("circle").attr({cx:x/2-("undefined"==c?s()[0]:c)*x/6,cy:y/2-("undefined"==e?s()[1]:e)*x/6,"class":"otdel-items atom",r:n.r||x/15});n.file&&i.attr("file",n.file),n.bd&&i.attr("bd",n.bd);var l;n.hasOwnProperty("img")?(l=d3.select("body").append("img").attr({"class":"otdel-img otdel-items nocopy",src:n.img||"/images/image.png"}),o(1)):n.hasOwnProperty("text")?(l=stage.append("text").attr({"class":"otdel-items","font-size":"12px","text-anchor":"middle",textLength:2*(n.r||x/15),fill:"black",x:100,y:100}).text(n.text),o(0)):n.html?(l=d3.select("body").append("div").attr(n.html.attr).attr("class","otdel-img flexmiddle column otdel-items").html(n.html.body),o(1)):(l=stage.append("text").attr({"class":"otdel-items","font-size":"20px","text-anchor":"middle",fill:"#ccc",x:100,y:100}).text("пусто"),o(0)),n.file&&l.attr("file",n.file),n.bd&&l.attr("bd",n.bd),resf.push(function(){l.setpos(x/2-("undefined"==c?s()[0]:c)*x/6,y/2-("undefined"==e?s()[1]:e)*x/6),l.setscale(n.r||x/15),i.attr({cx:x/2-("undefined"==c?s()[0]:c)*x/6,cy:y/2-("undefined"==e?s()[1]:e)*x/6,r:n.r||x/15}),u=parseInt(i.attr("cx")),h=parseInt(i.attr("cy"))});var p=(n.r||x/15)/2,d=setInterval(function(){p<(n.r||x/15)?p+=.55:clearInterval(d),i.attr("r",p),l.setscale(p)},10),f=0,u=parseInt(i.attr("cx")),h=parseInt(i.attr("cy")),g=r(),v=r();a++;var m=setInterval(function(){f+=.01,l.setpos(u+g(f),h+v(f)),i.attr({cx:u+g(f),cy:h+v(f)})},10);return[i,m]};window.renderotdel=function(t){stage.selectAll("circle").remove();var a=t;for(var e in a)c(a[e][0],a[e][1],a[e][2]);fullinfopanel.style("visibility","hidden"),fullinfopanel.style("opacity",0);var n={sys:{x:0,y:0},run:function(t,a){n.sys.x=t,n.sys.y=a;for(var c=0;50>c;c++)svg.append("circle").attr({cx:t,cy:a,fill:"#eee","class":"spritec",opacity:0,r:Math.floor(20*Math.random()+1)}).transition().attr("opacity",.45).duration(90).each("end",function(){d3.select(this).transition().attr({opacity:1,cx:t+Math.floor(500*Math.random()-250),cy:a+Math.floor(500*Math.random()-250)}).duration(1900)})},stop:function(){svg.selectAll(".spritec").transition().attr({opacity:0,cx:n.sys.x,cy:n.sys.y}).duration(900).each("end",function(){d3.select(this).remove()})}},o=!1;$(".otdel-items").on({mouseenter:function(t){n.run(t.pageX,t.pageY),$(this).attr("file")&&(console.log("/g/"+$(this).attr("file")+($(this).attr("bd")?"?bd="+$(this).attr("bd"):"")),$.get("/g/"+$(this).attr("file")+($(this).attr("bd")?"?bd="+$(this).attr("bd"):""),function(t){fullinfopanel.html(t),console.log(t)})),fullinfopanel.style("visibility","visible"),fullinfopanel.transition().style("opacity",1).duration(900).each("end",function(){o=!0})},mousemove:function(t){o&&fullinfopanel.style("visibility","visible").style("opacity",1),fullinfopanel.style("top",t.pageY+(clickpos(t.pageX,t.pageY)[1]?-10-y/2:10)+"px").style("left",t.pageX+(clickpos(t.pageX,t.pageY)[0]?-10-x/2:10)+"px")},click:function(){$(this).attr("file")&&effects.go("/full/"+$(this).attr("file")+($(this).attr("bd")?"?bd="+$(this).attr("bd"):""))},mouseleave:function(){n.stop(),fullinfopanel.transition().style("opacity",0).duration(400).each("end",function(){fullinfopanel.style("visibility","hidden"),o=!1})}})}}();