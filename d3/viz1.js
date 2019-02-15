var viz_2_data = {
    neighborhood: [],
    counts: []
}

d3.csv('dataset/dataset2.csv').then((data) => {
    for (let row of data) {
        viz_2_data.neighborhood.push(row['Analysis Neighborhood']);
        viz_2_data.counts.push(+row['Row ID']);
    }
    // console.log(viz_2_data);
}).then(() => {
    let svg = d3.select("#viz1");
    // console.log(svg.node());
    
    // Get max & min count
    let countMin = 0;
    let countMax = Math.max(...viz_2_data.counts);
    // console.log(countMax);
    
    if (isNaN(countMax)) { countMax = 0; }
    
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
    
    // Two scales
    let countScale = d3.scaleLinear()
    .domain([countMin, countMax])
    .range([plotHeight, 0])
    .nice();
    
    let neighborScale = d3.scaleBand()
    .domain(viz_2_data.neighborhood)
    .rangeRound([0, plotWidth])
    .paddingInner(0.1);
    
    let plot = svg.select("g#plot");
    
    if (plot.size() < 1) {
        plot = svg.append("g").attr("id", "plot");
        plot.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    }
    
    let xAxis = d3.axisBottom(neighborScale);
    let yAxis = d3.axisLeft(countScale);
    
    // X-axis
    let xGroup = plot.append("g").attr("id", "x-axis");
    xGroup.call(xAxis);
    xGroup.attr("transform", "translate(0," + plotHeight + ")");
    
    // Y-axis
    let yGroup = plot.append("g").attr("id", "y-axis");
    yGroup.call(yAxis);
    
    // Draw plot
    plot.selectAll("rect")
    .data(viz_2_data.counts)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("width", neighborScale.bandwidth())
    .attr("height", (d) => plotHeight - countScale(d))
    .attr("x", (d, i) => (neighborScale(viz_2_data.neighborhood[i])))
    .attr("y", (d) => countScale(d))
    .attr("fill", "#2a5783");
    
    // Title
    svg.append('text')
    .text('top 5 neighborhoods where most incidents happen')
    .style('fill', '#292929')
    .attr('x', bounds.left + 120)
    .attr('y', 30)
    .style("font-size", "18px")
    .style('font-family', 'Helvetica');
    
    // caption
    svg.append('text')
    .text('Tong Wang')
    .style('fill', '#2d2d2d')
    .attr('x', 0)
    .attr('y', bounds.height - margin.bottom + 45)
    .style("font-size", "12px")
    .style('font-family', 'Helvetica');
    
    svg.append('text')
    .text('The most occurence of incidents is in Tenderloin, following by Mission, Fidi.')
    .style('fill', '#2d2d2d')
    .attr('x', 0)
    .attr('y', bounds.height - margin.bottom + 60)
    .style("font-size", "12px")
    .style('font-family', 'Helvetica');
    
    // Axis titles
    svg.append('text')
    .text('Incidents count')
    .style('fill', '#000000')
    .attr('x', 18)
    .attr('y', plotHeight / 2)
    .style("writing-mode", "vertical-rl")
    .style("font-size", "12px")
    .style('font-family', 'Helvetica');
    
    svg.append('text')
    .text('Analysis Neighborhood')
    .style('fill', '#000000')
    .attr('x', bounds.width / 2 - margin.left)
    .attr('y', margin.top + plotHeight + margin.bottom / 2)
    .style("font-size", "12px")
    .style('font-family', 'Helvetica');
});