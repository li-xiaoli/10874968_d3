/*
 *  http://alignedleft.com/tutorials/d3/binding-data
 *  API https://github.com/mbostock/d3/wiki/API-Reference
 *  http://chimera.labs.oreilly.com/books/1230000000345/index.html
 */ 

///////////  DOM  /////////// 

d3.select("section").append("svg"); 
 

///////////  DATA  ///////////

var selectedYear = 2010; // by default, we display data in 2010.

var dataset = []; // data loaded
var dataMean = [], days = []; // data caculated  {"year":2010,"month":1,"temperatureMean":20}
for(var i = 0; i <= 4; i++ ){
		dataMean[i] = [0,0,0,0, 0,0,0,0, 0,0,0,0];
		days[i] = [0,0,0,0, 0,0,0,0, 0,0,0,0];
	}

var converting = function(str){
	if(str[0]==='-'){
		return (parseInt(str.substring(1))*(-1));
	}else{
		return parseInt(str);
	}
};

var fixing = function(loadedData){
   
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
	d3.select(".vis").selectAll("p")
	    .data(dataMean[selectedYear-2010])
	    .enter()
	    .append("p")
	    .text(function(d){return "The data here is "+d;});

    console.log(d3.selectAll("p"))
}

//load data from csv and.. Start Visulisation 
d3.csv("meteo.csv", function(d){
	console.table(d);
	dataset = d;
	//d3.select('.demo').text(JSON.stringify(d));
	
	fixing(dataset);
	console.table(dataMean);

	displayData(selectedYear);
	
	
	
});











  
