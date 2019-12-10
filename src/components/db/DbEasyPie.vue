<template>
  <div class="db-easy-pie" ref="chart" :data-percent="percent">
    <div class="inner-text" :style="{ fontSize: fontSize, lineHeight: pieSize + 'px' }">
      <slot> {{ percent }}% </slot>
    </div>
  </div>
</template>
<script>
/* DbEasyPie: Easy-Pie-Chart based on https://github.com/rendro/easy-pie-chart */
import EasyPieChart from 'easy-pie-chart';
import { dbStdProps } from '../mixins/dbstdprops';
export default {
  name: 'DbEasyPie',
  data() {
    return {
      pieChart: undefined,
      pieSize: 150
    };
  },
  mixins: [dbStdProps],
  props: {
    value: {
      type: Number,
      default: 0
    },
    barColor: {
      type: String,
      default: '#ef1e25'
    },
    fontSize: {
      type: String,
      default: '20px'
    },
    trackColor: {
      type: String,
      default: null
    },
    scaleColor: { type: String, default: '#dfe0e0' },
    scaleLength: { type: Number, default: 5 },
    lineCap: { type: String, default: 'round' },
    lineWidth: { type: Number, default: 3 },
    size: { type: Number, default: 0 },
    rotate: { type: Number, default: 0 },
    duration: { type: Number, default: 1000 },
    animated: { type: Boolean, default: true },
    percentRanges: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    percent() {
      return this.value.toFixed(2);
    },
    hasRanges() {
      return Array.isArray(this.percentRanges) && this.percentRanges.length > 0;
    },
    epTrackColor() {
      if (this.trackColor) {
        return this.trackColor;
      }
      return this.dark ? '#37474f' : '#f2f2f2';
    }
  },
  watch: {
    percent(val) {
      this.update(val);
    },
    duration(val) {
      this.pieChart.options.animate.duration = val;
      this.update(this.percent);
    },
    animated(val) {
      this.pieChart.options.animate.enabled = val;
      this.update(this.percent);
    },
    dark() {
      this.$nextTick(() => {
        this.render();
      });
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.$nextTick(() => {
      this.render();
    });
  },
  beforeDestroy: function() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    update(val) {
      this.pieChart.update(val);
    },
    getOptions() {
      // ???
      return;
    },
    initSize() {
      if (this.size != 0) {
        this.pieSize = this.size;
      } else if (this.$refs.chart) {
        let cH = this.$refs.chart.clientHeight;
        let cW = this.$refs.chart.clientWidth;
        this.pieSize = cH > cW ? cW : cH;
      }
    },
    handleResize(/*event*/) {
      this.$nextTick(() => {
        this.render();
      });
    },
    getBarColor(percent) {
      if (!this.hasRanges) {
        return this.barColor;
      }
      for (let range of this.percentRanges) {
        if (range.value > percent) {
          return range.color;
        }
      }
    },
    render() {
      if (!this.$refs.chart) {
        return;
      }
      this.initSize();
      if (this.pieChart) {
        // Remove canvas element
        this.$refs.chart.removeChild(this.$refs.chart.lastChild);
      }
      this.pieChart = new EasyPieChart(this.$refs.chart, {
        barColor: this.getBarColor,
        trackColor: this.epTrackColor,
        scaleColor: this.scaleColor,
        scaleLength: this.scaleLength,
        lineCap: this.lineCap,
        lineWidth: this.lineWidth,
        size: this.pieSize,
        rotate: this.rotate,
        animate: {
          duration: this.duration,
          enabled: this.animated
        }
        /* TODO Reconsider ?
        onStart() {
          self.$emit('start');
        },
        onStop() {
          self.$emit('stop');
        },
        onStep() {
          self.$emit('step');
        }
        */
      });
    }
  }
};
</script>
