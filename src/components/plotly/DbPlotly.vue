<template>
  <div ref="plotlychart" />
</template>
<script>
import Plotly from 'plotly.js-dist';
import log from '../log';
export default {
  name: 'DbNumber',
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
  computed: {
    // Augment props with chart-specif attributes, i.e. enforce chart type
    // TODO Check if this is expensive ?
    dataEx() {
      log.info('DbPlotly: computing DataEx ... ');
      let dx = [];
      for (let d of this.data) {
        dx.push(Object.assign({}, d, { type: 'bar' }));
      }
      return dx;
    }
  },
  mounted() {
    this.render();
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
      Plotly.plot(this.$refs.plotlychart, this.dataEx, this.layout, this.options);
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
      Plotly.react(this.$refs.plotlychart, this.dataEx, this.layout);
    }
  }
};
</script>
<style></style>
