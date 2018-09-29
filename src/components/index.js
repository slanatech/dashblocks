import HelloDash from "./HelloDash.vue";
import DbDygraphs from "./dygraphs/DbDygraphs.vue";

const dbComponents = {
  HelloDash,
  DbDygraphs
};

/* TODO Consider this, make reasonable bundles of components based on underlying library

Vue.component('async-webpack-example', function (resolve) {
  // This special require syntax will instruct Webpack to
  // automatically split your built code into bundles which
  // are loaded over Ajax requests.
  require(['./my-async-component'], resolve)
})

 */

const DashBlocks = {
  install(Vue) {
    Object.keys(dbComponents).forEach(name => {
      Vue.component(name, dbComponents[name]);
    });
  }
};

export default DashBlocks;

/*
Object.keys(DashBlocks).forEach(name => {
  console.log('Registergin component: ' + name);
  Vue.component(name, DashBlocks[name]);
});

export default DashBlocks;
*/
