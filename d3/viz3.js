var viz_3_data = {
    hour: [],
    counts: [],
    points: [],
};

d3.csv('dataset/dataset3.csv').then((data) => {
    for (let row of data) {
        viz_3_data.hour.push(row['Hour']);
        viz_3_data.counts.push(row['Number of Records']);
        viz_3_data.points.push({x: row['Hour'], y: row['Number of Records']})
    }
    console.log(viz_3_data);
}).then(() => {
    let svg = d3.select("#viz3");
    // console.log(svg.node());
    
    // Get max & min count
    let countMin = 0;
    let countMax = 779;
    
    // Margin
    let margin = {
        top: 50,
        right: 20,
        bottom: 70,
        left: 60
    }
    
    // Size of plot
    let bounds = svg.node().getBoundingClientRect();
    let plotWidth = bounds.width - margin.right - margin.left;
    let plotHeight = bounds.height - margin.top - margin.bottom;
    // console.log(plotWidth);
    
    // Y-axis scale
    let countScale = d3.scaleLinear()
    .domain([countMin, countMax])
    .range([plotHeight, 0])
    .nice();
    
    // X-axis scale
    let dayScale = d3.scaleBand()
    .domain(viz_3_data.hour)
    .rangeRound([0, plotWidth])
    .paddingInner(0.1);
    
    let plot = svg.select("g#plot");
    
    if (plot.size() < 1) {
        plot = svg.append("g").attr("id", "plot");
        plot.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    }
    
    let xAxis = d3.axisBottom(dayScale);
    let yAxis = d3.axisLeft(countScale);
    
    // X-axis
    let xGroup = plot.append("g").attr("id", "x-axis");
    xGroup.call(xAxis);
    xGroup.attr("transform", "translate(0," + plotHeight + ")");
    
    // Y-axis
    let yGroup = plot.append("g").attr("id", "y-axis");
    yGroup.call(yAxis);
    
    let lineFunction = d3.line()
    .x((d) => dayScale(d.x))
    .y((d) => countScale(d.y));
    
    plot.append("path")
    .attr("d", lineFunction(viz_3_data.points))
    .attr("stroke", "#2a5783")
    .attr("stroke-width", 2)
    .attr("fill", "none");
    
    // Title
    svg.append('text')
    .text('Incidents trend per hour')
    .style('fill', '#292929')
    .attr('x', plotWidth / 2 - 50)
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
    .text('Incidents concentrate between 12:00 to 19:00')
    .style('fill', '#3d3d3d')
    .attr('x', 0)
    .attr('y', bounds.height - margin.bottom + 60)
    .style("font-size", "12px")
    .style('font-family', 'Helvetica');
    
    // Axis titles
    svg.append('text')
    .text('Number of records')
    .style('fill', '#000000')
    .attr('x', 20)
    .attr('y', plotHeight / 2)
    .style("font-size", "12px")
    .style("writing-mode", "vertical-rl")
    .style('font-family', 'Helvetica');
    
    svg.append('text')
    .text('Hour')
    .style('fill', '#000000')
    .attr('x', bounds.width / 2)
    .attr('y', bounds.height - margin.bottom + 35)
    .style("font-size", "12px")
    .style('font-family', 'Helvetica');
})