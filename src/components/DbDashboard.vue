<template>
  <div class="db-dashboard"><component v-bind:is="layoutComponent" :dbspec="dbspec" :dbdata="dbdata"> </component></div>
</template>

<script>
import DbLayouts from './dblayouts';
import log from './log';

export default {
  name: 'DbDashboard',
  components: DbLayouts.components,
  props: {
    dbspec: Object,
    dbdata: Object,
    loglevel: {
      type: String,
      default: 'debug'
    }
  },
  data() {
    return {
      layoutComponent: null
    };
  },
  created() {
    log.info('Dashboard created');

    // Set log level based on props
    log.setLevel(this.loglevel);

    // Trigger component drawing
    this.layoutComponent = DbLayouts.resolve(this.dbspec.layout.type);
  },
  methods: {
    // TODO
  }
};
</script>
<style>
.db-dash-item {
  border: 1px solid magenta;
}
</style>

/* Notes ** That works: components: { 'WidgetOne': () => import('./WidgetOne.vue') }, */
