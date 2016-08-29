
(function(){
  var text = scrapeData;

  var windowSize = [700, 400];
  var halfWidth = windowSize[0]/2;
  var halfHeight = windowSize[1]/2;
  var fill = d3.scale.category20();

    d3.layout.cloud().size(windowSize)
        .words(text)
        .rotate(function() { return ~~(Math.random() * 2) * 90; })
        .font("Impact")
        .fontSize(function(d) { return (d.size * 15); })
        .on("end", draw)
        .start();

    function draw(words) {
      d3.select("body").append("svg")
          .attr("width", windowSize[0])
          .attr("height", windowSize[1])
        .append("g")
          .attr("transform", "translate(" + halfWidth + "," + halfHeight + ")")
        .selectAll("text")
          .data(words)
        .enter().append("text")
          .style("font-size", function(d) { return d.size + "px"; })
          .style("font-family", "Impact")
          .style("fill", function(d, i) { return fill(i); })
          .attr("text-anchor", "middle")
          .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .text(function(d) { return d.text; });
    }
})();