/* DbTrendLine: Trend Line using https://github.com/QingWei-Li/vue-trend */
<template>
  <div class="dbc-trend-line" ref="chart">
    <trend
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
    updated: {
      type: String,
      default: ''
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
  /*
  watch: {
    updated(newVal) {
      //console.log('updated prop changed: ', newVal);
    }
  },
  */
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.initSize();
    //console.log('_updated in mounted: ', this.updated);
  },
  methods: {
    initSize() {
      this.lineHeight = this.height ? this.height : this.$refs.chart.clientHeight;
      this.lineWidth = this.width ? this.width : this.$refs.chart.clientWidth - 5;
    },
    handleResize(/*event*/) {
      this.$nextTick(() => {
        this.lineWidth = this.width ? this.width : this.$refs.chart.clientWidth;
        this.lineHeight = this.height ? this.height : this.$refs.chart.clientHeight - 5;
      });
    }
  }
};
</script>
