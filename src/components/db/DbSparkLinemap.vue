<template>
  <div class="db-sparklinemap" ref="chart" style="height:100%;width:100%;" @dblclick="handleDblClick">
    <div style="position: relative;" @mousedown="captureOn" @mouseup="captureOff" @mousemove="mo">
      <canvas ref="canvas" style="position: absolute;top:0;left:0;height: 100%; width: 100%;"></canvas>
    </div>
    <div ref="vslider" style="margin-left: 10px; height: 100%;"></div>
  </div>
</template>
<script>
/* DbSparkHeatmap. Shows heatmap for large number of series.
 * TODO Height / Width as props
 */
import * as d3 from 'd3';
import * as d3Color from 'd3-color';
import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

//import dbColors from '../dbcolors';

export default {
  name: 'DbSparkLinemap',
  components: {},
  data() {
    return {
      canvasWidth: 100,
      canvasHeight: 100,
      needUpdate: false,
      captureToggle: false,
      cutoff: 0,
      startY: 0,
      currY: 0,
      vSlider: null,
      resetData: true,
      tsStart: 0,
      tsEnd: -1
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
        this.resetData = true;
        this.render();
      });
    },
    // TODO watch data for updates
    data() {
      this.$nextTick(function() {
        this.resetData = true;
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
    let sref = this.$refs.vslider;
    this.vSlider = noUiSlider.create(sref, {
      start: [0, 100],
      connect: true,
      orientation: 'vertical',
      behaviour: 'drag',
      range: {
        min: 0,
        max: 100
      }
    });
    // Note: change or end will be fired twice when range is dragged
    let comp = this;
    this.vSlider.on('change', function(values) {
      comp.handleVSliderChange(values);
    });

    this.$nextTick(() => {
      this.render();
    });
  },
  beforeDestroy: function() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    initSize() {
      this.canvasHeight = this.height ? this.height : this.$refs.chart.clientHeight;
      this.canvasWidth = this.width ? this.width : this.$refs.chart.clientWidth;
    },
    handleResize(/*event*/) {
      this.$nextTick(() => {
        //this.render();
      });
    },
    handleVSliderChange(values) {
      console.log(`Got change: ${JSON.stringify(values)} - ${this.canvasWidth}`);
      this.tsStart = Math.floor(values[0]);
      this.tsEnd = Math.floor(values[1]);
      this.$nextTick(() => {
        this.render();
      });
    },
    async handleDblClick(){
      console.log(`Got dbl-click!`);
      this.tsStart = 0;
      this.tsEnd = 50;
      while(this.tsEnd < this.data.length){
        this.render();
        await this.delay(100);
        //this.tsStart += 1;
        this.tsEnd += 1;
      }
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
      this.needUpdate = true;
      this.$nextTick(() => {
        this.update();
      });
    },

    update() {
      // Prevent multiple re-draws per single data update ( because there are redundant watches )
      if (!this.needUpdate) {
        return;
      }
      this.needUpdate = false;

      let startTs = Date.now();

      this.initSize();

      let width = this.canvasWidth;
      let height = this.canvasHeight;
      let ctx = this.initContext(this.canvasWidth, this.canvasHeight);

      if (!this.data || !Array.isArray(this.data) || this.data.length <= 0) {
        return;
      }

      console.log(`Entering render Linemap: ${startTs} / ${height}`);

      let fullData = this.data;
      const fullNumSeries = fullData.length;
      let data = fullData; // jvmdata; // this.data; // apireqdata; // // this.data; jvmdata;
      let totalNumSeries = data.length;
      let numseries = totalNumSeries;

      if (this.resetData) {
        // Means we're drawing full dataset after data was set the first time or updated
        this.tsStart = 0;
        this.tsEnd = totalNumSeries - 1;
        this.vSlider.updateOptions({
          start: [0, totalNumSeries - 1],
          range: { min: 0, max: totalNumSeries - 1 }
        });
        this.resetData = false;
      } else {
        // ???
        numseries = this.tsEnd - this.tsStart ; // +1 ?
      }

      /*
      this.tsStart = 0;
      this.tsEnd = 30;
      numseries = this.tsEnd - this.tsStart;
      */

      /*
       */
      // TODO Reconsider
      //if (this.cutoff > 0) {
      //data = fullData.slice(fullNumSeries-this.cutoff);
      //numseries = numseries - this.cutoff;
      //}

      const serieslength = data[this.tsStart].length;

      let maxValue = this.max;
      if (!this.max) {
        let sm = [];
        for (let sidx = this.tsStart; sidx <= this.tsEnd; sidx++) {
          sm.push(d3.max(data[sidx], d => d));
        }
        maxValue = d3.max(sm, d => d);
        // TODO Consider prop / slider to manipulate max: it can be used to zoom in / out on Z
        //maxValue = maxValue/10;
      }

      //let testMax = d3.max(data, d => d3.max(d, i => i));

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
        .domain([this.tsStart, this.tsEnd])
        .range(numseries > 1 ? [0.9, 0.1] : [0.3, 0.3]);

        //.domain([0, numseries - 1])
        // TODO Fix Domain !!! .domain([0, numseries - 1])
        // TODO ?????  5 / numseries

        //.range(numseries > 1 ? [0.9, 0.6] : [0.3, 0.3]);
        //.range(numseries > 1 ? [0.9, 0.001] : [0.3, 0.3]);

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
        .domain([this.tsStart, this.tsEnd])
        .range([0, height - seriesHeight]);

        //.domain([0, numseries - 1])

      let colorInterpolator = d3[this.colorInterpolateScheme] || d3.interpolateBlues;

      //let colorScale = d3.scaleSequential(colorInterpolator).domain([0, numseries + 20]);
      //let cidx = 10; //Math.floor(numseries / 2);
      let colorScale = d3.scaleSequential(colorInterpolator).domain([0, numseries+2]);
      let cidx = 1; //Math.floor(numseries / 2);

      //for (let sidx = 0; sidx < numseries; sidx++) {
      for (let sidx = this.tsStart; sidx <= this.tsEnd; sidx++) {
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

    mo: function(evt) {
      if (this.captureToggle) {
        //this.x = evt.x
        this.currY = evt.y;
        if (this.startY === 0) {
          this.startY = this.currY;
        }
        //console.log(`Mouse move: ${this.currY}`);
      }
    },
    captureOn: function(evt) {
      this.captureToggle = true;
      this.startY = 0;
    },
    captureOff: function(evt) {
      this.captureToggle = false;
      console.log(`Capture off: ${this.currY} - ${this.startY} - ${this.canvasHeight}`);
      let numseries = this.data.length;
      let c1 = Math.abs(this.currY - this.startY);
      let c2 = Math.floor((c1 / this.canvasHeight) * numseries);
      console.log(`Capture off: ${c1} - ${c2}`);
      if (this.currY > this.startY) {
        this.cutoff += c2; // ???
      } else {
        this.cutoff -= c2;
        if (this.cutoff < 0) {
          this.cutoff = 0;
        }
      }
      this.render();
    }
  }
};
</script>
<style lang="scss">
.db-sparklinemap {
  display: grid;
  grid-template-columns: 1fr auto;
}
</style>
