import Vue from 'vue';
import Router from 'vue-router';
import DefaultLayout from './demo/layouts/Default.vue';
import DashThree from './demo/views/DashThree.vue';
import DashFour from './demo/views/DashFour.vue';
import DashFive from './demo/views/DashFive.vue';
import DashSix from './demo/views/DashSix.vue';
import DygraphsDynamic from './demo/views/DygraphsDynamic';
import ChartJsShowcase from './demo/views/ChartJsShowcase';
import DashblocksShowcase from './demo/views/DashblocksShowcase';
import SampleDashboard from './demo/views/SampleDashboard';
import DbHorizonSamples from './demo/views/samples/DbHorizonSamples';
import DbDygraphsBarSamples from './demo/views/samples/DbDygraphsBarSamples';
import DashRidgeline from './demo/views/DashRidgeline.vue';
import Playground from './demo/views/Playground';
import Perspective from './demo/views/Perspective';
import SparkLineMap from './demo/views/SparkLineMap';
import SparkHeatMap from './demo/views/SparkHeatMap';
import DynamicPerspective from './demo/views/DynamicPerspective';
import DynamicTimelines from './demo/views/DynamicTimelines';
import DynamicTimelinesDygraphs from './demo/views/DynamicTimelinesDygraphs';
import DynamicSalesDashboard from './demo/views/DynamicSalesDashboard';
import SalesFunnelDashboard from './demo/views/SalesFunnelDashboard';
import SalesSunburstDashboard from './demo/views/SalesSunburstDashboard';
import GeoMapBoxUS from './demo/views/GeoMapboxUS';
//import SparkLineMapDyn from './demo/views/SparkLineMapDyn';

Vue.use(Router);

export default new Router({
  //base: '/',
  //mode: 'history',
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '/',
          name: 'Dashblocks Showcase',
          component: DashblocksShowcase,
          icon: 'trending_up'
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
          path: '/dbdygraphsbarsamples',
          name: 'DbDygraphsBar Samples',
          component: DbDygraphsBarSamples
        },
        {
          path: '/dashridgeline',
          name: 'Ridgeline',
          component: DashRidgeline
        },
        {
          path: '/playground',
          name: 'Playground',
          component: Playground
        },
        {
          path: '/perspective',
          name: 'Perspective',
          component: Perspective
        },
        {
          path: '/sparklinemap',
          name: 'Sparklinemap',
          component: SparkLineMap
        },
        {
          path: '/sparkheatmap',
          name: 'Sparkheatmap',
          component: SparkHeatMap
        },
        {
          path: '/dynp',
          name: 'dynp',
          component: DynamicPerspective
        },
        {
          path: '/dynamictimelines',
          name: 'dynamictimelines',
          component: DynamicTimelines
        },
        {
          path: '/dynamictimelinesdygraphs',
          name: 'dynamictimelinesdygraphs',
          component: DynamicTimelinesDygraphs
        },
        {
          path: '/dynamicsalesdashboard',
          name: 'dynamicsalesdashboard',
          component: DynamicSalesDashboard
        },
        {
          path: '/salesfunnel',
          name: 'salesfunnel',
          component: SalesFunnelDashboard
        },
        {
          path: '/salessunburst',
          name: 'salessunburst',
          component: SalesSunburstDashboard
        },
        {
          path: '/geomapboxus',
          name: 'geomapboxus',
          component: GeoMapBoxUS
        }
        /*
        {
          path: '/sparklinemapdyn',
          name: 'Sparklinemapdyn',
          component: SparkLineMapDyn
        }*/
      ]
    }
  ]
});
