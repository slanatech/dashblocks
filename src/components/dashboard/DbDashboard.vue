<template>
  <div :class="getDbClass()">
    <component v-bind:is="layoutComponent" :dbspec="dbspec" :dbdata="dbdata" :dark="dark" v-on:db-event="handleDbEvent"> </component>
  </div>
</template>

<script>
import DbLayouts from '../dblayouts';
import log from '../log';

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
  watch: {
    /*
    dbspec: function() {
      this.$nextTick(() => {
        window.dispatchEvent(new Event('resize'));
      });
    }*/
    dbspec: {
      handler() {
        log.info('Dashboard specification updated');
        // ???
        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'));
        });
      },
      deep: true
    }
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
      dbClass += this.themeClass ? this.themeClass : 'db-theme-default ';
      dbClass += this.dark ? ' db-dark' : '';
      return dbClass;
    },
    handleDbEvent(payload) {
      log.debug(`DbDashboard: db-event:${payload.type || 'NO-TYPE'}`);
      this.$emit('db-event', payload);
    }
  }
};
</script>

/* Notes ** That works: components: { 'WidgetOne': () => import('./WidgetOne.vue') }, */
