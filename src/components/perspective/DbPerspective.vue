/* DbPerspective * Perspective viewer: https://perspective.finos.org/ */
<template>
  <perspective-viewer ref="pv" class="perspective-viewer-material-dark" :columns="['Sales', 'Profit']" />
</template>
<script>
import '@finos/perspective-viewer';
import '@finos/perspective-viewer-datagrid';
import '@finos/perspective-viewer-d3fc';
import '@finos/perspective-viewer/themes/all-themes.css';

export default {
  name: 'DbPerspective',
  components: {},
  data() {
    return {
      lineWidth: 100,
      lineHeight: 100,
      testData: {
        Sales: [500, 1000, 1500],
        Profit: [100.25, 200.5, 300.75]
      }
    };
  },
  props: {
    _updated: {
      type: Number,
      default: 0
    },
    data: {
      type: Object,
      default: null
    }
  },
  watch: {
    _updated(/*newVal*/) {
      // TODO Verify - updates do not work
      //console.log('TrendBar: updated prop changed: ', newVal);
      this.$nextTick(function() {
        //console.log('Data: ', this.data);
        //this.$refs.trend.$forceUpdate();
      });
    }
  },
  mounted() {
    // TEMP
    let p = this.$refs.pv;
    p.load(this.data);
    let a = 1;
  },
  methods: {
    handleResize(/*event*/) {
      this.$nextTick(() => {
        // TODO Something wrong with this -10 ... Reconsider
        this.lineWidth = this.width ? this.width : this.$refs.chart.clientWidth;
        this.lineHeight = this.height ? this.height : this.$refs.chart.clientHeight - 10;
      });
    }
  }
};
</script>
