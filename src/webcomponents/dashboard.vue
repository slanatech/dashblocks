<script>
import Vue from 'vue';

// For testing - Import and register all individual components
//import DbDashboard from '../components/dashboard/DbDashboard?shadow';
//import DbDygraphs from '../components/dygraphs/DbDygraphs';
//Vue.component('DbDygraphs', DbDygraphs);
//console.log(`Registered DbDygraphs`);

// For full build
import * as DbComponents from '../components.js';
for (let m of Object.keys(DbComponents)) {
  if (m !== 'DbDashboard') {
    Vue.component(m, DbComponents[m]);
    console.log(`Registered ${m}`);
  }
}

export default DbDashboard;
</script>

<style lang="scss">
@import '../assets/scss/dashblocks.scss';
</style>
