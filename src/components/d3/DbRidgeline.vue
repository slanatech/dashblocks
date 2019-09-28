<template>
  <div ref="container" class="db-d3-horizon"></div>
</template>
<script>
import * as d3 from 'd3';
import { dbStdProps } from '../mixins/dbstdprops';
import log from '../log';
/**
 * D3 Ridgeline Chart.
 * Based on https://observablehq.com/@d3/ridgeline-plot
 *
 * DbRidgeline accepts data in the following format:
 *
 *```json
 * [
 *   {key:'Series1', values:[{date:new Date(),value: 1},{date:new Date(),value: 2}]},
 *   {key:'Series2', values:[{date:new Date(),value: 2},{date:new Date(),value: 1}]}
 * ]
 *```
 *
 */
export default {
  name: 'DbRidgeline',
  mixins: [dbStdProps],
  props: {
    /**
     * Chart Data
     */
    data: {
      type: Array,
      default: () => []
    },
    /**
     * Height of each series in pixels.
     */
    seriesHeight: {
      type: Number,
      default: 23
    },
    /**
     * Number of overlapping color steps, in range 1-9
     */
    colorSteps: {
      type: Number,
      default: 7
    },
    /**
     * Color scheme
     * Use one of Discrete Diverging color schemes from d3-scale-chromatic:
     *
     * `schemeBrBG,schemePRGn, ...`
     *
     * See https://github.com/d3/d3-scale-chromatic
     */
    scheme: {
      type: String,
      default: 'schemePuBuGn'
    }
  },
  data() {
    return {
      graph: null,
      overlap: 7
    };
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.$nextTick(() => {
      this.render();
    });
  },
  beforeDestroy: function() {
    log.info('beforeDestroy!');
    window.removeEventListener('resize', this.handleResize);
  },
  watch: {
    data: function() {
      // Rendering is triggered when data changed
      // To force re-render if only options changed, call $refs.child.render
      this.$nextTick(() => {
        this.render();
      });
    },
    dark: function() {
      this.$nextTick(() => {
        this.render();
      });
    }
  },
  methods: {
    handleResize(/*event*/) {
      //console.log('handleResize!');
      this.$nextTick(() => {
        this.render();
      });
    },
    getColor(i) {
      if (!this.dark) {
        // For Light scheme, get color in straight order
        return d3[this.scheme][Math.max(3, this.overlap)][i + Math.max(0, 3 - this.overlap)];
      } else {
        // For dark scheme, need to take color in reverse order
        let csize = Math.max(3, this.overlap);
        let cidx = csize - 1 - (i + Math.max(0, 3 - this.overlap));
        return d3[this.scheme][csize][cidx];
      }
    },
    render() {
      log.info('Rendering d3 ridgeline ...');

      //let comp = this;

      // Clear whole content of container
      while (this.$refs.container.lastChild) {
        this.$refs.container.removeChild(this.$refs.container.lastChild);
      }

      let data = this.data;
      //data.push(this.data[0]);

      let step = this.seriesHeight;
      // color steps range is 1-9
      // TODO Check for ridgeline
      this.overlap = this.colorSteps < 1 ? 1 : this.colorSteps > 9 ? 9 : this.colorSteps;
      let overlap = 8; //this.overlap;

      // TODO Top margin based on data
      let margin = { top: 180, right: 0, bottom: 20, left: 90 };

      let width = this.$refs.container.clientWidth - 40;
      let height = data.length * step; // data.length * (step + 1) + margin.top + margin.bottom;

      let x = d3
        .scaleUtc()
        .domain([data[0].values[0].date, data[0].values[data[0].values.length - 1].date])
        .range([margin.left, width - margin.right]);

      let y = d3
        .scalePoint()
        .domain(data.map(d => d.key))
        .range([margin.top, height - margin.bottom]);

      //let zDomain = [0, d3.max(data, d => d3.max(d.values, d => d.value))];
      //let yStep = y.step;
      //let zRange = [0, -overlap * y.step()];

      let z = d3
        .scaleLinear()
        .domain([0, d3.max(data, d => d3.max(d.values, d => d.value))])
        .range([0, -overlap * y.step()]);

      let xAxis = g =>
        g.attr('transform', `translate(0,${height - margin.bottom})`).call(
          d3
            .axisBottom(x)
            .ticks(width / 80)
            .tickSizeOuter(0)
        );

      let yAxis = g =>
        g
          .attr('transform', `translate(${margin.left},0)`)
          .call(
            d3
              .axisLeft(y)
              .tickSize(0)
              .tickPadding(4)
          )
          .call(g => g.select('.domain').remove());

      // This takes d = {date:d, value:v}
      let area = d3
        .area()
        .curve(d3.curveBasis)
        .defined(d => !isNaN(d.value))
        //.x((d, i) => x(data.dates[i]))
        .x(d => x(d.date))
        .y0(0)
        .y1(d => z(d.value));

      //let test1 = data[0].values.map(d => x(d.date));
      //let test2 = data[0].values.map(d => z(d.value));

      let line = area.lineY1();

      const svg = d3
        .select(this.$refs.container.appendChild(DOMsvg(width, height)))
        .style('position', 'relative')
        .style('font', '10px sans-serif');

      svg.append('g').call(xAxis);
      svg.append('g').call(yAxis);

      const group = svg
        .append('g')
        .selectAll('g')
        .data(data)
        .join('g')
        .attr('transform', d => `translate(0,${y(d.key) + 1})`);

      group
        .append('path')
        .attr('fill', '#ddd')
        .attr('d', d => area(d.values));

      group
        .append('path')
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('d', d => line(d.values));

      /*
      let xAxis = g =>
        g
          .attr('transform', `translate(0,${margin.top})`)
          .call(
            d3
              .axisTop(x)
              .ticks(width / 80)
              .tickSizeOuter(0)
          )
          .call(g =>
            g
              .selectAll('.tick')
              .filter(d => x(d) < margin.left || x(d) >= width - margin.right)
              .remove()
          )
          .call(g => g.select('.domain').remove());

      // ???
      let area = d3
        .area()
        .curve(d3.curveBasis)
        .defined(d => !isNaN(d.value))
        .x(d => x(d.date))
        .y0(0)
        .y1(d => y(d.value));

      // Draw
      //const canvas = d3
      d3.select(this.$refs.container)
        .selectAll('canvas')
        .data(data)
        .enter()
        .append(() => DOMcontext2d(width, step).canvas)
        .style('position', 'absolute')
        .style('top', (d, i) => `${i * (step + 1) + margin.top}px`)
        .each(horizon);

      const svg = d3
        .select(this.$refs.container.appendChild(DOMsvg(width, height)))
        .style('position', 'relative')
        .style('font', '10px sans-serif');

      svg.append('g').call(xAxis);

      svg
        .append('g')
        .selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('x', 4)
        .attr('y', (d, i) => (i + 0.5) * (step + 1) + margin.top)
        .attr('dy', '0.35em')
        .attr('fill', 'currentColor')
        .text(d => d.key);

      const rule = svg
        .append('line')
        .attr('stroke', '#000')
        .attr('y1', margin.top - 6)
        .attr('y2', height - margin.bottom - 1)
        .attr('x1', 0.5)
        .attr('x2', 0.5);

      svg.on('mousemove touchmove', () => {
        const mx = d3.mouse(svg.node())[0] + 0.5;
        rule.attr('x1', mx).attr('x2', mx);
        // this gets value from X in data - original timestamp ?
        //let scalex = x.invert(mx);
        // TODO get Y using X
        //console.log(`Mouse move: mx=${mx}, x=${scalex}`);
      });
      */
      /*
      function horizon(d) {
        const context = this.getContext('2d');
        area.context(context);
        for (let i = 0; i < overlap; ++i) {
          context.save();
          context.translate(0, (i + 1) * step);
          context.beginPath();
          area(d.values);
          context.fillStyle = comp.getColor(i); // color(i);
          context.fill();
          context.restore();
        }
      }

      function DOMcontext2d(width, height, dpi) {
        if (dpi == null) dpi = devicePixelRatio;
        let canvas = document.createElement('canvas');
        canvas.width = width * dpi;
        canvas.height = height * dpi;
        canvas.style.width = width + 'px';
        let context = canvas.getContext('2d');
        context.scale(dpi, dpi);
        return context;
      }
      */

      function DOMsvg(width, height) {
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', [0, 0, width, height]);
        svg.setAttribute('width', width);
        svg.setAttribute('height', height);
        return svg;
      }
    }
  }
};
</script>
<style>
.db-d3-horizon {
  width: 100%;
  height: 95%;
  display: block;
  position: relative;
}
</style>
