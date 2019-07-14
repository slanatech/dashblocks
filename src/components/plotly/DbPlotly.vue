<template>
  <div ref="plotlychart" />
</template>
<script>
// TODO Consider: use more customized bundle ( specific modules ) instead of all-in-one
//import Plotly from 'plotly.js-dist';
import log from '../log';
let Plotly = null;
export default {
  name: 'DbPlotly',
  props: {
    _updated: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      default: () => []
    },
    layout: {
      type: Object
    }
  },
  data() {
    return {
      needUpdate: false,
      options: {
        responsive: true
      }
    };
  },
  mounted() {
    import('plotly.js-dist').then(module => {
      log.info('DbPlotly: imported');
      Plotly = module;
      this.$nextTick(() => {
        this.render();
      });
    });
  },
  watch: {
    _updated: function() {
      log.info('DbPlotly: _updated Changed');
      this.scheduleRefresh();
    },
    data: {
      handler: function() {
        log.info('DbPlotly: Data Changed');
        this.scheduleRefresh();
      },
      deep: true
    }
  },
  methods: {
    render() {
      Plotly.plot(this.$refs.plotlychart, this.data, this.layout, this.options);
    },
    scheduleRefresh() {
      this.needUpdate = true;
      this.$nextTick(() => {
        this.refresh();
      });
    },
    refresh() {
      // Prevent multiple re-draws per single data update ( because there are redundant watches )
      if (!this.needUpdate) {
        return;
      }
      this.needUpdate = false;
      log.info('DbPlotly: reacting ...');
      // TODO Does not work if value in array changed !
      // react ?
      Plotly.react(this.$refs.plotlychart, this.data, Object.assign({ datarevision: Date.now() }, this.layout));
    }
  }
};
</script>
<style></style>
