<template>
  <db-dygraphs ref="dygraph" :_updated="_updated" :data="data" :options="graphOptions" :dark="dark" @db-event="handleDbEvent"> </db-dygraphs>
</template>
<script>
//import DygraphInteraction from 'dygraphs';
import DbDygraphs from './DbDygraphs';
//import log from '../log';
export default {
  name: 'DbDygraphsLine',
  components: {
    DbDygraphs
  },
  props: {
    _updated: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object
    },
    dark: {
      type: Boolean,
      default: false
    },
    smoothing: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  },
  mounted: function() {},
  computed: {
    // Augment passed options with defaults for this chart type
    graphOptions: {
      get() {
        return Object.assign({}, this.defaultOptions, this.options);
      },
      set() {
        /*noop*/
      }
    },
    defaultOptions: function() {
      return {
        includeZero: true,
        highlightCircleSize: 0,
        legend: 'never',
        // TODO Consider if needs to be enabled; need to import asyncronously so vuepress compiles
        //interactionModel: DygraphInteraction.nonInteractiveModel,
        plotter: this.smoothing > 0 ? this.smoothPlotter : null,
        axes: {
          x: {
            drawGrid: false,
            drawAxis: false
          },
          y: {
            drawGrid: false,
            drawAxis: false
          }
        }
      };
    }

    // TODO Computed data, accept array with just sequence of numbers, augment it with X (1,2,3 ..)
  },
  methods: {
    handleDbEvent(payload) {
      this.$emit('db-event', payload);
    },
    // Smooth plotter - see:
    // view-source:http://dygraphs.com/tests/smooth-plots.html
    // http://dygraphs.com/src/extras/smooth-plotter.js
    /**
     * Given three sequential points, p0, p1 and p2, find the left and right
     * control points for p1.
     *
     * The three points are expected to have x and y properties.
     *
     * The alpha parameter controls the amount of smoothing.
     * If Î±=0, then both control points will be the same as p1 (i.e. no smoothing).
     *
     * Returns [l1x, l1y, r1x, r1y]
     *
     * It's guaranteed that the line from (l1x, l1y)-(r1x, r1y) passes through p1.
     * Unless allowFalseExtrema is set, then it's also guaranteed that:
     *   l1y âˆˆ [p0.y, p1.y]
     *   r1y âˆˆ [p1.y, p2.y]
     *
     * The basic algorithm is:
     * 1. Put the control points l1 and r1 Î± of the way down (p0, p1) and (p1, p2).
     * 2. Shift l1 and r2 so that the line l1â€“r1 passes through p1
     * 3. Adjust to prevent false extrema while keeping p1 on the l1â€“r1 line.
     *
     * This is loosely based on the HighCharts algorithm.
     */
    getControlPoints(p0, p1, p2, opt_alpha, opt_allowFalseExtrema) {
      var alpha = opt_alpha !== undefined ? opt_alpha : 1 / 3; // 0=no smoothing, 1=crazy smoothing
      var allowFalseExtrema = opt_allowFalseExtrema || false;

      if (!p2) {
        return [p1.x, p1.y, null, null];
      }

      // Step 1: Position the control points along each line segment.
      var l1x = (1 - alpha) * p1.x + alpha * p0.x,
        l1y = (1 - alpha) * p1.y + alpha * p0.y,
        r1x = (1 - alpha) * p1.x + alpha * p2.x,
        r1y = (1 - alpha) * p1.y + alpha * p2.y;

      // Step 2: shift the points up so that p1 is on the l1â€“r1 line.
      if (l1x != r1x) {
        // This can be derived w/ some basic algebra.
        var deltaY = p1.y - r1y - ((p1.x - r1x) * (l1y - r1y)) / (l1x - r1x);
        l1y += deltaY;
        r1y += deltaY;
      }

      // Step 3: correct to avoid false extrema.
      if (!allowFalseExtrema) {
        if (l1y > p0.y && l1y > p1.y) {
          l1y = Math.max(p0.y, p1.y);
          r1y = 2 * p1.y - l1y;
        } else if (l1y < p0.y && l1y < p1.y) {
          l1y = Math.min(p0.y, p1.y);
          r1y = 2 * p1.y - l1y;
        }

        if (r1y > p1.y && r1y > p2.y) {
          r1y = Math.max(p1.y, p2.y);
          l1y = 2 * p1.y - r1y;
        } else if (r1y < p1.y && r1y < p2.y) {
          r1y = Math.min(p1.y, p2.y);
          l1y = 2 * p1.y - r1y;
        }
      }

      return [l1x, l1y, r1x, r1y];
    },
    isOK(x) {
      return !!x && !isNaN(x);
    },
    // A plotter which uses splines to create a smooth curve.
    // See tests/plotters.html for a demo.
    // Can be controlled via smoothPlotter.smoothing
    // TODO Figure out how to support fillGraph
    smoothPlotter(e) {
      var ctx = e.drawingContext,
        points = e.points;

      ctx.beginPath();
      ctx.moveTo(points[0].canvasx, points[0].canvasy);

      // right control point for previous point
      var lastRightX = points[0].canvasx,
        lastRightY = points[0].canvasy;

      for (var i = 1; i < points.length; i++) {
        var p0 = points[i - 1],
          p1 = points[i],
          p2 = points[i + 1];
        p0 = p0 && this.isOK(p0.canvasy) ? p0 : null;
        p1 = p1 && this.isOK(p1.canvasy) ? p1 : null;
        p2 = p2 && this.isOK(p2.canvasy) ? p2 : null;
        if (p0 && p1) {
          var controls = this.getControlPoints({ x: p0.canvasx, y: p0.canvasy }, { x: p1.canvasx, y: p1.canvasy }, p2 && { x: p2.canvasx, y: p2.canvasy }, this.smoothing);
          // Uncomment to show the control points:
          // ctx.lineTo(lastRightX, lastRightY);
          // ctx.lineTo(controls[0], controls[1]);
          // ctx.lineTo(p1.canvasx, p1.canvasy);
          lastRightX = lastRightX !== null ? lastRightX : p0.canvasx;
          lastRightY = lastRightY !== null ? lastRightY : p0.canvasy;
          ctx.bezierCurveTo(lastRightX, lastRightY, controls[0], controls[1], p1.canvasx, p1.canvasy);
          lastRightX = controls[2];
          lastRightY = controls[3];
        } else if (p1) {
          // We're starting again after a missing point.
          ctx.moveTo(p1.canvasx, p1.canvasy);
          lastRightX = p1.canvasx;
          lastRightY = p1.canvasy;
        } else {
          lastRightX = lastRightY = null;
        }
      }
      ctx.stroke();
    }
  }
};
</script>
