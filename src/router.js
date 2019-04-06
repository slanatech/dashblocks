import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import DashThree from './views/DashThree.vue';
import DashFour from './views/DashFour.vue';
import DashFive from './views/DashFive.vue';
import DashSix from './views/DashSix.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/dashthree',
      name: 'dashthree',
      component: DashThree
    },
    {
      path: '/dashfour',
      name: 'dashfour',
      component: DashFour
    },
    {
      path: '/dashfive',
      name: 'dashfive',
      component: DashFive
    },
    {
      path: '/dashsix',
      name: 'dashsix',
      component: DashSix
    }
  ]
});
