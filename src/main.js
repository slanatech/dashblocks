import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Import all
import { DashBlocks } from 'dashblocks';
import * as dashblocksComponents from 'dashblocks';

Vue.use(DashBlocks, {
  components: dashblocksComponents
});

// DashBlocks Showcase app css
import './css.js';
import './quasar';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
