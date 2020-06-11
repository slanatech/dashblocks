<template>
  <div ref="chart" :style="`height:${height}px;`">
    <canvas ref="canvas" style="position: absolute;"></canvas>
  </div>
</template>
<script>
/* DbSparkHeatmap. Shows heatmap for large number of series.
 * TODO Height / Width as props
 */
import * as d3 from 'd3';
//import dbColors from '../dbcolors';
//import { makeNoise2D } from 'open-simplex-noise';
import ridgedata from '../data/ridgedata.json';
import apireqdata from '../data/series_rate_api_req_count.json';
import jvmdata from '../data/series_test_jvm_memory_used_bytes.json';

export default {
  name: 'DbSparkHeatmap',
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
      default: 400
    },
    max: {
      type: Number,
      default: null
    },
    // Array of arrays. Each array represents single time series.
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
    },
    // TODO watch data for updates
    data() {
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
      canvas.style.width = width + 'px';
      let context = canvas.getContext('2d');
      context.scale(dpi, dpi);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.setLineDash([]);
      context.strokeStyle = 'rgba(0, 0, 0, 0.5)';
      return context;
    },

    render() {
      if (!this.data) {
        return;
      }

      let startTs = Date.now();
      console.log(`Entering render heatmap: ${startTs}`);

      this.initSize();

      let width = this.canvasWidth;
      let height = this.canvasHeight;
      //let ctx = this.initContext(this.canvasWidth, this.canvasHeight);

      let data = this.data; // jvmdata; // this.data; // apireqdata; // // this.data;
      const numseries = data.length;
      const serieslength = data[0].length;
      const maxValue = d3.max(data, d => d3.max(d, i => i));

      let scaleValue = d3
        .scaleLinear()
        .range([0, 1])
        .domain([0, maxValue]);

      let color = d3
        .scaleLinear()
        .range(['#ffffff', '#ff0000'])
        .domain([0, maxValue]);

      let color1 = d3.scaleSequential(d3.interpolateReds).domain([0, maxValue]);

      // We draw on canvas with dimensions eactly as data dimensions
      // Then canvas is scaled by CSS: canvas.style.width & canvas.style.height
      let canvas = this.$refs.canvas;
      let W = serieslength;
      let H = numseries;
      canvas.width = W; // ?
      canvas.height = H;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      let ctx = canvas.getContext('2d');

      let image = ctx.createImageData(W, H);

      for (let cy = 0, p = -1; cy < H; ++cy) {
        for (let cx = 0; cx < W; ++cx) {
          let value = data[cy][cx];
          //let c = d3.rgb(color(value));
          let c = d3.rgb(d3.interpolateYlOrRd(scaleValue(value)));
          image.data[++p] = c.r;
          image.data[++p] = c.g;
          image.data[++p] = c.b;
          image.data[++p] = 155;
        }
      }

      ctx.putImageData(image, 0, 0);

      let endTs = Date.now();
      console.log(`Finished render heatmap: ${endTs} - ${endTs - startTs} msec`);
    },

    renderYY() {
      if (!this.data) {
        return;
      }

      let startTs = Date.now();
      console.log(`Entering render heatmap: ${startTs}`);

      this.initSize();

      let width = this.canvasWidth;
      let height = this.canvasHeight;
      let ctx = this.initContext(this.canvasWidth, this.canvasHeight);

      let data = jvmdata; // this.data; // apireqdata; // // this.data;
      const numseries = data.length;
      const serieslength = data[0].length;
      const maxValue = d3.max(data, d => d3.max(d, i => i));
      let margin = { top: 50, right: 10, bottom: 10, left: 10 };

      //let image = context.createImageData(dx, dy);

      let x = d3
        .scaleQuantize()
        .domain([0, width])
        .range(d3.range(serieslength));

      let y = d3
        .scaleQuantize()
        .domain([0, height])
        .range(d3.range(numseries));

      let color = d3
        .scaleLinear()
        .range(['#ffffff', '#0000ff'])
        .domain([0, maxValue]);

      /*
      for (let xx = 0; xx < width; xx++) {
        let xxR = x(xx);
        console.log(`xx=${xx} => xxR=${xxR}`);
      }

      for (let yy = 0; yy < height; yy++) {
        let yyR = y(yy);
        console.log(`yy=${yy} => yyR=${yyR}`);
      }
      */

      let image = ctx.createImageData(width, height);

      for (let cy = 0, p = -1; cy < height; ++cy) {
        for (let cx = 0; cx < width; ++cx) {
          let value = 0; // data[y(cy)][x(cx)];
          let c = d3.rgb(color(value));
          image.data[++p] = c.r;
          image.data[++p] = c.g;
          image.data[++p] = c.b;
          image.data[++p] = 160;
        }
      }

      ctx.putImageData(image, 0, 0);

      let endTs = Date.now();
      console.log(`Finished render heatmap: ${endTs} - ${endTs - startTs} msec`);
    },

    renderXX() {
      if (!this.data) {
        return;
      }

      let startTs = Date.now();
      console.log(`Entering render heatmap: ${startTs}`);

      this.initSize();

      let width = this.canvasWidth;
      let height = this.canvasHeight;
      let ctx = this.initContext(this.canvasWidth, this.canvasHeight);

      let data = jvmdata; // this.data; // apireqdata; // // this.data;
      const numseries = data.length;
      const serieslength = data[0].length;
      const maxValue = d3.max(data, d => d3.max(d, i => i));

      // const numDays = 156; // serieslength
      const margin = 25;
      const marginTop = 12;
      const cellHeight = (height - marginTop) / numseries; //16;
      const cellWidth = (width - 2 * margin) / serieslength;

      ctx.globalAlpha = 0.6;

      //const height = cellHeight * Object.keys(winters).length + marginTop;
      let y = marginTop;
      //for (const year in winters) {
      for (let sidx = 0; sidx < data.length; sidx++) {
        const serieData = data[sidx];
        //const days = winters[year];
        //const leap = isLeap(+year + 1);

        for (let i = 0; i < serieData.length; i++) {
          const val = serieData[i] || 0;
          ctx.fillStyle = val === undefined ? 'grey' : d3.interpolateOrRd(val / maxValue);
          ctx.fillRect(margin + Math.floor(i * cellWidth), y, cellWidth + 1, cellHeight);
        }
        y += cellHeight;
      }
      let endTs = Date.now();
      console.log(`Finished render heatmap: ${endTs} - ${endTs - startTs} msec`);
    },

    renderX() {
      let startTs = Date.now();
      console.log(`Entering SVG render: ${startTs}`);

      //if (!this.data) {
      //  return;
      //}

      this.initSize();
      let width = this.canvasWidth;
      let height = this.canvasHeight;
      let w = width; // ??

      // Clear whole content of container
      while (this.$refs.chart.lastChild) {
        this.$refs.chart.removeChild(this.$refs.chart.lastChild);
      }

      let data = this.data;

      //  TODO top margin should take into account number of series & height
      let margin = { top: 50, right: 10, bottom: 10, left: 10 };

      let overlap = 10;
      let lineColor = 'rgba(255,255,255,0.2)'; // '#ffffff'; //
      let areaColor = 'black';
      let opacity = 0.5;
      let showline = true;
      let seabed = 0;
      let transitionDuration = 0;

      let x = d3
        .scaleLinear()
        .domain([0, data[0].length])
        .range([margin.left, w - margin.right]);

      let y = d3
        .scalePoint()
        .domain(d3.range(data.length))
        .range([margin.top, height - margin.bottom]);

      let z = d3
        .scaleLinear()
        .domain([0, d3.max(data, d => d3.max(d, i => i))])
        .nice()
        .range([0, -overlap * y.step()]);

      let area = d3
        .area()
        .curve(d3.curveBasis)
        .x((d, i) => x(i))
        .y0(-seabed)
        .y1(d => z(d));

      let line = area.lineY1();

      /*
      const svg = d3
        .select(this.$refs.chart.appendChild(DOMsvg(width, height)))
        .style('position', 'relative')
        .style('font', '10px sans-serif');
      */

      let g = d3
        .select(this.$refs.chart.appendChild(DOMsvg(width, height)))
        .selectAll('g')
        .data([{}]);

      g = g
        .enter()
        .append('g')
        .merge(g);

      const serie = g.selectAll('g').data(data, (d, i) => i);

      const serieE = serie.enter().append('g');

      serie.exit().remove();

      serie
        .merge(serieE)
        .transition()
        .duration(0)
        .attr('transform', (d, i) => {
          return `translate(0,${y(i)})`;
        });

      let p = serieE
        .append('path')
        .attr('class', 'p1')
        .attr('opacity', opacity)
        .attr('fill', areaColor);

      serie
        .merge(serieE)
        .select('.p1')
        .transition()
        .duration(data[0].length * transitionDuration)
        .delay((d, i) => i * transitionDuration)
        .attr('opacity', opacity)
        .attr('fill', areaColor)
        .attr('d', (d, i) => area(d));

      let p2 = serieE
        .append('path')
        .attr('class', 'p2')
        .attr('fill', 'none')
        .attr('opacity', showline ? 1 : 0)
        .attr('stroke', lineColor);

      serie
        .merge(serieE)
        .select('.p2')
        .transition()
        .duration(data[0].length * transitionDuration)
        .delay((d, i) => i * transitionDuration)
        .attr('opacity', showline ? 1 : 0)
        .attr('stroke', lineColor)
        .attr('d', d => line(d));

      function DOMsvg(width, height) {
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', [0, 0, width, height]);
        svg.setAttribute('width', width);
        svg.setAttribute('height', height);
        return svg;
      }

      let endTs = Date.now();
      console.log(`Finished SVG render: ${endTs} - ${endTs - startTs} msec`);
    },

    // TODO Switch to canvas
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
