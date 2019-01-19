<template>
  <div ref="container" class="dbc-d3"></div>
</template>
<script>
import * as d3 from 'd3';

export default {
  props: {
    wdata: {},
    wspec: {}
  },
  data() {
    return {
      graph: null
    };
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.render();
  },
  beforeDestroy: function() {
    //console.log('beforeDestroy!');
    window.removeEventListener('resize', this.handleResize);
  },
  watch: {
    wdata: function() {
      // TODO ???
      // Rendering is triggered when data changed
      // To force re-render if only options changed, call $refs.child.render
      this.render();
    }
  },
  methods: {
    handleResize(/*event*/) {
      //console.log('handleResize!');
      this.$nextTick(() => {
        this.render();
      });
    },
    render() {
      //console.log('Rendering d3 ...');

      // Clear whole content of container
      while (this.$refs.container.lastChild) {
        this.$refs.container.removeChild(this.$refs.container.lastChild);
      }

      let data = this.wdata;

      let step = 23;
      let scheme = 'schemeGreens';
      let overlap = 7;

      let margin = { top: 30, right: 10, bottom: 0, left: 10 };

      let width = this.$refs.container.clientWidth - 40;
      let height = data.length * (step + 1) + margin.top + margin.bottom;

      let color = i => d3[scheme][Math.max(3, overlap)][i + Math.max(0, 3 - overlap)];

      let x = d3
        .scaleUtc()
        .domain([data[0].values[0].date, data[0].values[data[0].values.length - 1].date])
        .range([0, width]);

      let y = d3
        .scaleLinear()
        .domain([0, d3.max(data, d => d3.max(d.values, d => d.value))])
        .range([0, -overlap * step]);

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

      function horizon(d) {
        const context = this.getContext('2d');
        area.context(context);
        for (let i = 0; i < overlap; ++i) {
          context.save();
          context.translate(0, (i + 1) * step);
          context.beginPath();
          area(d.values);
          context.fillStyle = color(i);
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
.dbc-d3 {
  width: 100%;
  height: 95%;
  display: block;
}
</style>
