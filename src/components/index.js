import DbData from './dbdata';
import DbColors from './dbcolors';
import DbUtils from './dbutils';
import DbDashboard from './dashboard/DbDashboard';
import { dbStdProps } from './mixins/dbstdprops';
//import DbDygraphsBar from './dygraphs/DbDygraphsBar';
// ???
import * as dbComponents from './dbwidgets';
import '../assets/scss/dashblocks.scss';

const DashBlocks = {
  install(Vue) {
    Vue.component('DbDashboard', DbDashboard);

    Object.keys(dbComponents).forEach(key => {
      const c = dbComponents[key];
      Vue.component(key, c);
    });

    //Vue.component('DbDygraphsBar', DbDygraphsBar);
    /*
    Vue.component('db-dygraphs-bundle', function(resolve) {
      // This special require syntax will instruct Webpack to
      // automatically split your built code into bundles which
      // are loaded over Ajax requests.
      require(['./dygraphs/DbDygraphsBar'], resolve);
    });
    */
  }
};

export { DbData, DbColors, DbUtils, DbDashboard, DashBlocks, dbStdProps };

//export default DashBlocks;

/* TODO Consider this, make reasonable bundles of components based on underlying library

Vue.component('async-webpack-example', function (resolve) {
  // This special require syntax will instruct Webpack to
  // automatically split your built code into bundles which
  // are loaded over Ajax requests.
  require(['./my-async-component'], resolve)
})

 */

/*
const DashBlocks = {
  install(Vue) {
    Object.keys(dbComponents).forEach(name => {
      Vue.component(name, dbComponents[name]);
    });
  }
};
*/

/*
Object.keys(DashBlocks).forEach(name => {
  console.log('Registergin component: ' + name);
  Vue.component(name, DashBlocks[name]);
});

export default DashBlocks;
*/
