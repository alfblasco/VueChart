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
			var valuesCountValues = [6, 9, 12];
			var seriesCountValues = [1, 2, 3];
			return {
				chartType: chartTypeValues[1],
				chartTypeValues: chartTypeValues,
				drawer: true,
				seed: Date.now(),
				seriesCount: seriesCountValues[0],
				seriesCountValues: seriesCountValues,
				valuesCount: valuesCountValues[1],
				valuesCountValues: valuesCountValues,
			};
		},
		computed: {
			chartData: function() {
				var chartType = this.chartType;
				var seed = this.seed;
				var seriesCount = this.seriesCount;
				var valuesCount = this.valuesCount;
				var luck = new JustMyLuck(JustMyLuck.MersenneTwister(seed));
				var gradient = chroma.scale(['#cddc39', '#3f51b5']).mode('lch');
				var valueLabels = [
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
				var serieLabels = [
					'Tokyo',
					'Moscow',
					'London',
				];
				return {
					labels: valueLabels.slice(0, valuesCount),
					datasets: (serieLabels
						.map(function(label, i) {
							var data = valueLabels.map(function() {
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
									backgroundColor = (gradient
										.colors(serieLabels.length, null)[i]
										.alpha(0.2)
										.css()
									);
									borderColor = (gradient
										.colors(serieLabels.length, null)[i]
										.css()
									);
									break;
								}
								case 'bar': {
									if (seriesCount > 1) {
										backgroundColor = (gradient
											.colors(serieLabels.length, null)[i]
											.css()
										);
									} else {
										backgroundColor = (gradient
											.colors(valueLabels.length, null)
											.map(function(color) {
												return color.css();
											})
										);
									}
									borderWidth = 0;
									break;
								}
								default: {
									backgroundColor = (gradient
										.colors(valueLabels.length, null)
										.map(function(color) {
											return color.css();
										})
									);
								}
							}
							return {
								backgroundColor: backgroundColor,
								borderColor: borderColor,
								borderWidth: borderWidth,
								data: data.slice(0, valuesCount),
								label: label,
							};
						})
						.slice(0, seriesCount)
					),
				};
			},
		},
		methods: {
			randomizeValues: function() {
				this.seed = Date.now();
			},
		},
	});

})();
