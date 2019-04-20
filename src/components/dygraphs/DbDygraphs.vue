<template>
  <div ref="container" class="db-dygraphs" />
</template>
<script>
import DbColors from '../dbcolors';
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
    }
  },
  data() {
    return {
      graph: null,
      needUpdate: false,
      defaultOptions: {
        colors: DbColors.defaultColors,
        animatedZooms: true,
        labelsDiv: this.$refs.dbdylabels,
        legend: 'follow',
        legendFormatter: this.legendFormatter,
        zoomCallback: this.handleZoom,
        clickCallback: this.handleClick
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
    _updated: function() {
      log.info('_updated prop changed');
      this.scheduleUpdate();
    },
    data: {
      handler() {
        log.info('data prop changed');
        this.scheduleUpdate();
      },
      deep: true
    }
  },
  methods: {
    render() {
      //console.log("Rendering Dygraph ...");
      this.graph = new Dygraphs(this.$refs.container, this.data, this.graphOptions);
    },
    scheduleUpdate() {
      this.needUpdate = true;
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
  border-radius: 4px;
  box-shadow: 4px 4px 4px #888;
  pointer-events: none;
  width: 190px;
  font-size: 12px;
  position: relative;
}
</style>
