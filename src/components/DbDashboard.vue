<template>
  <div class="db-dashboard db-theme-default">
    <component v-bind:is="layoutComponent" :dbspec="dbspec" :dbdata="dbdata" v-on:db-event="handleDbEvent"> </component>
  </div>
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
  computed: {
    foo() {
      return this.dbdata['w0']._updated;
    }
  },
  watch: {
    /*
    dbdata: {
      handler() {
        console.log('DbDashboard: prop dbdata changed');
      },
      deep: true
    },
    foo() {
      console.log('DbDashboard: dbdata.w0._updated changed');
    }
    */
  },
  created() {
    log.info('Dashboard created');

    // Set log level based on props
    log.setLevel(this.loglevel);

    // Trigger component drawing
    this.layoutComponent = DbLayouts.resolve(this.dbspec.layout.type);
  },
  methods: {
    handleDbEvent(payload) {
      log.debug(`DbDashboard:db-event: ${JSON.stringify(payload)}`);
      this.$emit('db-event', payload);
    }
  }
};
</script>
<style>
.db-dash-item {
  border: 1px solid magenta;
}
</style>

/* Notes ** That works: components: { 'WidgetOne': () => import('./WidgetOne.vue') }, */
