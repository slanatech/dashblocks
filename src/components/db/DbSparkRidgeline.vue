<template>
  <div ref="chart" :style="`height:${height}px;`">
    <canvas ref="canvas" style="position: absolute;"></canvas>
  </div>
</template>
<script>
/* DbSparkRidgeLine. "Sparklines" for multiple time series, using ridgeline plot
 *  Based on https://observablehq.com/@fil/atmospheric-perspective?collection=@fil/3d
 * TODO Height / Width as props
 */
import * as d3 from 'd3';
//import dbColors from '../dbcolors';
//import { makeNoise2D } from 'open-simplex-noise';
import jvmdata from '../data/series_test_jvm_memory_used_bytes.json';

export default {
  name: 'DbSparkLineMap',
  components: {},
  data() {
    return {
      canvasWidth: 100,
      canvasHeight: 100,
      noise2D: null, //makeNoise2D(0),
      ctxInit: false
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

    DOMcontext2d(width, height, dpi) {
      if (dpi == null) dpi = devicePixelRatio;
      let canvas = document.createElement('canvas');
      canvas.width = width * dpi;
      canvas.height = height * dpi;
      canvas.style.width = width + 'px';
      let context = canvas.getContext('2d');
      context.scale(dpi, dpi);
      return context;
    },

    heightAt(x, y) {
      // courtesy of https://cmaher.github.io/posts/working-with-simplex-noise/
      let maxAmp = 0;
      let amp = 1;
      let altitude = 0.06;
      let octaves = 3;
      let noise = 0;

      for (let i = 0; i < octaves; ++i) {
        noise += this.noise2D(x * altitude, y * altitude) * amp;
        maxAmp += amp;
        amp *= 0.5;
        altitude *= 2;
      }
      noise /= maxAmp;
      return noise * 0.5 + 0.5;
    },

    render2() {
      this.initSize();
      let canvas = this.$refs.canvas;
      let width = this.canvasWidth;
      let height = this.canvasHeight;
      canvas.width = this.canvasWidth;
      canvas.height = this.canvasHeight;
      let ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      //let ctx = DOM.context2d(width, height);
      /*
              y
            x 0 1 2 3 4 5 …
              1
              2
              3
      */
      for (let x = 0; x < width; x += 3) {
        for (let y = 0; y < height; y += 3) {
          ctx.fillRect(x, y, 3, 3);
          ctx.fillStyle = `rgba(0, 0, 0, ${this.heightAt(x, y)}`;
          ctx.save();
        }
      }
      //return ctx.canvas;
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
      //if (!this.data) {
      //  return;
      //}
      let startTs = Date.now();
      console.log(`Entering render: ${startTs}`);
      this.initSize();
      let width = this.canvasWidth;
      let height = this.canvasHeight;
      /*
      let canvas = this.$refs.canvas;
      canvas.width = this.canvasWidth;
      canvas.height = this.canvasHeight;
      canvas.style.width = this.canvasWidth + 'px';
      let ctx = canvas.getContext('2d');
      //let dpi = 0.5;//window.devicePixelRatio;
      //ctx.scale(dpi, dpi); // ????
      */
      let ctx = null;
      if (!this.ctxInit) {
        ctx = this.initContext(this.canvasWidth, this.canvasHeight);
        this.ctxInit = true;
      } else {
        ctx = this.$refs.canvas.getContext('2d');
      }

      const curve = d3.curveNatural; //d3.curveLinear
      const xLimit = width * 0.5;
      const pad = 1;
      const heightAmplifier = 50; // This should be dynamic based on data

      const xDelta = 20;

      let data = this.data; //; jvmdata

      const numseries = data.length;
      const serieslength = data[0].length;

      const yDelta = Math.floor(height / (numseries + 4));
      console.log(`yDelta=${yDelta}`);

      const dataMax = d3.max(data, d => d3.max(d, i => i));
      console.log(`dataMax=${dataMax}`);

      const line = d3
        .line()
        .context(ctx)
        //.defined(d => d[0] > xLimit)
        .curve(curve);

      // Zone fills outside of path
      const zone = d3
        .area()
        .context(ctx)
        .y1(d => {
          //console.log(`Zone - y1`);
          return d[1] - 1;
        })
        .y0(height)
        .curve(curve);

      // Area fills inside of path
      const area = d3
        .area()
        .context(ctx)
        .curve(curve);

      let color = d3.scaleSequential(d3.interpolateBlues).domain([0, numseries + 20]);
      // This one better for dark mode
      //let color = d3.scaleSequential(d3.interpolateGreys).domain([0,numseries + 20]);

      const testData = [
        [0, 0, 1, 1, 2, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1, 0],
        [0, 0, 0, 0, 1, 1, 2, 3, 8, 4, 4, 3, 2, 1, 1, 0],
        [0, 3, 4, 5, 1, 1, 2, 2, 2, 6, 6, 5, 4, 2, 2, 2],
        [0, 3, 4, 5, 1, 1, 2, 2, 2, 6, 6, 5, 4, 2, 2, 2],
        [0, 3, 4, 5, 1, 1, 2, 2, 2, 6, 6, 5, 4, 2, 2, 2],
        [0, 3, 4, 5, 1, 1, 2, 2, 2, 6, 6, 5, 4, 2, 2, 2],
        [0, 3, 4, 5, 8, 1, 2, 2, 2, 6, 6, 5, 4, 2, 2, 2],
        [0, 3, 4, 5, 1, 1, 2, 2, 2, 6, 6, 5, 4, 2, 2, 2],
        [0, 3, 4, 5, 1, 1, 2, 2, 2, 6, 6, 5, 4, 2, 2, 2],
        [0, 3, 4, 5, 1, 1, 2, 2, 2, 6, 6, 5, 4, 2, 2, 2]
      ];

      ctx.save();
      let cidx = 10;
      let yidx = 0;

      /*
      for(let aaa=0; aaa<10; aaa++ ){
        let d = this.data[aaa][0];
        console.log(`aaa: ${aaa}: ${d}`);
      }

      for (let y = numseries * yDelta; y > 0; y -= yDelta) {
        console.log(`y: ${y}`);
        let xstep = Math.floor(width / serieslength)+1;
        const pp = d3.range(0, width, xstep).map((x, i) => {return [x,i]});
        console.log('points:' + pp);
      }
      */

      //ctx.strokeStyle = 'rgba(0, 0, 153, 0.4)';
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';

      for (let y = numseries * yDelta; y > 0; y -= yDelta) {
        // [sv2] Presumably, ctx.save() resets previously set .clip() (???).
        // With this, render is much faster in Chrome: ~80 ms vs ~700 ms on large data set
        // Note we don't do .restore() at the end of cycle. If ctx.restore() is done, rendering is slow again.
        ctx.save();

        let xstep = Math.floor(width / serieslength) + 1;
        const points = d3.range(0, width, xstep).map((x, i) => {
          // 6: max
          // max: height = 100
          let vv = data[yidx][i] || 0;
          if (isNaN(vv)) {
            vv = 0;
          }
          // 1.5 - max ?
          let vvv = 100 - (vv / dataMax) * 100;

          let currY = y + vvv; // * heightAmplifier;
          //let currY = y + (testData[yidx][i] / 8) * 100; // * heightAmplifier;
          return [x, currY];
        });

        yidx++;
        //console.log(`Drawing points: y=${y} => [${points[0]},${points[1]},${points[2]} ...]`);

        let currentColor = color(cidx++);
        // Zone fills area _outside_ of path and up to the bottom - i.e. to the max Y ( y=0: top, y=max: bottom )
        ctx.beginPath();
        ctx.fillStyle = currentColor;
        //area(points);
        zone(points);
        ctx.fill();

        ctx.beginPath();
        line(points);
        ctx.stroke();

        // This sets clip to _inside_ region of path (current series)
        // _inside_ is not where we filled with color, but from path's Y up to top of the canvas (up to y=0)
        // Because of clip, all the subsequent series will be drawn only partially in this clipped area -
        // i.e. only what's visible on top of previously drawn series

        // ctx.restore();

        ctx.beginPath();
        area(points);
        ctx.clip();
      }

      let endTs = Date.now();
      console.log(`Finished render: ${endTs} - ${endTs - startTs} msec`);
    },

    renderSVG() {
      this.initSize();

      //let canvas = this.$refs.canvas;
      let width = this.canvasWidth;
      let height = this.canvasHeight;
      let w = 600;

      // Clear whole content of container
      while (this.$refs.chart.lastChild) {
        this.$refs.chart.removeChild(this.$refs.chart.lastChild);
      }

      //  TODO

      let data = this.data;

      let margin = { top: 10, right: 10, bottom: 10, left: 10 };
      let overlap = 10;
      let lineColor = '#ffffff';
      let areaColor = '#000000';
      let opacity = 0.6;
      let showline = true;

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
        .y0(0)
        .y1(d => z(d));

      let line = area.lineY1();

      const svg = d3
        .select(this.$refs.chart.appendChild(DOMsvg(width, height)))
        .style('position', 'relative')
        .style('font', '10px sans-serif');

      const serie = svg
        .append('g')
        .selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('transform', (d, i) => {
          return `translate(0,${y(i) + 1})`;
        });

      serie
        .append('path')
        .attr('fill', areaColor)
        .attr('opacity', opacity)
        .attr('d', (d, i) => area(d));

      serie
        .append('path')
        .attr('fill', 'none')
        .attr('stroke', lineColor)
        .attr('opacity', showline ? 1 : 0)
        .attr('d', d => line(d));

      function DOMsvg(width, height) {
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', [0, 0, width, height]);
        svg.setAttribute('width', width);
        svg.setAttribute('height', height);
        return svg;
      }
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
