<template>
  <div ref="container" :class="elementClass" />
</template>
<script>
import dbColors from '../dbcolors';
import { dbStdProps } from '../mixins/dbstdprops';
import 'dygraphs/dist/dygraph.css';
import log from '../log';
let Dygraphs = null;
export default {
  name: 'DbDygraphs',
  mixins: [dbStdProps],
  props: {
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
      needOptionsUpdate: false,
      optionsChanged: false
    };
  },
  computed: {
    // Augment passed options with defaults for Dygraphs
    graphOptions: {
      get() {
        // filter out proprietary options
        return Object.assign({}, this.defaultOptions, this.options);
      },
      set() {
        /*noop*/
      }
    },
    defaultOptions: function() {
      return {
        colors: dbColors.getColors(this.dark, this.colorScheme),
        animatedZooms: true,
        labelsDiv: this.$refs.dbdylabels,
        legend: 'follow',
        legendFormatter: this.legendFormatter,
        zoomCallback: this.handleZoom,
        clickCallback: this.handleClick,
        highlightCallback: this.handleHighlight,
        unhighlightCallback: this.handleUnHighlight,
        highlightSeriesBackgroundAlpha: this.dark ? 0.4 : 0.5,
        highlightSeriesBackgroundColor: this.dark ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
        axisLineColor: this.dark ? 'rgba(255, 255, 255, 0.3)' : 'rgb(0, 0, 0, 0.3)'
      };
    },
    elementClass: function() {
      return this.dark ? 'db-dygraphs db-dark' : 'db-dygraphs';
    }
  },
  mounted() {
    import('dygraphs').then(module => {
      log.info('dygraphs: imported');
      Dygraphs = module.default;
      //  note: can use Dygraphs.defaultInteractionModel
      this.$nextTick(() => {
        this.render();
      });
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
    },
    options: {
      handler() {
        this.optionsChanged = true;
        this.scheduleUpdate();
      },
      deep: true
    },
    dark: function() {
      this.optionsChanged = true;
      this.scheduleUpdate();
    },
    colorScheme: function() {
      this.optionsChanged = true;
      this.scheduleUpdate();
    }
  },
  methods: {
    render() {
      this.graph = new Dygraphs(this.$refs.container, this.getData(), this.graphOptions);
    },
    getDygraphs() {
      return this.graph;
    },
    getData() {
      // pre-process data if needed
      if (!Array.isArray(this.data)) {
        return this.data;
      }
      if (this.data.length <= 0) {
        return this.data;
      }
      if (Array.isArray(this.data[0])) {
        return this.data;
      }
      let idx = 0;
      return this.data.map(x => [idx++, x]);
    },
    scheduleUpdate() {
      this.needUpdate = true;
      this.$nextTick(() => {
        this.update();
      });
    },
    update() {
      // Prevent multiple re-draws per single data update ( because there are redundant watches )
      if (!this.graph || !this.needUpdate) {
        return;
      }
      this.needUpdate = false;
      log.info('DbDygraphs: updating ...');
      if (this.optionsChanged) {
        this.optionsChanged = false;
        this.graph.updateOptions(Object.assign({}, this.graphOptions, { file: this.getData() }));
      } else {
        this.graph.updateOptions({ file: this.getData() });
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
    },
    handleHighlight: function(event, x, points, row, seriesName) {
      log.debug('handleHighlight: x:' + x + ', points:' + points + ', row:' + row + ', seriesName: ' + seriesName);
      this.$emit('db-event', {
        type: 'highlight',
        x: x,
        points: points,
        row: row,
        seriesName: seriesName
      });
    },
    handleUnHighlight: function(event) {
      log.debug('handleUnHighlight');
      this.$emit('db-event', {
        type: 'unhighlight'
      });
    }
  }
};
</script>
