// (function(){
//   window.drawPath = new Object();
//   var path;
//
//   drawPath.draw = function(coor){
//       var coo = coor || "M 0 60 L 50 110 L 90 70 L 140 100";
//
//       if(coor && typeof coor === typeof []){
//         var fin = 'M ';
//         for(var i in coor){
//           if(i){
//             fin+=coor[i][0]+' '+coor[i][1]+' ';
//           }else{
//             fin+='L '+coor[i][0]+' '+coor[i][1]+' ';
//           }
//         }
//         coo = fin;
//         this.coors = coor;
//       }
//       if(!path){
//         path = svg.append("path")
//                   .attr({
//                     "d": coo,
//                     "id": "pathline"
//                   })
//                   .style("stroke-width", 0.5)
//                   .style("stroke", "steelblue")
//                   .style("fill", "none");
//       }else{
//         path.attr("d",coo);
//       }
//     }
//
//   drawPath.updatec = function(x,y,n){
//       if(x&&y&&n){
//           this.coors[n]=[x,y];
//           this.draw(this.coors);
//       }
//     }
// })();
