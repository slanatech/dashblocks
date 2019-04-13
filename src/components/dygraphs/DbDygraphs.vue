<template>
  <div ref="container" class="db-dygraphs" />
</template>
<script>
// TODO Issue: wrong sizing on initial load (does not take drawer size into account )
// Render on next tick ?

import DbColors from '../dbcolors';
import Dygraphs from 'dygraphs';
import 'dygraphs/dist/dygraph.css';
import log from '../log';

export default {
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
      graph: null,
      defaultOptions: {
        colors: DbColors.defaultColors,
        animatedZooms: true,
        labelsDiv: this.$refs.dbdylabels,
        legend: 'follow',
        legendFormatter: this.legendFormatter,
        zoomCallback: this.handleZoom
      }
    };
  },
  computed: {
    // Augment passed options with defaults for Dygraphs
    graphOptions: {
      get() {
        return Object.assign({}, this.defaultOptions, this.options);
      },
      set() {
        /*noop*/
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.render();
    });
  },
  watch: {
    data: function() {
      // Rendering is triggered when data changed
      // To force re-render if only options changed, call $refs.child.render
      //this.render();
    }
  },
  methods: {
    render() {
      //console.log("Rendering Dygraph ...");
      this.graph = new Dygraphs(this.$refs.container, this.data, this.graphOptions);
    },
    legendFormatter: function(data) {
      if (data.x == null) {
        // This happens when there's no selection and {legend: 'always'} is set.
        return (
          '' +
          data.series
            .map(function(series) {
              return series.dashHTML + ' ' + series.labelHTML;
            })
            .join(' ')
        );
      }
      var html = this.graph.getLabels()[0] + ': ' + data.xHTML;
      data.series.forEach(function(series) {
        if (!series.isVisible) return;
        var labeledData = series.labelHTML + ': ' + series.yHTML;
        if (series.isHighlighted) {
          labeledData = '<b>' + labeledData + '</b>';
        }
        html += '<br>' + series.dashHTML + ' ' + labeledData;
      });
      return html;
    },
    handleZoom: function(minDate, maxDate, yRanges) {
      log.info('handleZoom: minDate:' + minDate + ', maxDate:' + maxDate + ', yRanges:' + yRanges);
      this.$emit('db-event', {
        minDate: Math.floor(minDate),
        maxDate: Math.floor(maxDate),
        yRanges: yRanges
      });
    }
  }
};
</script>
<style>
.db-dygraphs {
  width: 100%;
  height: 100%;
}
.dygraph-axis-label {
  font-size: 12px;
}
.dygraph-ylabel {
  font-size: 16px;
}
.dygraph-title {
  font-size: 16px;
  font-weight: normal;
  text-align: left;
}
.dygraph-legend {
  background-color: rgba(255, 255, 255, 0.85) !important;
  padding: 4px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 4px 4px 4px #888;
  pointer-events: none;
  width: 190px;
  font-size: 12px;
  position: relative;
}
</style>
