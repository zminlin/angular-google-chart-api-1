# Angular-google-chart-api

## Requirements

- AngularJS

## Usage

- Import the module

```sh
angular.module('myApp', ['ngGoogleChart']);
```

- Add in html page

```sh
<div google-chart chart="chart"></div>
```
- if you want to get google chart as imageURI, you can add as follows,
```sh
<div google-chart chart="chart" imguri="imgURI"></div>
```

- Add Object in Controller
```sh
$scope.chart = {
    	type : "linechart",
    	data :  {
	      
			cols: [
				{id:"date",type:"date",label:"Date"},
				{id:"dailyNum",type:"number",label:"Daily Number"},
				{id:"totalNum",type:"number",label:"Summary Number"}
			],
			rows: [
				{c:[{v:new Date("2014/8/10")},{v:5},{v:5}]},
				{c:[{v:new Date("2014/8/11")},{v:15},{v:20}]},
				{c:[{v:new Date("2014/8/12")},{v:33},{v:53}]},
				{c:[{v:new Date("2014/8/13")},{v:51},{v:104}]},
				{c:[{v:new Date("2014/8/14")},{v:18},{v:122}]},
				{c:[{v:new Date("2014/8/15")},{v:5},{v:127}]},
				{c:[{v:new Date("2014/8/16")},{v:46},{v:173}]},
				{c:[{v:new Date("2014/8/17")},{v:33},{v:206}]},
				{c:[{v:new Date("2014/8/18")},{v:51},{v:257}]},
				{c:[{v:new Date("2014/8/19")},{v:18},{v:275}]},
				{c:[{v:new Date("2014/8/20")},{v:84},{v:359}]},
				{c:[{v:new Date("2014/8/21")},{v:15},{v:374}]},
				{c:[{v:new Date("2014/8/22")},{v:33},{v:407}]},
				{c:[{v:new Date("2014/8/23")},{v:51},{v:458}]},
				{c:[{v:new Date("2014/8/24")},{v:18},{v:476}]},
				{c:[{v:new Date("2014/8/25")},{v:2},{v:478}]},
				{c:[{v:new Date("2014/8/26")},{v:19},{v:497}]},
				{c:[{v:new Date("2014/8/27")},{v:33},{v:530}]},
				{c:[{v:new Date("2014/8/28")},{v:51},{v:581}]},
				{c:[{v:new Date("2014/8/29")},{v:18},{v:599}]},
				{c:[{v:new Date("2014/8/30")},{v:24},{v:623}]},
				{c:[{v:new Date("2014/8/31")},{v:7},{v:630}]},
				{c:[{v:new Date("2014/9/1")},{v:15},{v:645}]},
				{c:[{v:new Date("2014/9/2")},{v:33},{v:678}]},
				{c:[{v:new Date("2014/9/3")},{v:51},{v:729}]},
				{c:[{v:new Date("2014/9/4")},{v:18},{v:747}]},
				{c:[{v:new Date("2014/9/5")},{v:5},{v:752}]},
				{c:[{v:new Date("2014/9/6")},{v:15},{v:767}]},
				{c:[{v:new Date("2014/9/7")},{v:33},{v:800}]},
				{c:[{v:new Date("2014/9/8")},{v:51},{v:851}]},
				{c:[{v:new Date("2014/9/9")},{v:18},{v:869}]},
				{c:[{v:new Date("2014/9/10")},{v:5},{v:874}]},
			]				
		},
		options: {
		    // title: "2014-",
		    isStacked: "true",
		    fill: 20,
		    // displayExactValues: true,
		    height: 300,
		    vAxis: {
		      "title": "Ticket Type",

		    },
		    hAxis: {
		      title: "ratio",
		    //   minValue: 0, maxValue: 100,
		    
		    },
		    formatType:"long",
		    // legend: 'none',
		}
    };
```
