<template>
  <div ref="chart" style="height:100%;width:100%;">
    <canvas ref="canvas" style="position: absolute;top:0;left:0;height: 100%; width: 100%;"></canvas>
  </div>
</template>
<script>
/* DbSparkHeatmap. Shows heatmap for large number of series.
 * TODO Height / Width as props
 */
import * as d3 from 'd3';
import * as d3Color from 'd3-color';
//import dbColors from '../dbcolors';
//import { makeNoise2D } from 'open-simplex-noise';
import ridgedata from '../data/ridgedata.json';
import apireqdata from '../data/series_rate_api_req_count.json';
import jvmdata from '../data/series_test_jvm_memory_used_bytes.json';

export default {
  name: 'DbSparkLinemap',
  components: {},
  data() {
    return {
      canvasWidth: 100,
      canvasHeight: 100,
      noise2D: null //makeNoise2D(0)
    };
  },
  props: {
    _updated: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: null
    },
    max: {
      type: Number,
      default: null
    },
    // Array of arrays. Each array represents single time series.
    data: {
      type: Array,
      default: () => []
    },
    line: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: null
    },
    opacity: {
      type: Number,
      default: null
    },
    colorInterpolateScheme: {
      type: String,
      default: 'interpolateBlues'
    }
  },
  watch: {
    _updated(/*newVal*/) {
      this.$nextTick(function() {
        this.render();
      });
    },
    // TODO watch data for updates
    data() {
      this.$nextTick(function() {
        this.render();
      });
    },
    color() {
      this.$nextTick(function() {
        this.render();
      });
    },
    colorInterpolateScheme() {
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

    // TODO Consider re-creating canvas and context
    // TODO -> Utils
    initContext(width, height) {
      let canvas = this.$refs.canvas;
      let dpi = devicePixelRatio;
      canvas.width = width * dpi;
      canvas.height = height * dpi;
      //canvas.style.width = width + 'px';
      let context = canvas.getContext('2d');
      context.scale(dpi, dpi);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.save();
      context.setLineDash([]);
      context.strokeStyle = 'rgba(0, 0, 0, 0.1)';
      return context;
    },

    render() {
      let startTs = Date.now();

      this.initSize();

      let width = this.canvasWidth;
      let height = this.canvasHeight;
      let ctx = this.initContext(this.canvasWidth, this.canvasHeight);

      if (!this.data || !Array.isArray(this.data) || this.data.length <= 0) {
        return;
      }

      console.log(`Entering render Linemap: ${startTs}`);

      let data = this.data; // jvmdata; // this.data; // apireqdata; // // this.data; jvmdata;
      const numseries = data.length;
      const serieslength = data[0].length;
      const maxValue = this.max ? this.max : d3.max(data, d => d3.max(d, i => i));

      // This should depend on number of series, and height. 1/4 th ?
      let seriesHeight = numseries > 1 ? Math.floor(height / 4) : height;

      // Scale
      let lx = d3
        .scaleLinear()
        .domain([0, serieslength - 1])
        .range([0, width]);

      let ly = d3
        .scaleLinear()
        .domain([0, maxValue])
        .range([seriesHeight, 0]);

      // Depending on number of series
      let opacityScale = d3
        .scaleLinear()
        .domain([0, numseries - 1])
        .range(numseries > 1 ? [0.9, 0.001] : [0.3, 0.3]);

      let line = d3
        .line()
        .x(d => lx(d.x))
        .y(d => ly(d.y))
        .curve(d3.curveBasis)
        .context(ctx);

      let area = d3
        .area()
        .x(d => lx(d.x))
        .y1(d => ly(d.y))
        .y0(0) // ???
        .curve(d3.curveBasis)
        .context(ctx);

      let pad = 0;
      // do the mapping !
      let padInc = Math.floor((height - seriesHeight) / numseries);

      let padScale = d3
        .scaleLinear()
        .domain([0, numseries - 1])
        .range([0, height - seriesHeight]);

      let colorInterpolator = d3[this.colorInterpolateScheme] || d3.interpolateBlues;
      let colorScale = d3.scaleSequential(colorInterpolator).domain([0, numseries + 20]);
      let cidx = 10; //Math.floor(numseries / 2);

      for (let sidx = 0; sidx < numseries; sidx++) {
        let pointsData = data[sidx].map((d, i) => {
          return { x: i, y: isNaN(d) ? 0 : d };
        });

        pad = padScale(sidx);
        ly.range([seriesHeight + pad, pad]);
        area.y0(seriesHeight + pad);

        if (this.line) {
          ctx.beginPath();
          line(pointsData);
          ctx.stroke();
        }

        ctx.beginPath();
        area(pointsData);

        let currentColor = this.color ? this.color : colorScale(cidx++);
        let currentOpacity = this.opacity ? this.opacity : opacityScale(sidx);
        ctx.fillStyle = this.hex2RGBA(currentColor, currentOpacity);

        //let currentColor = colorScale(cidx++);
        //let currentColor = '#ffffff';//colorScale(cidx);
        //let currentColor = '#9fa8da';
        //let currentColor = '#90a4ae'; // Good for Light !
        //let currentColor = '#455a64'; //  Looks good for Dark !
        //console.log(`sidx" ${sidx} => opacity: ${opacityScale(sidx)}`);
        //ctx.fillStyle = this.hex2RGBA(currentColor, opacityScale(sidx)); // Light; // 'rgba(0,0,0,0.05)';
        //ctx.fillStyle = this.hex2RGBA(currentColor, 0.3); // Light; // 'rgba(0,0,0,0.05)';

        ctx.fill();

        pad += padInc;
      }

      let endTs = Date.now();
      console.log(`Finished render Linemap: ${endTs} - ${endTs - startTs} msec`);
    },

    hex2RGBA(hex, opacity) {
      let c = d3Color.color(hex);
      c.opacity = opacity;
      return c + '';
    },

    //https://github.com/d3/d3-shape#curves
    //https://bl.ocks.org/d3indepth/64be9fc39a92ef074034e9a8fb29dcce
    renderOld() {
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
