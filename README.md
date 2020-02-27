# VueChart

A simple wrapper for Chart.

## demo

[Try it out!](https://seregpie.github.io/VueChart/)

## dependencies

- [Chart](https://github.com/chartjs/Chart.js)

## setup

### npm

```shell
npm i @seregpie/vue-chart
```

### ES module

Register the component globally.

```javascript
import Vue from 'vue';
import VueChart from '@seregpie/vue-chart';

Vue.component(VueChart.name, VueChart);
```

*or*

Register the component in the scope of another component.

```javascript
import VueChart from '@seregpie/vue-chart';

export default {
  components: {
    [VueChart.name]: VueChart,
  },
};
```

### browser

```html
<script src="https://unpkg.com/vue/dist/vue.min.js"></script>
<script src="https://unpkg.com/chart.js/dist/Chart.min.js"></script>
<script src="https://unpkg.com/@seregpie/vue-chart"></script>
```

The component is globally available as `VueChart`. If Vue is detected, the component will be registered automatically.

## usage

```html
<vue-chart
  style="width: 800px; height: 600px;"
  :data="chartData"
  :options="{scales: {yAxes: [{ticks: {beginAtZero: true}}]}}"
  :update-config="{duration: 2000, easing: 'easeOutBounce'}"
  type="bar"
/>
```

## properties

| property | type | description |
| ---: | :--- | :--- |
| `data` | `Object` | The data of the chart. |
| `options` | `Object` | The configuration options of the chart of the current type. |
| `type` | `String` | The type of the chart. Changing the value will recreate the chart. |
| `updateConfig` | `Object` | The additional configuration for the update process. |
