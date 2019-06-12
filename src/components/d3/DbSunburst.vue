/* DbSunburst: Sunburst visualization Inspired by https://github.com/David-Desmaisons/Vue.D3.sunburst */
<template>
  <div class="graph">
    <!-- Use this slot to add information on top or bottom of the graph
    <slot name="legend" :width="width" :colorGetter="colorGetter" :nodes="graphNodes" :actions="actions">
    </slot>-->

    <div class="viewport" v-resize.throttle.250="resize">
      <!-- Use this slot to add information on top of the graph
      <slot name="top" :colorGetter="colorGetter" :nodes="graphNodes" :actions="actions">
      </slot>-->

      <!-- Use this slot to add behaviors to the sunburst
      <slot :nodes="graphNodes" :actions="actions">
      </slot>-->
    </div>
  </div>
</template>
<script>
/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "transition" }]*/

import resize from 'vue-resize-directive';
import { select } from 'd3-selection';
import { scaleLinear, scaleSqrt } from 'd3-scale';
import { hierarchy, partition } from 'd3-hierarchy';
import { interpolate } from 'd3-interpolate';
import { arc } from 'd3-shape';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import { scaleOrdinal } from 'd3-scale';

import { transition } from 'd3-transition';
//import { colorSchemes } from '../infra/colorSchemes';

function recursiveName(node) {
  const res = node
    .ancestors()
    .map(node => node.data.name)
    .join('-');
  return res;
}

function copyCurrentValues(to, from) {
  const { x0, x1, y0, y1 } = from;
  to._current = { x0, x1, y0, y1 };
}

function arc2Tween(arcSunburst, d, indx) {
  const positionsKeys = ['x0', 'x1', 'y0', 'y1'];
  const interpolates = {};
  positionsKeys.forEach(key => {
    interpolates[key] = interpolate(this._current[key], d[key]);
  });
  copyCurrentValues(this, d);

  return function(t) {
    const tmp = {};
    positionsKeys.forEach(key => {
      tmp[key] = interpolates[key](t);
    });
    return arcSunburst(tmp, indx);
  };
}

const useNameForColor = d => d.name;

