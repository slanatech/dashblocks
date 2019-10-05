/* DbTrendLine: Trend Line using https://github.com/QingWei-Li/vue-trend */
<template>
  <div class="dbc-trend-bars" ref="chart" style="height:60px;">
    <canvas ref="canvas" width="200" height="100" style="position: absolute;"> </canvas>
  </div>
</template>
<script>
import { curve } from '../utils/cardinal-spline-js/curve_func';
import * as d3 from 'd3';
export default {
  name: 'DbSparkline',
  components: {},
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
    }
  },
  watch: {
    _updated(/*newVal*/) {
      this.$nextTick(function() {
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
  methods: {
    initSize() {
      this.lineHeight = this.height ? this.height : this.$refs.chart.clientHeight;
      this.lineWidth = this.width ? this.width : this.$refs.chart.clientWidth;
    },
    handleResize(/*event*/) {
      this.$nextTick(() => {
        this.render();
      });
    },
    render() {
      this.initSize();
      let canvas = this.$refs.canvas;
      canvas.width = this.lineWidth;
      canvas.height = this.lineHeight; // What is this ? Padding + border ?
      let ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();

      // TODO Erase everything
      if (!this.data || this.data.length <= 0) {
        return;
      }

      // Scale
      let x = d3
        .scaleLinear()
        .domain([0, this.data.length])
        .range([0, canvas.width]);

      let y = d3
        .scaleLinear()
        .domain([0, d3.max(this.data)])
        .range([0, canvas.height]);

      let ymax = canvas.height;
      let curveData = [];
      for (let i = 0; i < this.data.length; i++) {
        curveData.push(x(i));
        curveData.push(ymax - y(this.data[i]));
      }

      // !!! See !!!
      //https://github.com/d3/d3-shape#curves
      //https://bl.ocks.org/d3indepth/64be9fc39a92ef074034e9a8fb29dcce

      let curvePoints = curve(ctx, curveData);

      ctx.lineTo(curvePoints[curvePoints.length - 2], ymax); // bottom-right
      ctx.lineTo(curvePoints[0], ymax); // bottom-left

      ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
      ctx.fill();
      //ctx.stroke();
    }
  }
};
</script>
