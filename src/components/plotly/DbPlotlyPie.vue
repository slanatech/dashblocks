<template>
  <db-plotly :_updated="_updated" :data="dataPie" :layout="layout"></db-plotly>
</template>
<script>
import DbPlotly from './DbPlotly';
export default {
  name: 'DbPlotlyPie',
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
      pieProps: {
        type: 'pie'
      }
    };
  },
  computed: {
    // Augment traces with chart type specif attributes
    dataPie() {
      //return this.$props.data.map(x => Object.assign({}, x, this.pieProps));
      let dx = [];
      for (let d of this.$props.data) {
        dx.push(Object.assign({}, d, this.pieProps));
        //d.type='pie';
      }
      return dx;
    }
  }
};
</script>
