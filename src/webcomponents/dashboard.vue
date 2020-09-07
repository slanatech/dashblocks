<script>
import Vue from 'vue';
import DbDashboard from '../components/dashboard/DbDashboard?shadow';

// Import and register all individual components
import DbDygraphs from '../components/dygraphs/DbDygraphs?shadow';
Vue.component('DbDygraphs', DbDygraphs);

export default DbDashboard;
</script>

<style lang="scss">
@import '../assets/scss/dashblocks.scss';
</style>
