<template>
  <div class="dbc-dygraphs-dth">
    <db-dygraphs ref="dygraph" :_updated="_updated" :data="data" :options="graphOptions" :dark="dark"> </db-dygraphs>
  </div>
</template>
<script>
// NOTE: WORK IN PROGRESS
//import merge from "deepmerge";
//import DygraphInteraction from 'dygraphs';
import DbDygraphs from './DbDygraphs';
export default {
  name: 'DbDygraphsDateTimeHistogram',
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
    }
  },
  data() {
    return {
      graphData: [],
      graphOptionsNN: {},
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
  mounted: function() {
    this.configure();
    this.graphData = this.data;
  },
  watch: {
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
    // Trigger rendering
    render: function() {
      this.$refs.dygraph.render();
    },

    // Create graphOptions by processing options passed via props and defaults
    configure: function() {
      // TODO Check if we need deepmerge
      //this.graphOptions = merge(this.defaultOptions, this.options);
      this.graphOptions = Object.assign({}, this.defaultOptions, this.options);

      // Setup callbacks
      //this.graphOptions.zoomCallback = this.handleZoom;

      // TODO Consider making below configurable
      // Disable double-click
      //this.graphOptions.interactionModel.dblclick = this.handleDblclick;

      // Enable bars
      //this.graphOptions.plotter = this.barChartPlotter;
    },

    handleDblclick: function(/*event, g, context*/) {
      // Ignore double-click - disable zoom in
      return;
    },

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
    }
  }
};
</script>
<style>
.dbc-dygraphs-dth {
  width: 100%;
  height: 100%;
}

.dbc-dygraphs-dth .dygraph-legend2 {
  font-size: 14px;
  text-align: left;
  margin-left: 65px;
}

.dbc-dygraphs-dth .dygraph-title2 {
  font-size: 18px;
  text-align: center;
}
</style>
