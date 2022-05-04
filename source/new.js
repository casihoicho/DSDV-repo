(function (d3) { 
    'use strict';
    const margin = {top: 10, right: 10, bottom: 10, left: 10},
    w = 1400 - margin.left - margin.right,
    h = 1000 - margin.top - margin.bottom;
  
  // append the svg object to the body of the page
  const svg = d3.select("body")
  .append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          `translate(${margin.left}, ${margin.top})`);

    var rowConverter = function(d) {
        return {
            listed_in:d['listed_in'],
            name:d['name'],
            amount: parseFloat(d['amount']),
         
        };
       }

    d3.csv('https://raw.githubusercontent.com/casihoicho/DSDV-repo/Duy/new.csv',rowConverter).then(function(data) {

   let data1=data.filter(function(d){return d.name=="India"})
      data1.unshift({"listed_in":"India","name":"","amount":0})
  // stratify the data: reformatting for d3.js
  const root = d3.stratify()
    .id(function(d) { return d['listed_in']; })   // Name of the entity (column name is name in csv)
    .parentId(function(d) { return d.name; })   // Name of the parent (column name is parent in csv)
    (data1);
  root.sum(function(d) { return +d.amount  })   // Compute the numeric value for each entity

  // Then d3.treemap computes the position of each element of the hierarchy
  // The coordinates are added to the root object above
  d3.treemap()
    .size([w, h-50])
    .padding(4)
    (root)

  // use this information to add rectangles:
  svg
    .selectAll("rect")
    .data(root.leaves())
    .join("rect")
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("stroke", "black")
      .attr("fill", function(d) {
        return "rgb(60," +(Math.round((d.y1-d.y0)*(d.x1-d.x0)) /600)+ ", " + (Math.round((d.y1-d.y0)*(d.x1-d.x0)) /620) + ")";
       });
        

  // and to add the text labels
  svg
    .selectAll("text")
    .data(root.leaves())
    .join("text")
      .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
      .attr("y", function(d){ return d.y0+15})

      .text(function(d){ return (d.x1 - d.x0 >105) ? d.data.listed_in : ''; })
      .attr("font-size", "15px")
      .attr("fill", "white")
      







      var allGroup = [];
      data.map(d=> allGroup.push(d.name));
      
      var unique = [...new Set(allGroup)];
console.log(unique)
// Initialize the button
var dropdownButton = d3.select("body")
  .append('select')

// add the options to the button
dropdownButton // Add a button
  .selectAll('myOptions') // Next 4 lines add 6 options = 6 colors
 	.data(unique)
  .enter()
	.append('option')
  .text(function (d) { return d; }) // text showed in the menu
  .attr("value", function (d) { return d; }) // corresponding value returned by the button

// Initialize a circle


function updateChart(data2) {
    const root = d3.stratify()
    .id(function(d) { return d['listed_in']; })   // Name of the entity (column name is name in csv)
    .parentId(function(d) { return d.name; })   // Name of the parent (column name is parent in csv)
    (data2);
  root.sum(function(d) { return +d.amount  })   // Compute the numeric value for each entity

  // Then d3.treemap computes the position of each element of the hierarchy
  // The coordinates are added to the root object above
  d3.treemap()
    .size([w, h-50])
    .padding(4)
    (root)

  // use this information to add rectangles:
  svg
    .selectAll("rect")
    .data(root.leaves())
    .join("rect")
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("stroke", "black")
      .attr("fill", function(d) {
        return "rgb(60," +(Math.round((d.y1-d.y0)*(d.x1-d.x0)) /600)+ ", " + (Math.round((d.y1-d.y0)*(d.x1-d.x0)) /620) + ")";
       });

  // and to add the text labels
  svg
    .selectAll("text")
    .data(root.leaves())
    .join("text")
      .attr("x", function(d){ return d.x0+5})    // +10 to adjust position (more right)
      .attr("y", function(d){ return d.y0+15})

      .text(function(d){ return (d.x1 - d.x0 >105 && d.y1 - d.y0>40) ? d.data.listed_in : ''; })
      .attr("font-size", "15px")
      .attr("fill", "white")
      
}

// When the button is changed, run the updateChart function
dropdownButton.on("change", function(d) {

    // recover the option that has been chosen
    var selectedOption = d3.select(this).property("value")
    let data2=data.filter(function(d){return d.name==selectedOption})
    data2.unshift({"listed_in":selectedOption,"name":"","amount":0})
    // run the updateChart function with this selected option
    updateChart(data2)
})
})


}(d3))