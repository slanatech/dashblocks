/* DbSankey: Sankey visualization based on https://observablehq.com/@jarrettmeyer/sankey-with-animated-gradients https://observablehq.com/@d3/sankey-diagram */
<template>
  <div ref="container" class="db-d3-sankey"></div>
</template>
<script>
import * as d3 from 'd3';
import * as sankey from 'd3-sankey';
import DOMuid from './domuid.js';
import log from '../log.js';

export default {
  name: 'DbSankey',
  props: {
    data: {
      links: [],
      nodes: []
    },
    colorScheme: {
      type: String,
      default: 'interpolateRainbow'
    }
  },
  data() {
    return {
      graph: null,
      svg: null,
      g: null,
      idcntr: 0
    };
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.render();
  },
  beforeDestroy: function() {
    log.info('beforeDestroy!');
    window.removeEventListener('resize', this.handleResize);
  },
  watch: {
    data: function() {
      // Rendering is triggered when data changed
      this.$nextTick(() => {
        this.render();
      });
    }
  },
  methods: {
    handleResize(/*event*/) {
      this.$nextTick(() => {
        this.sizeSvg();
      });
    },

    // Resize svg efficiently, without re-render, based on current BBox
    // ???
    sizeSvg() {
      if (this.svg && this.g) {
        const box = this.g.node().getBBox();
        this.svg
          .attr('width', box.width)
          .attr('height', box.height)
          .attr('viewBox', `${box.x} ${box.y} ${box.width} ${box.height}`);
      }
    },

    // TODO To common utils
    DOMsvg(width, height) {
      let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', [0, 0, width, height]);
      svg.setAttribute('width', width);
      svg.setAttribute('height', height);
      return svg;
    },

    render() {
      log.info('Rendering d3 Sankey ...');

      // Clear whole content of container
      this.svg = null;
      this.g = null;
      while (this.$refs.container.lastChild) {
        this.$refs.container.removeChild(this.$refs.container.lastChild);
      }

      let data = this.data;

      let arrow = '\u2192';
      let duration = 250;
      let nodePadding = 10;
      let nodeWidth = 20;
      let margin = 10;
      let height = 600;
      let width = 1400;
      let size = [width - 2 * margin, height - 2 * margin];

      let color = value => {
        return d3.interpolateRainbow(value);
      };

      let format = value => {
        let f = d3.format(',.0f');
        return f(value);
      };

      let layout = sankey
        .sankey()
        .size(size)
        .nodePadding(nodePadding)
        .nodeWidth(nodeWidth);

      let graph = layout(data);
      graph.nodes.forEach(node => {
        node.color = color(node.index / graph.nodes.length);
      });

      graph.links.forEach(link => {
        link.gradient = DOMuid('gradient');
        link.path = DOMuid('path');
      });

      // TODO this - enable
      const svg = d3
        .select(this.DOMsvg(width, height))
        .style('width', '100%')
        .style('height', '100%')
        .style('margin-bottom', '20px') // ???
        .style('font', '10px Roboto')
        .style('box-sizing', 'border-box');

      const defs = svg.append('defs');

      // Add definitions for all of the linear gradients.
      const gradients = defs
        .selectAll('linearGradient')
        .data(graph.links)
        .join('linearGradient')
        .attr('id', d => d.gradient.id)
        // Important
        // see https://stackoverflow.com/questions/21638169/svg-line-with-gradient-stroke-wont-display-straight
        .attr('gradientUnits', 'userSpaceOnUse');

      gradients
        .append('stop')
        .attr('offset', 0.0)
        .attr('stop-color', d => d.source.color);
      gradients
        .append('stop')
        .attr('offset', 1.0)
        .attr('stop-color', d => d.target.color);

      // Add a g.view for holding the sankey diagram.
      const view = svg
        .append('g')
        .classed('view', true)
        .attr('transform', `translate(${margin}, ${margin})`);

      // Define the nodes.
      const nodes = view
        .selectAll('rect.node')
        .data(graph.nodes)
        .join('rect')
        .classed('node', true)
        .attr('id', d => `node-${d.index}`)
        .attr('x', d => d.x0)
        .attr('y', d => d.y0)
        .attr('width', d => d.x1 - d.x0)
        .attr('height', d => Math.max(1, d.y1 - d.y0))
        .attr('fill', d => d.color)
        .attr('opacity', 0.9);

      // Add titles for node hover effects.
      nodes.append('title').text(d => `${d.name}\n${format(d.value)}`);

      // Add text labels.
      view
        .selectAll('text.node')
        .data(graph.nodes)
        .join('text')
        .classed('node', true)
        .attr('x', d => d.x1)
        .attr('dx', 6)
        .attr('y', d => (d.y1 + d.y0) / 2)
        .attr('dy', '0.35em')
        .attr('fill', 'black')
        .attr('text-anchor', 'start')
        .attr('font-size', 10)
        .attr('font-family', 'Arial, sans-serif')
        .text(d => d.name)
        .filter(d => d.x1 > width / 2)
        .attr('x', d => d.x0)
        .attr('dx', -6)
        .attr('text-anchor', 'end');

      // Define the gray links.
      const links = view
        .selectAll('path.link')
        .data(graph.links)
        .join('path')
        .classed('link', true)
        .attr('d', sankey.sankeyLinkHorizontal())
        .attr('stroke', 'black')
        .attr('stroke-opacity', 0.1)
        .attr('stroke-width', d => Math.max(1, d.width))
        .attr('fill', 'none');

      // Add <title> hover effect on links.
      links.append('title').text(d => `${d.source.name} ${arrow} ${d.target.name}\n${format(d.value)}`);

      // Define the default dash behavior for colored gradients.
      function setDash(link) {
        let el = view.select(`#${link.path.id}`);
        let length = el.node().getTotalLength();
        el.attr('stroke-dasharray', `${length} ${length}`).attr('stroke-dashoffset', length);
      }

      const gradientLinks = view
        .selectAll('path.gradient-link')
        .data(graph.links)
        .join('path')
        .classed('gradient-link', true)
        .attr('id', d => d.path.id)
        .attr('d', sankey.sankeyLinkHorizontal())
        .attr('stroke', d => d.gradient)
        .attr('stroke-opacity', 0)
        .attr('stroke-width', d => Math.max(1, d.width))
        .attr('fill', 'none')
        .each(setDash);

      function branchAnimate(node) {
        let links = view.selectAll('path.gradient-link').filter(link => {
          return node.sourceLinks.indexOf(link) !== -1;
        });
        let nextNodes = [];
        links.each(link => {
          nextNodes.push(link.target);
        });
        links
          .attr('stroke-opacity', 0.5)
          .transition()
          .duration(duration)
          .ease(d3.easeLinear)
          .attr('stroke-dashoffset', 0)
          .on('end', () => {
            nextNodes.forEach(node => {
              branchAnimate(node);
            });
          });
      }

      function branchClear() {
        gradientLinks.transition();
        gradientLinks.attr('stroke-opactiy', 0).each(setDash);
      }

      nodes.on('mouseover', branchAnimate).on('mouseout', branchClear);

      // TODO Add svg to dom
      this.$refs.container.appendChild(svg.node());
      this.svg = svg;
      this.g = view;
      this.sizeSvg();
    }
  }
};
</script>
<style>
.db-d3-sankey {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
