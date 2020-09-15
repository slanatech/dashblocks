<template>
  <div ref="chart" :style="`height:${height}px;`">
    <canvas ref="canvas" style="position: absolute;"> </canvas>
  </div>
</template>
<script>
/* DbTrendLine: Trend Line using https://github.com/QingWei-Li/vue-trend
 * TODO Height / Width as props
 */
import * as d3 from 'd3';
import dbColors from '../dbcolors';
export default {
  name: 'DbLinearProgress',
  components: {},
  data() {
    return {
      canvasWidth: 100,
      canvasHeight: 50
    };
  },
  props: {
    _updated: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 20
    },
    max: {
      type: Number,
      default: null
    }
  },
  watch: {
    _updated(/*newVal*/) {
      this.$nextTick(function() {
        this.render();
      });
    },
    value(/*newVal*/) {
      this.$nextTick(function() {
        this.render();
      });
    }
    // TODO watch data for updates
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
    initSize() {
      this.canvasHeight = this.height ? this.height : this.$refs.chart.clientHeight;
      this.canvasWidth = this.width ? this.width : this.$refs.chart.clientWidth;
    },
    handleResize(/*event*/) {
      this.$nextTick(() => {
        this.render();
      });
    },

    //https://github.com/d3/d3-shape#curves
    //https://bl.ocks.org/d3indepth/64be9fc39a92ef074034e9a8fb29dcce
    render() {
      let startTs = Date.now();
      console.log('Rendering LinearProgress ...');

      this.initSize();
      let canvas = this.$refs.canvas;
      canvas.width = this.canvasWidth;
      canvas.height = this.canvasHeight;
      let ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      //ctx.fillStyle = dbColors.hex2RGBA('#78909c', 0.2); // Light

      console.log(`Width: ${canvas.width}`);

      let rw = 6;
      let rh = canvas.height;
      let rp = 2;
      let rfw = rw + rp;

      let numrect = Math.floor(canvas.width / (rw + rp));
      console.log(`numrect: ${numrect}`);

      // Scale
      let lx = d3
        .scaleLinear()
        .domain([0, numrect])
        .range([0, 100]);

      let color = d3.scaleSequential(d3.interpolateRdYlGn).domain([0, numrect]);

      for (let i = 0; i < numrect; i++) {
        //console.log(`i=${i}, lx(i)=${lx(i)}`);
        if (lx(i) < this.value) {
          let c = color(numrect-i);
          ctx.fillStyle = dbColors.hex2RGBA(c, 0.7); // Light
        } else {
          ctx.fillStyle = dbColors.hex2RGBA('#78909c', 0.2); // Light
        }
        ctx.beginPath();
        ctx.rect(rfw * i, 0, rw, rh);
        ctx.fill();
      }

      let endTs = Date.now();
      console.log(`Finished render Linear Progress: ${endTs} - ${endTs - startTs} msec`);
    },

    //https://github.com/d3/d3-shape#curves
    //https://bl.ocks.org/d3indepth/64be9fc39a92ef074034e9a8fb29dcce
    renderSparkLine() {
      console.log('Rendering LinearProgress ...');

      this.initSize();
      let canvas = this.$refs.canvas;
      canvas.width = this.canvasWidth;
      canvas.height = this.canvasHeight;
      let ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // TODO Erase everything
      if (!this.data || this.data.length <= 0) {
        return;
      }

      // Scale
      let lx = d3
        .scaleLinear()
        .domain([0, this.data.length - 1])
        .range([0, canvas.width]);

      // TODO Support negative y
      let yMin = d3.min(this.data);
      let yMax = this.max || d3.max(this.data);
      if (yMax === 0 && yMin === 0) {
        // adjust if we have all 0s, so nothing is drawn
        yMax = 1;
        yMin = 0;
      } else if (yMin > 0) {
        // adjust to make sure we're based off 0 y
        yMin = 0;
      }
      let ly = d3
        .scaleLinear()
        .domain([yMin, yMax])
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
      //ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
      //ctx.fillStyle = dbColors.hex2RGBA('#607d8b',0.3); // Dark
      ctx.fillStyle = dbColors.hex2RGBA('#78909c', 0.2); // Light
      ctx.fill();
      //ctx.stroke();
    }
  }
};
</script>
