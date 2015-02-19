/*
 *  http://alignedleft.com/tutorials/d3/binding-data
 *  API https://github.com/mbostock/d3/wiki/API-Reference
 *  http://chimera.labs.oreilly.com/books/1230000000345/index.html
 */ 




///////////  DATA  /////////// 
var xData = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

var selectedYear = 2010; // by default, we display data in 2010.

var dataset = []; // data loaded
var dataMean = [], days = []; // data caculated  {"year":2010,"month":1,"temperatureMean":20}
for(var i = 0; i <= 4; i++ ){
		dataMean[i] = [0,0,0,0, 0,0,0,0, 0,0,0,0];
		days[i] = [0,0,0,0, 0,0,0,0, 0,0,0,0];
	}
 

///////////  DOM  /////////// 
var w = 700;
var h = 300;
var svg = d3.select("svg");

///////////  Functions  ///////////

var converting = function(str){
	if(str[0]==='-'){
		return (parseInt(str.substring(1))*(-1));
	}else{
		return parseInt(str);
	}
};

var fixing = function(loadedData){  //caculating dataMean 
   
	for(var i = 0; i<loadedData.length;i++){
		console.log(loadedData[i]);
		loadedData[i].temperature = converting(loadedData[i].temperature);
		loadedData[i].month = converting(loadedData[i].month);
		//console.log(loadedData[i].temperature);
		for(var year = 2010; year<=2014; year++){
			if(Number(loadedData[i].year) === year){
				//console.log("...");
				switch(loadedData[i].month){
					case 1: dataMean[year-2010][0] += loadedData[i].temperature; days[year-2010][0]++; break;
					case 2: dataMean[year-2010][1] += loadedData[i].temperature; days[year-2010][1]++; break;
					case 3: dataMean[year-2010][2] += loadedData[i].temperature; days[year-2010][2]++; break;
					case 4: dataMean[year-2010][3] += loadedData[i].temperature; days[year-2010][3]++; break;
					case 5: dataMean[year-2010][4] += loadedData[i].temperature; days[year-2010][4]++; break;
					case 6: dataMean[year-2010][5] += loadedData[i].temperature; days[year-2010][5]++; break;
					case 7: dataMean[year-2010][6] += loadedData[i].temperature; days[year-2010][6]++; break;
					case 8: dataMean[year-2010][7] += loadedData[i].temperature; days[year-2010][7]++; break;
					case 9: dataMean[year-2010][8] += loadedData[i].temperature; days[year-2010][8]++; break;
					case 10: dataMean[year-2010][9] += loadedData[i].temperature; days[year-2010][9]++; break;
					case 11: dataMean[year-2010][10] += loadedData[i].temperature; days[year-2010][10]++; break;
					case 12: dataMean[year-2010][11] += loadedData[i].temperature; days[year-2010][11]++; break;
					default: console.log("-----------------------------------13");
				}
			}
		}
	}

	for(var year = 2010; year<= 2014; year++ ){
		for(var month = 1; month <= 12; month++){ 
			dataMean[year-2010][month-1] = Math.round(100*dataMean[year-2010][month-1]/days[year-2010][month-1])/100;
			//	console.log(year+' '+month +' '+ dataMean[year-2010][month-1]+", "+days[year-2010][month-1]);
		}
	}
	/// dataMean[year][month] = temperatureMean
};

 
var displayData = function(selectedYear){

	console.log("displayData " );
	console.log(dataMean[selectedYear-2010]);	
	//var svg = d3.select("section").append("svg");
 
	svg.attr("width", w)
	   .attr("height", h);

	   svg.selectAll("rect")
			   .data(dataMean[selectedYear-2010])
			   .enter()
			   .append("rect")
			   .attr("x", function(d, i) { return i * 33 + 160;})
			   .attr("y", function(d) { 
			   		if(d >= 0){
			   			return (h - 30 - d * 1);
			   		}else{
			   			return (h - 30);
			   		}
			   	})
			   .attr("width", 30)
			   .attr("height",  function(d) { 
			   		if(d>=0){return d * 1;}else{return -1*d;}
			   	})
			   .attr("fill", "#72EDF2");
	
	   svg.selectAll("text")
	    			.data(dataMean[selectedYear-2010])
	    			.enter()
	    			.append("text")
	    			.attr("x",function(d, i) { return i * 33 + 160;})
	    			.attr("y", function(d) { 
				   		if(d >= 0){
				   			return (h - 30 - d*1 - 3);
				   		}else{
				   			return (h - 30 - 3);
				   		}
				   	}) 
	    			.text(function(d) { return d;})
	    			.attr("font-size",8);


	    var padding = 150;
	    var yScale = d3.scale.linear()
	    	.domain([0,230])    
	    	.range([230, 0]);   
	    	
	    var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left")
                  .ticks(6);

        svg.append("g")
		    .attr("class", "axis")
		    .attr("transform", "translate(" + padding + ",40)")
		    .call(yAxis);
 
  
};
 
var changeYear = function(year){
	console.log(year);
	selectedYear = Number(year);
	
	svg.selectAll("rect")
			   .data(dataMean[selectedYear-2010])
			   .transition()
			   .duration(1000)
			   .ease("linear")
			   .attr("x", function(d, i) { return i * 33 + 160;})
			   .attr("y", function(d) { 
			   		if(d >= 0){
			   			return (h - 30 - d * 1);
			   		}else{
			   			return (h - 30);
			   		}
			   	})
			   .attr("width", 30)
			   .attr("height",  function(d) { 
			   		if(d>=0){return d * 1;}else{return -1*d}
			   	})
			   .attr("fill", "#72EDF2");
	
		svg.selectAll("text").remove();

	    svg.selectAll("text")
	    			.data(dataMean[selectedYear-2010])
	    			.enter()
	    			.append("text")
	    			.attr("x",function(d, i) { return i * 33 + 160;})
	    			.attr("y", function(d) { 
				   		if(d >= 0){
				   			return (h - 30 - d*1 - 3);
				   		}else{
				   			return (h - 30 - 3);
				   		}
				   	}) 
	    			.text(function(d) { return d;})
	    			.attr("font-size",8);


	    var padding = 150;
	    var yScale = d3.scale.linear()
	    	.domain([0,230])    
	    	.range([230, 0]);   
	    	
	    var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left")
                  .ticks(6);

        svg.append("g")
		    .attr("class", "axis")
		    .attr("transform", "translate(" + padding + ",40)")
		    .call(yAxis);
  
};

///////////  Functions  ///////////


//load data from csv and.. Start Visulisation 
d3.csv("meteo.csv", function(d){
	console.table(d);
	dataset = d;
	//d3.select('.demo').text(JSON.stringify(d));
	
	fixing(dataset);
	console.table(dataMean);

	displayData(2010);
	  
});
  

//d3.select("section").append("svg"); 
//var svg = d3.select("svg");



			  
