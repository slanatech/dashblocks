<template>
  <db-plotly :_updated="_updated" :data="dataLine" :layout="layout"></db-plotly>
</template>
<script>
import DbPlotly from './DbPlotly';
import log from '../log';
export default {
  name: 'DbPlotlyLine',
  components: {
    DbPlotly
  },
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
      lineProps: {
        mode: 'lines+markers',
        type: 'scatter'
      },
      dataLineA: this.data
    };
  },
  computed: {
    // Augment traces with chart type specif attributes
    dataLine() {
      log.info('DbPlotlyLine: computing Data ... ');
      let dx = [];
      for (let d of this.$props.data) {
        dx.push(Object.assign({}, d, this.lineProps));
      }
      return dx;
    }
  }
};
</script>
<style></style>
