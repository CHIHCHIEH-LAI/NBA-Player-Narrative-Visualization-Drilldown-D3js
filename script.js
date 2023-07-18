document.addEventListener("DOMContentLoaded", function() {
	// Load the bar chart dataset
	d3.csv("average_salary_by_position.csv").then(function (barChartData) {
	    // Preprocess the bar chart data
	    barChartData.forEach(function (d) {
	        d.average_salary = +d.average_salary;
	        d.record_count = +d.record_count;
	    });
	
	    // Load the scatter plot dataset
	    d3.csv("salary_rating_table.csv").then(function (scatterPlotData) {
	        // Preprocess the scatter plot data
	        scatterPlotData.forEach(function (d) {
		d.salary = +d.salary;
		d.rating = +d.rating;
	        });
	
	        // Define the parameters
	        var selectedCountry = "USA";
	        var selectedPosition = "G";
	        var isSecondScene = false; // Flag to track if the second scene is built
	
	        // Handle the dropdown menu selection
	        var dropdown = d3.select("#container").select("#dropdown-container").select("#country-select").on("change", function () {
		selectedCountry = this.value;
		updateVisualization();
	        });
	
	        // Get a reference to the back button element
	        var backButton = document.getElementById("back-button");
	
	        // Function to clear the chart
	        function clearChart() {
		d3.select("#container").select("#visualization-container").selectAll("svg").remove();
	        }
	
	        function clearDescription() {
		d3.select("#description-container")
		    .selectAll("p")
		    .remove();
	        }
	
	        // Function to go back to the first scene
	        function goBack() {
		isSecondScene = false;
		updateVisualization();
	        }
	
	        // Function to update the visualization based on the selected country and scene
	        function updateVisualization() {
		// Clear the existing chart and description
		clearChart();
		clearDescription();
	
		if (isSecondScene) {
		    backButton.style.display = "block"; // Show the back button
		    dropdown.property("disabled", true); // Disable the dropdown menu
		    buildScatterPlot();
		} else {
		    backButton.style.display = "none"; // Hide the back button
		    dropdown.property("disabled", false); // Enable the dropdown menu
		    buildOverviewBarChart();
		}
	        }
	
	        // Build the first scene - Overview bar chart
	        function buildOverviewBarChart() {
		// Define the dimensions and margins for the chart
		var width = 700;
		var height = 400;
		var margin = { top: 40, right: 20, bottom: 50, left: 65};
	
		// Create the SVG element
		var svg = d3.select("#container").select("#visualization-container")
		    .append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		    .append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
		// Define x and y scales
		var x = d3.scaleBand()
		    .domain(['G', 'G-F', 'F', 'F-C', 'C'])
		    .range([0, width])
		    .padding(0.3);
	
		var y = d3.scaleLinear()
		    .domain([0, 18000000])
		    .range([height, 0]);
	
		// Define the y-axis generator with customized tick format
		var yAxis = d3.axisLeft(y)
		    .tickFormat(d3.format("~s")); // Custom format: e.g., "1M" instead of "1000000"
	
		// Filter the scatter plot data based on the selected country and position (example code)
		var filteredBarChartData = barChartData.filter(function(d) {
		  return d.country === selectedCountry;
		});
	
		// Implement the bar chart using D3
		var bars = svg.selectAll("rect")
		    .data(filteredBarChartData)
		    .enter()
		    .append("rect")
		    .attr("x", function (d) { return x(d.position); })
		    .attr("y", function (d) { return y(d.average_salary); })
		    .attr("width", x.bandwidth())
		    .attr("height", function (d) { return height - y(d.average_salary); })
		    .attr("fill", "steelblue")
		    .on("click", function (d) {
		        isSecondScene = true;
		        selectedPosition = d.srcElement.__data__.position;
		        updateVisualization();
		    });
	
		// Add axes
		svg.append("g")
		    .attr("transform", "translate(0," + height + ")")
		    .call(d3.axisBottom(x));
	
		svg.append("g")
		    .call(yAxis);
	
		// Add axis titles
		svg.append("text")
		    .attr("x", width / 2)
		    .attr("y", height + margin.bottom - 10)
		    .attr("text-anchor", "middle")
		    .text("Position");
	
		svg.append("text")
		    .attr("x", -margin.left+20)
		    .attr("y", height / 2)
		    .attr("text-anchor", "middle")
		    .attr("transform", "rotate(-90, " + (-margin.left+20) + ", " + height / 2 + ")")
		    .text("Average Salary ($)");
	
		// Add chart title
		svg.append("text")
		    .attr("x", width / 2)
		    .attr("y", -margin.top+20)
		    .attr("text-anchor", "middle")
		    .style("font-size", "22px")
		    .style("font-weight", "bold")
		    .text("Overview: NBA First-Round Drafted Players' Average Salary by Position");
	
		//  Add tooltips using d3-annotation
		bars.append("title")
		    .text(function (d) { 
		        var scaledSalary = (d.average_salary / 1000000).toFixed(3);
		        return "Position: " + d.position + "\nRecord Count: " + d.record_count + "\nAverage Salary: $" + scaledSalary + "M"; 
		    });
		
		// Add annotation
		svg.append("text")
		    .attr("x", 10)
		    .attr("y", 15)
		    .attr("text-anchor", "start")
		    .style("font-size", "16px")
		    .text("Hover over or Click any bar for more details");
	
		// Define the scene description
		var sceneDescription = "The chart on the web page presents an overview of NBA player salaries by position, showcasing the average salary for each role. It provides valuable insights into salary distribution and reveals how teams allocate resources based on positions and countries. By exploring the chart, users can gain a comprehensive understanding of the financial landscape of the NBA and the significance attributed to each position.";
	
		// Append the description to the description container
		d3.select("#description-container")
		    .append("p")
		    .text(sceneDescription);
		
	        }
	
	        // Build the second scene - Scatter plot
	        function buildScatterPlot() {
		// Define the dimensions and margins for the plot
		var width = 700;
		var height = 400;
		var margin = { top: 40, right: 100, bottom: 50, left: 65};
	
		// Create the SVG element
		var svg = d3.select("#container").select("#visualization-container")
		    .append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		    .append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
		// Define x and y scales
		var x = d3.scaleLinear()
		    .domain([0, 53000000])
		    .range([0, width]);
	        
		var y = d3.scaleLinear()
		    .domain([65, 100])
		    .range([height, 0]);
	
		var xAxis = d3.axisBottom(x)
		    .tickFormat(d3.format("~s")); // Custom format: e.g., "1M" instead of "1000000"
	
		// Filter the scatter plot data based on the selected country and position (example code)
		var filteredScatterPlotData = scatterPlotData.filter(function(d) {
		  return d.country === selectedCountry && d.position === selectedPosition;
		});
		
		// Create circles for the scatter plot
		var circles = svg.selectAll("circle")
		    .data(filteredScatterPlotData)
		    .enter()
		    .append("circle")
		    .attr("cx", function(d) { return x(d.salary); })
		    .attr("cy", function(d) { return y(d.rating); })
		    .attr("r", 4)
		    .attr("fill", "steelblue");
	
		// Add axes
		svg.append("g")
		    .attr("transform", "translate(0," + height + ")")
		    .call(xAxis);
	        
		svg.append("g")
		    .call(d3.axisLeft(y));
	
		// Add axis titles
		svg.append("text")
		    .attr("x", width / 2)
		    .attr("y", height + margin.bottom - 10)
		    .attr("text-anchor", "middle")
		    .text("Salary ($)");
	        
		svg.append("text")
		    .attr("x", -margin.left + 20)
		    .attr("y", height / 2)
		    .attr("text-anchor", "middle")
		    .attr("transform", "rotate(-90, " + (-margin.left + 20) + ", " + height / 2 + ")")
		    .text("2K Rating");
	
		// Add chart title
		svg.append("text")
		    .attr("x", width / 2)
		    .attr("y", -margin.top + 20)
		    .attr("text-anchor", "middle")
		    .style("font-size", "22px")
		    .style("font-weight", "bold")
		    .text("Details: NBA First-Round Drafted Players' Salary and Rating for " + selectedPosition)
	
		// Add tooltips using d3-annotation
		circles.append("title")
		    .text(function (d) { 
		        var scaledSalary = (d.salary / 1000000).toFixed(3);
		        return "Name: " + d.full_name + "\nRating: " + d.rating + "\nSalary: $" + scaledSalary + "M"; 
		    });
	
		// Horizontal line data
		var lineData = [
		    { y: y(92.5) },
		    { y: y(85.5) },
		    { y: y(75.5) }
		];
		
		// Create line generator
		var lineGenerator = d3.line()
		    .x(0)
		    .y(function(d) { return d.y; });
		
		// Append lines to the SVG
		svg.selectAll("path.horizontal-line")
		    .data(lineData)
		    .enter()
		    .append("path")
		    .attr("class", "horizontal-line")
		    .attr("d", function(d) {
		        return "M" + "0" + "," + d.y + "H" + width;
		    })
		    .style("stroke", "gray")  // Line color
		    .style('opacity', 0.8) // Reduce opacity
		    .style("stroke-width", 1)  // Line width
		    .style("stroke-dasharray", "3,3");  // Dotted line style
	
		// Annotation data
		var annotationData = [
		    { ratingRange: 'Superstars', ratingMin: 93, ratingMax: 100 },
		    { ratingRange: 'All-Stars', ratingMin: 86, ratingMax: 92 },
		    { ratingRange: 'Starters', ratingMin: 76, ratingMax: 85 },
		    { ratingRange: 'Role Players', ratingMin: 60, ratingMax: 75 }
		];
		
		// Create an annotation group
		var annotationGroup = svg.append('g')
		    .attr('class', 'annotation-group');
	
		// Add the annotations to the group
		var makeAnnotations = d3.annotation()
		    .type(d3.annotationLabel)
		    .accessors({
		        x: width-40,
		        y: function(d) { return y((d.ratingMin + d.ratingMax) / 2); }
		    })
		    .annotations(annotationData.map(function(d) {
		        return {
			note: {
			    label: d.ratingRange,
			    title: '',
			    wrap: 100
			},
			x: width-40,
			y: y(d.ratingMax),
			dx: 40,
			dy: 0
		        };
		    }));
		
		annotationGroup.call(makeAnnotations);
		
		// Style the annotation labels
		annotationGroup.selectAll('.annotation-note-label')
		    .style('text-anchor', 'middle') // Align labels to the right
		    .style('font-size', '16px'); // Adjust font size as needed
		
		// Add annotation
		svg.append("text")
		    .attr("x", 10)
		    .attr("y", 15)
		    .attr("text-anchor", "start")
		    .style("font-size", "16px")
		    .text("Hover over a point for more details");
	
		// Define the scene description
		var sceneDescription = "The second scene analyzes NBA player salaries and ratings for the selected position. It features a scatterplot showing the relationship between salary and 2K rating, representing signed contracts. Users can explore the correlation between performance and financial investment, gaining insights into the NBA free agent market.";
	        
		// Append the description to the description container
		d3.select("#description-container")
		    .append("p")
		    .text(sceneDescription);
	        }
	
	        // Add a click event listener to the back button
	        backButton.addEventListener("click", goBack);
	        
	        // Call the function to initially build the visualization
	        updateVisualization();
	        
	    }).catch(function (error) {
	        console.log(error);
	    });
	}).catch(function (error) {
	    console.log(error);
	});
	});