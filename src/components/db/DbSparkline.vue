/* DbTrendLine: Trend Line using https://github.com/QingWei-Li/vue-trend */
<template>
  <div class="dbc-trend-bars" ref="chart" style="height:60px;">
    <canvas ref="canvas" width="200" height="100" style="position: absolute;"> </canvas>
  </div>
</template>
<script>
// import { curve } from '../utils/cardinal-spline-js/curve_func';
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
    //https://github.com/d3/d3-shape#curves
    //https://bl.ocks.org/d3indepth/64be9fc39a92ef074034e9a8fb29dcce
    render() {
      this.initSize();
      let canvas = this.$refs.canvas;
      canvas.width = this.lineWidth;
      canvas.height = this.lineHeight; // What is this ? Padding + border ?
      let ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // TODO Erase everything
      if (!this.data || this.data.length <= 0) {
        return;
      }

      // Scale
      let lx = d3
        .scaleLinear()
        .domain([0, this.data.length])
        .range([0, canvas.width]);

      let ly = d3
        .scaleLinear()
        .domain([0, d3.max(this.data)])
        .range([canvas.height, 0]);

      let pointsData = this.data.map((d, i) => {
        return { x: i, y: d };
      });

      let line = d3
        .line()
        .x(d => lx(d.x))
        .y(d => ly(d.y))
        .curve(d3.curveCardinal);
      line.context(ctx);

      let area = d3
        .area()
        .x(d => lx(d.x))
        .y1(d => ly(d.y))
        .y0(canvas.height)
        .curve(d3.curveCardinal);
      area.context(ctx);

      ctx.beginPath();
      //line(pointsData);
      area(pointsData);
      ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
      ctx.fill();
      //ctx.stroke();

      //let lineGenerator = d3.line().curve(d3.curveCardinal);
      //let pathData = lineGenerator(curveData);
      /*
      let ymax = canvas.height;
      let curveData = [];
      for (let i = 0; i < this.data.length; i++) {
        curveData.push(x(i));
        curveData.push(ymax - y(this.data[i]));
      }
      */
      // !!! See !!!
      //let curvePoints = [0,0]; //curve(ctx, curveData);
      //ctx.lineTo(curvePoints[curvePoints.length - 2], ymax); // bottom-right
      //ctx.lineTo(curvePoints[0], ymax); // bottom-left
      //ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
      //ctx.fill();
      //ctx.stroke();
    }
  }
};
</script>
