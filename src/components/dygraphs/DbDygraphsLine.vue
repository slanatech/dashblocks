<template>
  <div class="dbc-dygraphs-line">
    <db-dygraphs ref="dygraph" :_updated="_updated" :data="data" :options="graphOptions"> </db-dygraphs>
  </div>
</template>
<script>
import DygraphInteraction from 'dygraphs';
import DbDygraphs from './DbDygraphs';
import log from '../log';
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
    }
  },
  data() {
    return {
      defaultOptionsNN: {
        rollPeriod: 30,
        legend: 'always',
        title: 'High and Low Temperatures (30-day average)',
        ylabel: 'Temperature (F)',
        xlabel: 'Date (Ticks indicate the start of the indicated time period)',
        strokeWidth: 1.5
      },
      defaultOptions: {
        legend: 'follow',
        includeZero: true,
        panEdgeFraction: 0.00000001,
        animatedZooms: true,
        zoomCallback: this.handleZoom,
        fillGraph: true,
        fillAlpha: 0.2,
        /*
        highlightSeriesOpts: {
          strokeWidth: 2,
          strokeBorderWidth: 1,
          highlightCircleSize: 5
        },
        */
        interactionModel: DygraphInteraction.defaultInteractionModel,
        axes: {
          x: {
            drawGrid: true
          }
        }
      }
    };
  },
  mounted: function() {
    //this.configure();
    //this.graphData = this.data;
  },
  watch: {
    data: function(/*val, oldVal*/) {
      //this.graphData = this.data;
    }
    /*
    options: {
      handler: function() {
        this.configure();
      },
      deep: true
    }*/
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
      this.graphOptions.zoomCallback = this.handleZoom;
    },

    handleZoom: function(minDate, maxDate, yRanges) {
      log.info('handleZoom: minDate:' + minDate + ', maxDate:' + maxDate + ', yRanges:' + yRanges);
      this.$emit('zoom', {
        minDate: Math.floor(minDate),
        maxDate: Math.floor(maxDate),
        yRanges: yRanges
      });
    }
  }
};
</script>
<style>
.dbc-dygraphs-line {
  width: 100%;
  height: 100%;
}

.dygraph-legendNN {
  background-color: rgba(209, 236, 241, 0.95) !important;
  padding: 4px;
  border: 1px solid #bee5eb;
  border-radius: 4px;
  pointer-events: none;
  width: 240px;
  position: absolute;
  margin-top: 40px;
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
