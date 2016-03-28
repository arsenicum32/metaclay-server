(function(){
  var lines = d3.select('svg').append('g');
  logog.fstart = function(){
    var coo = this.coo;
    if( coo ){
      for(var i in coo){
        lines.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", x/2 + coo[i][0])
            .attr("y2", y/2  + coo[i][1])
            .attr("stroke-width", 2)
            .attr("stroke", "black");
      }
    }
  }
  logog.fend = function(){
    lines.selectAll('line').remove();
  }
})();
