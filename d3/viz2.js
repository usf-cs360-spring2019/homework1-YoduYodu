var viz_1_data = {
  sunday: 0,
  monday: 0,
  tuesday: 0,
  wednesday: 0,
  thursday: 0,
  friday: 0,
  saturday: 0
}

d3.csv("dataset/incidents.csv").then(function(data) {
  for (let row of data) {
    switch (row['Incident Day of Week']) {
      case 'Monday':
      viz_1_data.monday++;
      break;
      case 'Tuesday':
      viz_1_data.tuesday++;
      break;
      case 'Wednesday':
      viz_1_data.wednesday++;
      break;
      case 'Thursday':
      viz_1_data.thursday++;
      break;
      case 'Friday':
      viz_1_data.friday++;
      break;
      case 'Saturday':
      viz_1_data.saturday++;
      break;
      case 'Sunday':
      viz_1_data.sunday++;
      break;
    }
  }
  // console.log(viz_1_data);
}).then(() => {
  drawBarChart();
});

var drawBarChart = function() {
  // Get svg to draw
  let svg = d3.select("#viz2");
//   console.log(svg.node());
  
  // Get max & min count
  let countMin = 0;
  let countMax = d3.max(d3.values(viz_1_data));
  // console.log(countMax);
  
  if (isNaN(countMax)) {
    countMax = 0;
  }
  
  // Margin
  let margin = {
    top: 50,
    right: 20,
    bottom: 70,
    left: 140
  }
  
  // size of plot
  let bounds = svg.node().getBoundingClientRect();
  let plotWidth = bounds.width - margin.right - margin.left;
  let plotHeight = bounds.height - margin.top - margin.bottom;
  // console.log(plotWidth);
  
  let countScale = d3.scaleLinear()
  .domain([countMin, countMax])
  .range([0, plotWidth])
  .nice();
  
  let dayScale = d3.scaleBand()
  .domain(Object.keys(viz_1_data))
  .rangeRound([0, plotHeight])
  .paddingInner(0.1);
  // console.log(dayScale);
  
  let plot = svg.select("g#plot");
  
  if (plot.size() < 1) {
    plot = svg.append("g").attr("id", "plot");
    plot.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  }
  
  let xAxis = d3.axisBottom(countScale);
  let yAxis = d3.axisLeft(dayScale);
  
  // X-axis
  let xGroup = plot.append("g").attr("id", "x-axis");
  xGroup.call(xAxis);
  xGroup.attr("transform", "translate(0," + plotHeight + ")");
  
  // Y-axis
  let yGroup = plot.append("g").attr("id", "y-axis");
  yGroup.call(yAxis);
  // yGroup.attr("transform", "translate(" + plotWidth + ",0)");
  
  var color = d3.scaleLinear()
  .domain([1400, 2011])
  .range(["#b9ddf1", "#2a5783"]);
  
  // draw plot
  let bars = plot.selectAll("rect")
  .data(Object.values(viz_1_data));
  
  bars.enter().append("rect")
  .attr("class", "bar")
  .attr("height", dayScale.bandwidth() * 0.7)
  .attr("width", (d) => countScale(d))
  .attr("x", 0)
  .attr("y", (d, i) => {
    // console.log(Object.keys(viz_1_data)[i]);
    return dayScale(Object.keys(viz_1_data)[i]) + 8;
  })
  .attr("fill", (d) => {
    // console.log(color(d));
    return color(d)
  });

  // Title
  svg.append('text')
  .text('occurence of incidents during weekdays')
  .style('fill', '#292929')
  .attr('x', plotWidth / 2)
  .attr('y', 30)
  .style("font-size", "18px")
  .style('font-family', 'Helvetica');

  // caption
  svg.append('text')
  .text('Tong Wang')
  .style('fill', '#3d3d3d')
  .attr('x', 0)
  .attr('y', bounds.height - margin.bottom + 45)
  .style("font-size", "12px")
  .style('font-family', 'Helvetica');

  svg.append('text')
  .text('Incidents happen more on weedends and Monday.')
  .style('fill', '#3d3d3d')
  .attr('x', 0)
  .attr('y', bounds.height - margin.bottom + 60)
  .style("font-size", "12px")
  .style('font-family', 'Helvetica');

  // Axis titles
  svg.append('text')
  .text('Incident Day of Week')
  .style('fill', '#000000')
  .attr('x', 20)
  .attr('y', margin.top)
  .style("font-size", "12px")
  .style('font-family', 'Helvetica');

  svg.append('text')
  .text('Number of records')
  .style('fill', '#000000')
  .attr('x', bounds.width / 2)
  .attr('y', bounds.height - margin.bottom + 35)
  .style("font-size", "12px")
  .style('font-family', 'Helvetica');
}

