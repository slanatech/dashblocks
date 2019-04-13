/* DbTrendLine: Trend Line using https://github.com/QingWei-Li/vue-trend */
<template>
  <div class="dbc-trend-line" ref="chart">
    <trend
      ref="trend"
      :data="data"
      :auto-draw="autoDraw"
      :auto-draw-easing="autoDrawEasing"
      :auto-draw-duration="autoDrawDuration"
      :gradient="gradient"
      :max="max"
      :min="min"
      :padding="padding"
      :radius="radius"
      :smooth="smooth"
      :stroke-width="strokeWidth"
      :width="lineWidth"
      :height="lineHeight"
    >
    </trend>
  </div>
</template>
<script>
import Trend from 'vuetrend';
export default {
  name: 'DbTrendLine',
  components: {
    Trend
  },
  data() {
    return {
      lineWidth: 100,
      lineHeight: 100
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
    autoDrawDuration: {
      type: Number,
      default: 2000
    },
    autoDrawEasing: {
      type: String,
      default: 'ease'
    },
    gradient: {
      type: Array,
      default: () => ['#6fa8dc', '#42b983', '#2c3e50']
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
    },
    radius: {
      type: Number,
      default: 100
    },
    smooth: {
      type: Boolean,
      default: true
    },
    strokeWidth: {
      type: Number,
      default: 5
    }
  },
  watch: {
    _updated() {
      //console.log('TrendLine: updated prop changed: ', newVal);
      this.$nextTick(function() {
        //console.log('Data: ', this.data);
        this.$refs.trend.$forceUpdate();
      });
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.initSize();
    //console.log('_updated in mounted: ', this.updated);
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
