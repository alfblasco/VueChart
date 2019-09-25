(function() {

	new Vue({
		el: '#app',
		vuetify: new Vuetify(),
		data: function() {
			var chartTypeValues = [
				'line',
				'bar',
				'radar',
				'pie',
				'doughnut',
			];
			var numbersCountValues = [6, 9, 12];
			var setsCountValues = [1, 2, 3];
			return {
				appDrawer: true,
				chartType: chartTypeValues[1],
				chartTypeValues: chartTypeValues,
				numbersCount: numbersCountValues[1],
				numbersCountValues: numbersCountValues,
				seed: Date.now(),
				setsCount: setsCountValues[0],
				setsCountValues: setsCountValues,
			};
		},
		computed: {
			chartData: function() {
				var chartType = this.chartType;
				var numbersCount = this.numbersCount;
				var seed = this.seed;
				var setsCount = this.setsCount;
				var luck = new JustMyLuck(JustMyLuck.MersenneTwister(seed));
				var gradient = chroma.scale(['#cddc39', '#3f51b5']).mode('lch');
				var labels = [
					'January',
					'February',
					'March',
					'April',
					'May',
					'June',
					'July',
					'August',
					'September',
					'October',
					'November',
					'December',
				];
				var datasets = [
					'Tokyo',
					'Moscow',
					'London',
				].map(function(label, i) {
					var data = Array.from({length: 12}, function() {
						switch (chartType) {
							case 'line':
							case 'bar': {
								return luck.integer(-25, 25);
							}
						}
						return luck.integer(0, 25);
					});
					var backgroundColor;
					var borderColor;
					var borderWidth;
					switch (chartType) {
						case 'line':
						case 'radar': {
							backgroundColor = gradient.colors(3, null)[i].alpha(0.2).css();
							borderColor = gradient.colors(3, null)[i].css();
							break;
						}
						case 'bar': {
							if (setsCount > 1) {
								backgroundColor = gradient.colors(3, null)[i].css();
							} else {
								backgroundColor = gradient.colors(12, null).map(function(color) {
									return color.css();
								});
							}
							borderWidth = 0;
							break;
						}
						default: {
							backgroundColor = gradient.colors(12, null).map(function(color) {
								return color.css();
							});
						}
					}
					return {
						backgroundColor: backgroundColor,
						borderColor: borderColor,
						borderWidth: borderWidth,
						data: data.slice(0, numbersCount),
						label: label,
					};
				});
				return {
					labels: labels.slice(0, numbersCount),
					datasets: datasets.slice(0, setsCount),
				};
			},
		},
		methods: {
			randomizeNumbers: function() {
				this.seed = Date.now();
			},
		},
	});

})();
