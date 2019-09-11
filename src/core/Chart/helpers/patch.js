import Chart from 'chart.js';

import Set_difference from '../../Set/difference';
import Set_intersection from '../../Set/intersection';

let Chart_helpers_patch = function(target, source) {
	if (target === source) {
		return target;
	}
	if (Chart.helpers.isArray(source)) {
		if (Chart.helpers.isArray(target)) {
			let targetLength = target.length;
			let sourceLength = source.length;
			for (let i = 0, ii = Math.min(targetLength, sourceLength); i < ii; i++) {
				target[i] = Chart_helpers_patch(target[i], source[i]);
			}
			if (targetLength > sourceLength) {
				target.splice(sourceLength);
			} else
			if (targetLength < sourceLength) {
				target.push(...source.slice(targetLength));
			}
			return target;
		}
	} else
	if (Chart.helpers.isObject(source)) {
		if (Chart.helpers.isObject(target)) {
			let targetKeys = Object.keys(target).filter(key => !key.startsWith('_'));
			let sourceKeys = Object.keys(source).filter(key => !key.startsWith('_'));
			Set_intersection(targetKeys, sourceKeys).forEach(key => {
				target[key] = Chart_helpers_patch(target[key], source[key]);
			});
			Set_difference(targetKeys, sourceKeys).forEach(key => {
				delete target[key];
			});
			Set_difference(sourceKeys, targetKeys).forEach(key => {
				target[key] = source[key];
			});
			return target;
		}
	}
	return source;
};

export default Chart_helpers_patch;
