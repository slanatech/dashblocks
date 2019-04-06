<template>
  <db-dygraphs ref="dygraph" :data="data" :options="graphOptions" @db-event="handleDbEvent"> </db-dygraphs>
</template>
<script>
//import merge from "deepmerge";
import DygraphInteraction from 'dygraphs';
import DbDygraphs from './DbDygraphs';
import log from '../log';
export default {
  name: 'DbDygraphsBar',
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
    }
  },
  data() {
    return {
      defaultOptions: {
        legend: 'follow',
        includeZero: true,
        panEdgeFraction: 0.00000001,
        interactionModel: DygraphInteraction.defaultInteractionModel,
        axes: {
          x: {
            drawGrid: false
          }
        },
        plotter: this.barChartPlotter
      }
    };
  },
  watch: {
    // TODO Is this needed here ? Check, and keep only in main DbDygraphs
    data: function(/*val, oldVal*/) {
      this.graphData = this.data;
    },
    options: {
      handler: function(/*val, oldVal*/) {
        this.configure();
      },
      deep: true
    }
  },
  computed: {
    // Augment passed options with defaults for this chart type
    graphOptions: {
      get() {
        return Object.assign({}, this.defaultOptions, this.options);
      },
      set() {
        /*noop*/
      }
    }
  },
  methods: {
    // This function draws bars for a single series
    barChartPlotter: function(e) {
      var ctx = e.drawingContext;
      var points = e.points;
      var y_bottom = e.dygraph.toDomYCoord(0);

      ctx.fillStyle = e.color;

      // Find the minimum separation between x-values.
      // This determines the bar width.
      var min_sep = Infinity;
      for (let i = 1; i < points.length; i++) {
        var sep = points[i].canvasx - points[i - 1].canvasx;
        if (sep < min_sep) min_sep = sep;
      }
      var bar_width = Math.floor((2.0 / 3) * min_sep);

      // Do the actual plotting.
      for (let i = 0; i < points.length; i++) {
        var p = points[i];
        var center_x = p.canvasx;

        ctx.fillRect(center_x - bar_width / 2, p.canvasy, bar_width, y_bottom - p.canvasy);

        ctx.strokeRect(center_x - bar_width / 2, p.canvasy, bar_width, y_bottom - p.canvasy);
      }
    },
    handleDbEvent(...args) {
      log.info('Got event!');
      this.$emit('db-event', ...args);
    }
  }
};
</script>
