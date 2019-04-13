/* DbTrendLine: Trend Line using https://github.com/QingWei-Li/vue-trend */
<template>
  <div class="dbc-trend-bars" ref="chart">
    <bars
      ref="trend"
      :data="data"
      :auto-draw="autoDraw"
      :bar-width="barWidth"
      :grow-duration="growDuration"
      :gradient="gradient"
      :max="max"
      :min="min"
      :padding="padding"
      :width="lineWidth"
      :height="lineHeight"
    >
    </bars>
  </div>
</template>
<script>
import Bars from 'vuebars';
export default {
  name: 'DbTrendLine',
  components: {
    Bars
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
