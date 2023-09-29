const barviz=document.querySelector('#barFrame')

// define dimensions and margins for the graphic
const margin = ({ top: 100, right: 50, bottom: 100, left: 80 })
const width = 1000;
const height = 1000;

// JSON object to count display for the year

var svg = d3.select("#barFrame")
  .append("svg")
    .attr("width", width + margin.left + margin.right+200)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv('data/sculptureMed.csv').then(function (data) {

  console.log(data)

  // Creating Subgroups for bar stacking
  var subgroups = data.columns.slice(1)
  console.log(subgroups)

  // creating groups that define the X-axis parameters
  var groups = d3.map(data, function (d) { return (d.museumEra) })
  console.log(groups)

  // Add X axis
  var x = d3.scaleBand()
    .domain(groups)
    .range([0, width])
    .padding([0.3])

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSizeOuter(0));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 1500])
    .range([height, 0]);
  
  svg.append("g")
    .call(d3.axisLeft(y));

  
  // Draw X Axis Label
    svg
    .append('text')
    .attr('x', height/2 - 200)
    .attr('y', width - 100)
    .style('text-anchor', 'middle')
    .style('font-weight', 'bold')
    .style('font-size', '16px')
    .text('Era');

  //Draw Y Axis Label        
  svg.append('text')
  .attr('x', -height / 2) // Set the x-coordinate (negative for left of the Y-axis)
  .attr('y', -50) // Adjust the y-coordinate as needed for positioning
  .style('text-anchor', 'middle')
  .style('font-weight', 'bold')
  .style('font-size', '16px')
  .attr('transform', 'rotate(-90)') // Rotate the label text vertically
  .text('No. of Displays');


  var subgroupColorScale = d3.scaleSequential(d3.interpolatePiYG)
    .domain([0, subgroups.length - 1]);

  // color palette = one color per subgroup
  var color = d3.scaleOrdinal()
    .domain(subgroups)
    // .range([]])
    .range(subgroups.map(function (d, i) {
    return subgroupColorScale(i);
  }));

  //stack the data? --> stack per subgroup
  var stackedData = d3.stack()
    .keys(subgroups)
    (data)


  // Show the bars
  svg.append("g")
    .selectAll("g")
    // Enter in the stack data = loop key per key = group per group
    .data(stackedData)
    .enter().append("g")
    .attr("fill", function (d) { return color(d.key); })
    .selectAll("rect")
    // enter a second time = loop subgroup per subgroup to add all rectangles
    .data(function (d) { return d; })
    .enter().append("rect")
    .attr("x", function (d) { return x(d.data.museumEra); })
    .attr("y", function (d) { return y(d[1]); })
    .attr("height", function (d) { return y(d[0]) - y(d[1]); })
    .attr("width", x.bandwidth());
  
 var legend = svg.selectAll(".legend")
    .data(subgroups)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) {
        return "translate(0," + i * 20 + ")"; // Adjust the spacing between legend items
    });

legend.append("rect")
    .attr("x", width + 120) // Adjust the 'x' position to the right of the chart
    .attr("y",-90)
    .attr("width", 12)
    .attr("height", 2)
    .style("fill", color); // Use the color scale to set the fill

legend.append("text")
    .attr("x", width + 150) // Adjust the 'x' position to the right of the rect
    .attr("y", -90)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .text(function(d) { return d; });

     
})












