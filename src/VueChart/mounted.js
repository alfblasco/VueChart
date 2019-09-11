export default function() {
	let chart;
	this.$watch(() => {
		chart = this.updateChart(chart);
	});
}
