<script>
import Vue from 'vue';

import DbDashboard from '../components/dashboard/DbDashboard';

import { DbDygraphs, DbDygraphsBar, DbDygraphsLine, DbDygraphsSparkLine } from '../components/dygraphs/index.js';
Vue.component('DbDygraphs', DbDygraphs);
Vue.component('DbDygraphsBar', DbDygraphsBar);
Vue.component('DbDygraphsLine', DbDygraphsLine);
Vue.component('DbDygraphsSparkLine', DbDygraphsSparkLine);

import {
  DbChartjsBar,
  DbChartjsHorizontalBar,
  DbChartjsDoughnut,
  DbChartjsLine,
  DbChartjsPie,
  DbChartjsPolarArea,
  DbChartjsRadar,
  DbChartjsBubble,
  DbChartjsScatter,
  DbChartjsFunnel
} from '../components/chartjs/index.js';
Vue.component('DbChartjsBar', DbChartjsBar);
Vue.component('DbChartjsHorizontalBar', DbChartjsHorizontalBar);
Vue.component('DbChartjsDoughnut', DbChartjsDoughnut);
Vue.component('DbChartjsLine', DbChartjsLine);
Vue.component('DbChartjsPie', DbChartjsPie);
Vue.component('DbChartjsPolarArea', DbChartjsPolarArea);
Vue.component('DbChartjsRadar', DbChartjsRadar);
Vue.component('DbChartjsBubble', DbChartjsBubble);
Vue.component('DbChartjsScatter', DbChartjsScatter);
Vue.component('DbChartjsFunnel', DbChartjsFunnel);

export default DbDashboard;
</script>

<style lang="scss">
@import '../assets/scss/dashblocks.scss';
</style>
