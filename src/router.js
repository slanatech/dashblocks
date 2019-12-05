import Vue from 'vue';
import Router from 'vue-router';
import DefaultLayout from './demo/layouts/Default.vue';
import Home from './views/Home.vue';
import About from './views/About.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: '/about',
          name: 'about',
          component: About
        }
      ]
    }
  ]
});
