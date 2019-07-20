import DbHorizonSamples from '../../src/demo/views/samples/DbHorizonSamples';
import DbDygraphsBarSamples from '../../src/demo/views/samples/DbDygraphsBarSamples';
import SampleDashboard from '../../src/demo/views/SampleDashboard';

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  Vue.component('DbHorizonSamples', DbHorizonSamples);
  Vue.component('DbDygraphsBarSamples', DbDygraphsBarSamples);
  Vue.component('SampleDashboard', SampleDashboard);
};
