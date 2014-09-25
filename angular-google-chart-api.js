(function() {
angular.module('ngGoogleChart',[])
	.value('googleChartApiConfig',{
	    version: '1',
	    optionalSettings: {
	      packages: ['corechart']
	    }
	})
	.provider('googleChartJsApiUrl', function () {
	    var protocol = 'https://',
	        url = 'www.google.com/jsapi';
	      this.setProtocol = function(newProtocol) {
	          protocol = newProtocol;
	      };

	      this.setUrl = function(newUrl) {
	          url = newUrl;
	      };

	      this.$get = function() {
	          return (protocol ? protocol : '') + url;
	      };
	})
	.factory('googleChartApiPromise', ['$rootScope', '$q', 'googleChartApiConfig', 'googleChartJsApiUrl', function ($rootScope, $q, apiConfig, googleJsapiUrl) {
        //refer angular-google-chart
        var apiReady = $q.defer();
        var onLoad = function () {
            // override callback function
            var settings = {
                callback: function () {
                    var oldCb = apiConfig.optionalSettings.callback;
                    $rootScope.$apply(function () {
                        apiReady.resolve();
                    });

                    if (angular.isFunction(oldCb)) {
                        oldCb.call(this);
                    }
                }
            };
            settings = angular.extend({}, apiConfig.optionalSettings, settings);
            window.google.load('visualization', apiConfig.version, settings);
        };
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.src = googleJsapiUrl;
        if (script.addEventListener) { // Standard browsers (including IE9+)
            script.addEventListener('load', onLoad, false);
        } else { // IE8 and below
            script.onreadystatechange = function () {
                if (script.readyState === 'loaded' || script.readyState === 'complete') {
                    script.onreadystatechange = null;
                    onLoad();
                }
            };
        }
        head.appendChild(script);
        return apiReady.promise;
    }])
	.directive('ngGoogleChart', ['$timeout', '$window', '$rootScope', 'googleChartApiPromise', function ($timeout, $window, $rootScope, googleChartApiPromise) {
		return {
			restrict: 'A',
			scope: {
				chart: '=chart',
				imgURI :'=imguri',
				csv:'=csv'
			},
			link: function ($scope, $element, iAttrs) {

				$scope.$watch('chart', function () {
					if(angular.isDefined($scope.chart)){
						drawChart();
					}		
				});
				/**
				 * the function for getting chart information (eg.imageURI,csv)
				 */
				var addChartData = function (chart) {	
					var options = $scope.chart.options;
					var data = new google.visualization.DataTable($scope.chart.data);
					chart.draw(data, options);
				 	$scope.imgURI = chart.getImageURI();	 
				 	$scope.csv = google.visualization.dataTableToCsv(data);
				};
				/**
				 * redraw the chart when the window's witdth changes
				 * 
				 */
				$scope.$watch(
					function(){
			       		return $window.innerWidth;
			    	}, 
			    	function(value) {
				       if(angular.isDefined($scope.chart)){
							drawChart();
						}	
			   });
				/**
				 * Draw chart
				 */
				var drawChart = function () {	
					var chart;
					if(angular.isDefined($scope.chart.type)) {
						var type = $scope.chart.type;
						googleChartApiPromise.then(function () {
							switch(type) {
								case 'PieChart':
									chart = new google.visualization.PieChart( $element[0]);
									addChartData(chart);
									break;
								case 'LineChart':
									chart = new google.visualization.LineChart( $element[0]);
									addChartData(chart);
									break;
								default:
									var chartWrapper = {
										chartType: type,
										dataTable: $scope.chart.data,
										containerId :  $element[0],
										options: $scope.chart.options
									}
									chart = new google.visualization.ChartWrapper(chartWrapper);
									chart.draw();
									break;
							}
						});
					}
				};
			}
		};
	}]);
}).call(this);