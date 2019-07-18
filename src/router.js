import Vue from 'vue';
import Router from 'vue-router';
import DashThree from './demo/views/DashThree.vue';
import DashFour from './demo/views/DashFour.vue';
import DashFive from './demo/views/DashFive.vue';
import DashSix from './demo/views/DashSix.vue';
import DygraphsDynamic from './demo/views/DygraphsDynamic';
import ChartJsShowcase from './demo/views/ChartJsShowcase';
import DashblocksShowcase from './demo/views/DashblocksShowcase';
import SampleDashboard from './demo/views/SampleDashboard';
import DbHorizonSamples from './demo/views/samples/DbHorizonSamples';
import Playground from './demo/views/Playground';

Vue.use(Router);

export default new Router({
  base: '/demo/', //process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Dashblocks Dashboard',
      component: DashblocksShowcase
    },
    {
      path: '/about',
      name: 'Dashboard Two',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './demo/views/About.vue')
    },
    {
      path: '/dashthree',
      name: 'Dashboard Three',
      component: DashThree
    },
    {
      path: '/dashfour',
      name: 'Dashboard Four',
      component: DashFour
    },
    {
      path: '/dashfive',
      name: 'Dashboard Five',
      component: DashFive
    },
    {
      path: '/dashsix',
      name: 'Dashboard Six',
      component: DashSix
    },
    {
      path: '/dygraphsdynamic',
      name: 'Dygraphs - Dynamic Updates',
      component: DygraphsDynamic
    },
    {
      path: '/chartjs',
      name: 'Chart.js Showcase',
      component: ChartJsShowcase
    },
    {
      path: '/sampledashboard',
      name: 'First Dashboard',
      component: SampleDashboard
    },
    {
      path: '/dbhorizonsamples',
      name: 'DbHorizon Samples',
      component: DbHorizonSamples
    },
    {
      path: '/playground',
      name: 'Playground',
      component: Playground
    }
  ]
});
