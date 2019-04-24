<template>
  <div ref="container" class="db-dygraphs" />
</template>
<script>
import dbColors from '../dbcolors';
import Dygraphs from 'dygraphs';
import 'dygraphs/dist/dygraph.css';
import log from '../log';

export default {
  name: 'DbDygraphs',
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
      graph: null,
      needUpdate: false,
      needOptionsUpdate: false
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
    },
    defaultOptions: function() {
      return {
        colors: dbColors.getColors(this.dark),
        animatedZooms: true,
        labelsDiv: this.$refs.dbdylabels,
        legend: 'follow',
        legendFormatter: this.legendFormatter,
        zoomCallback: this.handleZoom,
        clickCallback: this.handleClick
      };
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.render();
    });
  },
  watch: {
    _updated: function() {
      log.info('_updated prop changed');
      this.scheduleUpdate(false);
    },
    data: {
      handler() {
        log.info('data prop changed');
        this.scheduleUpdate(false);
      },
      deep: true
    },
    dark: function() {
      this.scheduleUpdate(true);
    }
  },
  methods: {
    render() {
      //console.log("Rendering Dygraph ...");
      this.graph = new Dygraphs(this.$refs.container, this.data, this.graphOptions);
    },
    scheduleUpdate(optionsUpdate) {
      this.needUpdate = true;
      this.needOptionsUpdate = optionsUpdate;
      this.$nextTick(() => {
        this.update();
      });
    },
    update() {
      // Prevent multiple re-draws per single data update ( because there are redundant watches )
      if (!this.needUpdate) {
        return;
      }
      this.needUpdate = false;
      log.info('DbDygraphs: updating data ...');
      this.graph.updateOptions({ file: this.data });
      if (this.needOptionsUpdate) {
        this.graph.updateOptions(this.graphOptions);
        this.needOptionsUpdate = false;
      }
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
      let html = this.graph.getLabels()[0] + ': ' + data.xHTML;
      data.series.forEach(function(series) {
        if (!series.isVisible) return;
        let labeledData = series.labelHTML + ': ' + series.yHTML;
        if (series.isHighlighted) {
          labeledData = '<b>' + labeledData + '</b>';
        }
        html += '<br>' + series.dashHTML + ' ' + labeledData;
      });
      return html;
    },
    handleClick: function(e, x, points) {
      log.debug(`handleClick: x:${x}, points:${JSON.stringify(points)}`);
      this.$emit('db-event', {
        type: 'click',
        x: x,
        points: points
      });
    },
    handleZoom: function(minDate, maxDate, yRanges) {
      log.debug('handleZoom: minDate:' + minDate + ', maxDate:' + maxDate + ', yRanges:' + yRanges);
      this.$emit('db-event', {
        type: 'zoom',
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
  border-radius: 2px;
  box-shadow: 2px 2px 2px #888;
  pointer-events: none;
  width: 190px;
  font-size: 12px;
  position: relative;
}
</style>
