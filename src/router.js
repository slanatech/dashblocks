import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import DashThree from './views/DashThree.vue';
import DashFour from './views/DashFour.vue';
import DashFive from './views/DashFive.vue';
import DashSix from './views/DashSix.vue';
import DygraphsDynamic from './views/DygraphsDynamic';
import ChartJsShowcase from './views/ChartJsShowcase';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'Dashboard Two',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
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
    }
  ]
});
