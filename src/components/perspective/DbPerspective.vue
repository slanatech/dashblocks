/* DbPerspective * Perspective viewer: https://perspective.finos.org/ */
<template>
  <perspective-viewer ref="pv" class="perspective-viewer-vaporwave" :columns="['Sales', 'Profit']" />
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
      type: Array,
      default: () => []
    },
    autoDraw: Boolean,
    barWidth: {
      type: Number,
      default: 8
    },
    growDuration: {
      type: Number,
      default: 0.5
    },
    gradient: {
      type: Array,
      default: () => ['#6fa8dc', '#42b983']
    },
    max: {
      type: Number,
      default: -Infinity
    },
    min: {
      type: Number,
      default: Infinity
    },
    height: Number,
    width: Number,
    padding: {
      type: Number,
      default: 8
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
    window.addEventListener('resize', this.handleResize);
    this.initSize();
    // TEMP
    let p = this.$refs.pv;
    p.load(this.testData);
    let a = 1;
  },
  methods: {
    initSize() {
      this.$nextTick(() => {
        this.lineHeight = this.height ? this.height : this.$refs.chart.clientHeight;
        this.lineWidth = this.width ? this.width : this.$refs.chart.clientWidth - 10;
      });
    },
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
