import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Import all
import { DashBlocks, dbColors } from 'dashblocks';
import * as dashblocksComponents from 'dashblocks';

Vue.use(DashBlocks, {
  components: dashblocksComponents
});

// DashBlocks Showcase app css
import './css.js';
import './quasar';

Vue.config.productionTip = false;

// Set up Color Schemes for Dashblocks
function setupColorSchemes() {
  dbColors.setColorScheme('barChartDiverging', {
    light: dbColors.d3ScaleChromatic.schemeSpectral[4],
    dark: dbColors.d3ScaleChromatic.schemeRdYlBu[6]
  });
}

setupColorSchemes();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
