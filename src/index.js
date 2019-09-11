import VueChart from './VueChart';

if (typeof window !== 'undefined' && window.Vue) {
	window.Vue.component(VueChart.name, VueChart);
}

export default VueChart;