export default {
  name: 'DbSunburst',

  props: {
    /**
     * Sunburst data where children property is a array containing children.
     */
    data: {
      type: Object,
      required: false
    },
    /**
     * D3 color scheme to be used.
     */
    colorScheme: {
      type: String,
      required: false,
      // TODO
      default() {
        return 'schemeAccent';
      }
    },
    /**
     * Function used to map an item and its color.
     * (nodeD3: Object) => category: Number | String
     * By default use the node name
     */
    getCategoryForColor: {
      type: Function,
      required: false,
      default: useNameForColor
    },
    /**
     * Minimal arc angle to be displayed (in radian).
     */
    minAngleDisplayed: {
      type: Number,
      required: false,
      default: 0.005
    },
    /**
     * Function used to identify an arc, will be used during graph updates.
     * (nodeD3: Object) => id: String
     * @default id based on recursive agregation of node parent name
     */
    arcIdentification: {
      type: Function,
      required: false,
      default: recursiveName
    },
    /**
     *  Duration for in animation in milliseconds
     */
    inAnimationDuration: {
      type: Number,
      required: false,
      default: 100
    },
    /**
     *  Duration for out animation in milliseconds
     */
    outAnimationDuration: {
      type: Number,
      required: false,
      default: 1000
    }
  },

  directives: {
    resize
  },

  data() {
    const scaleX = scaleLinear()
      .range([0, 2 * Math.PI])
      .clamp(true);

    const scaleY = scaleSqrt().range([0, 1]);

    this.arcSunburst = arc()
      .startAngle(d => scaleX(d.x0))
      .endAngle(d => scaleX(d.x1))
      .innerRadius(d => Math.max(0, scaleY(d.y0)))
      .outerRadius(d => Math.max(0, scaleY(d.y1)));

    this.scaleX = scaleX;
    this.scaleY = scaleY;

    return {
      /**
       * @private
       */
      graphNodes: {
        clicked: null,
        mouseOver: null,
        zoomed: null,
        root: null,
        highlighted: null
      },

      /**
       * @private
       */
      width: null,

      /**
       * @private
       */
      height: null
    };
  },

  mounted() {
    const [viewport] = this.$el.getElementsByClassName('viewport');
    this.viewport = viewport;
    this.vis = select(viewport)
      .append('svg')
      .style('overflow', 'visible')
      .attr('class', 'root')
      .attr('width', '100%')
      .attr('height', '100%')
      .append('g');

    select(viewport).on('mouseleave', () => {
      this.graphNodes.mouseOver = null;
    });

    this.resize();
  },

  methods: {
    /**
     * @private
     */
    getSize() {
      var width = this.viewport.clientWidth;
      var height = this.viewport.clientHeight;
      return { width, height };
    },

    /**
     * @private
     */
    onData(data) {
      if (!data) {
        this.vis.selectAll('path').remove();
        Object.keys(this.graphNodes).forEach(k => (this.graphNodes[k] = null));
        return;
      }

      this.root = hierarchy(data)
        .sum(d => d.size)
        .sort((a, b) => b.value - a.value);

      this.nodes = partition()(this.root)
        .descendants()
        .filter(d => Math.abs(this.scaleX(d.x1 - d.x0)) > this.minAngleDisplayed);

      const pathes = this.getPathes();
      const colorGetter = this.colorGetter;
      const mouseOver = this.mouseOver.bind(this);
      const click = this.click.bind(this);
      const { arcSunburst } = this;

      pathes
        .enter()
        .append('path')
        .style('opacity', 1)
        .on('mouseover', mouseOver)
        .on('click', click)
        .each(function(d) {
          copyCurrentValues(this, d);
        })
        .merge(pathes)
        .style('fill', d => colorGetter(d.data))
        .transition('enter')
        .duration(this.inAnimationDuration)
        .attrTween('d', function(d, index) {
          return arc2Tween.call(this, arcSunburst, d, index);
        });

      pathes.exit().remove();

      this.graphNodes.root = this.nodes[0];
    },

    /**
     * @private
     */
    getPathes() {
      return this.vis.selectAll('path').data(this.nodes, this.arcIdentification);
    },

    /**
     * @private
     */
    resize() {
      const { width, height } = this.getSize();
      this.vis
        .attr('width', width)
        .attr('height', height)
        .attr('transform', `translate(${width / 2}, ${height / 2} )`);

      this.radius = Math.min(width, height) / 2;
      const [scaleYMin] = this.scaleY.range();
      this.scaleY.range([scaleYMin, this.radius]);

      this.onData(this.data);
      this.width = width;
      this.height = height;
    },

    /**
     * @private
     */
    reDraw() {
      this.onData(this.data);
    },

    /**
     * @private
     */
    mouseOver(value) {
      this.graphNodes.mouseOver = value;
      /**
       * Fired when mouse is over a sunburst node.
       * @param {Object} value - {node, sunburst} The corresponding node and sunburst component
       */
      this.$emit('mouseOverNode', { node: value, sunburst: this });
    },

    /**
     * @private
     */
    click(value) {
      this.graphNodes.clicked = value;
      /**
       * Fired when sunburst node is clicked.
       * @param {Object} value - {node, sunburst} The corresponding node and sunburst component
       */
      this.$emit('clickNode', { node: value, sunburst: this });
    },

    /**
     * Highlight the arc path leading to a given node.
     * @param {Object} node the D3 node to highlight
     * @param {Number} opacity opacity of the none highlighted nodes, default to 0.3
     */
    highlightPath(node, opacity = 0.3) {
      const sequenceArray = node.ancestors();

      this.vis
        .selectAll('path')
        .filter(d => sequenceArray.indexOf(d) === -1)
        .transition()
        .duration(this.inAnimationDuration)
        .style('opacity', opacity);

      this.vis
        .selectAll('path')
        .filter(d => sequenceArray.indexOf(d) >= 0)
        .style('opacity', 1);

      this.graphNodes.highlighted = node;
    },

    /**
     * Zoom to a given node.
     * @param {Object} node the D3 node to zoom to.
     */
    zoomToNode(node) {
      this.vis
        .transition('zoom')
        .duration(750)
        .tween('scale', () => {
          const xd = interpolate(this.scaleX.domain(), [node.x0, node.x1]);
          const yd = interpolate(this.scaleY.domain(), [node.y0, 1]);
          const yr = interpolate(this.scaleY.range(), [node.y0 ? 20 : 0, this.radius]);

          return t => {
            this.scaleX.domain(xd(t));
            this.scaleY.domain(yd(t)).range(yr(t));
          };
        })
        .selectAll('path')
        .attrTween('d', nd => () => this.arcSunburst(nd));

      this.graphNodes.zoomed = node;
    },

    /**
     * Reset the highlighted path
     */
    resetHighlight() {
      this.vis
        .selectAll('path')
        .transition()
        .duration(this.outAnimationDuration)
        .style('opacity', 1);
    }
  },

  computed: {
    /**
     * @private
     */
    actions() {
      return {
        highlightPath: this.highlightPath.bind(this),
        zoomToNode: this.zoomToNode.bind(this),
        resetHighlight: this.resetHighlight.bind(this)
      };
    },

    /**
     * @private
     */
    colorGetter() {
      //const colorScale = colorSchemes[this.colorScheme].scale;
      //return d => colorScale(this.getCategoryForColor(d));
      const colorScale = scaleOrdinal(d3ScaleChromatic.schemeCategory10);
      return d => colorScale(this.getCategoryForColor(d));
    }
  },

  watch: {
    data: {
      handler(current) {
        this.onData(current);
      },
      deep: true
    },

    colorGetter(value) {
      this.getPathes().style('fill', value);
    },

    minAngleDisplayed() {
      this.reDraw();
    }
  }
};
</script>

<style lang="scss" scoped>
.graph {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column wrap;
}

.viewport {
  width: 100%;
  flex: 1 1 auto;
}
</style>
