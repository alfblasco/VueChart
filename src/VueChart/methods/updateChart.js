import Chart from 'chart.js';

import Chart_helpers_patch from '../../core/Chart/helpers/patch';

export default function(chart) {
	let {
		$refs,
		data,
		options,
		type,
		updateConfig,
	} = this;
	let {canvas} = $refs;
	data = Chart.helpers.clone(data);
	options = Chart.helpers.clone(options);
	if (chart) {
		if (chart.config.type === type) {
			Chart_helpers_patch(chart.data, data);
			Chart_helpers_patch(chart.options, options);
			chart.update(updateConfig);
			return chart;
		}
		chart.destroy();
	}
	return new Chart(canvas, {type, data, options});
}
