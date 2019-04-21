<template>
  <div :class="getDbClass()">
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
    dark: {
      type: Boolean,
      default: false
    },
    themeClass: {
      type: String,
      default: ''
    },
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
    // TBD
  },
  created() {
    log.info('Dashboard created');
    // Set log level based on props
    log.setLevel(this.loglevel);
    // Trigger component drawing
    this.layoutComponent = DbLayouts.resolve(this.dbspec.layout.type);
  },
  methods: {
    getDbClass() {
      let dbClass = 'db-dashboard ';
      if (this.themeClass !== '') {
        dbClass += this.themeClass;
      } else {
        // use default themes
        dbClass += this.dark ? 'db-theme-dark' : 'db-theme-default';
      }
      return dbClass;
    },
    handleDbEvent(payload) {
      log.debug(`DbDashboard:db-event: ${JSON.stringify(payload)}`);
      this.$emit('db-event', payload);
    }
  }
};
</script>

/* Notes ** That works: components: { 'WidgetOne': () => import('./WidgetOne.vue') }, */
