<template>
  <db-dygraphs ref="dygraph" :_updated="_updated" :data="data" :options="graphOptions" :dark="dark" :colorScheme="colorScheme" @db-event="handleDbEvent"> </db-dygraphs>
</template>
<script>
import { dbStdProps } from '../mixins/dbstdprops';
import dbColors from '../dbcolors';
//import DygraphInteraction from 'dygraphs';
//import log from '../log';

// TODO Support special plotter to draw equalizer-like Bars ( horizontal lines with color indicating value )

/**
 * Dygraphs Bar Chart.
 * http://dygraphs.com/
 *
 * Dygraphs accepts data in the following format:
 *
 *```json
 * [
 *   [date:new Date(),1,1,1],
 *   [date:new Date(),1,2,2],
 *   [date:new Date(),1,3,3]
 * ]
 *```
 *
 * @example ../../demo/views/samples/DbDygraphsBarSamples.vue
 */
export default {
  name: 'DbDygraphsBar',
  components: {
    DbDygraphs: () => import('./DbDygraphs')
  },
  mixins: [dbStdProps],
  props: {
    data: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object
    },
    opacity: {
      type: Number,
      default: 0.6
    }
  },
  data() {
    return {
      defaultOptions: {
        legend: 'follow',
        includeZero: true,
        panEdgeFraction: 0.00000001,
        // TODO Consider if needs to be enabled; need to import asyncronously so vuepress compiles
        //interactionModel: DygraphInteraction.defaultInteractionModel,
        axes: {
          x: {
            drawGrid: false
          }
        },
        plotter: this.barChartPlotter
      }
    };
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
    getDygraphs() {
      return this.$refs.dygraph ? this.$refs.dygraph.getDygraphs() : null;
    },
    // This function draws bars for a single series
    barChartPlotter: function(e) {
      var ctx = e.drawingContext;
      var points = e.points;
      var y_bottom = e.dygraph.toDomYCoord(0);

      let opColor = dbColors.hex2RGBA(e.color, this.opacity);
      ctx.fillStyle = opColor; //e.color;
      ctx.strokeStyle = opColor; //e.color;

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
    handleDbEvent(payload) {
      this.$emit('db-event', payload);
    }
  }
};
</script>
