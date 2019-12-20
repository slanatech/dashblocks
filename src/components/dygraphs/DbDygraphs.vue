<template>
  <div ref="container" class="db-dygraphs" />
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
      needOptionsUpdate: false
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
        clickCallback: this.handleClick
      };
    }
  },
  mounted() {
    import('dygraphs').then(module => {
      log.info('dygraphs: imported');
      Dygraphs = module.default;
      this.$nextTick(() => {
        this.render();
      });
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
      this.graph = new Dygraphs(this.$refs.container, this.getData(), this.graphOptions);
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
      if (this.needOptionsUpdate) {
        log.info('DbDygraphs: updating options ...');
        this.graph.updateOptions(this.graphOptions);
        this.needOptionsUpdate = false;
      }
      log.info('DbDygraphs: updating data ...');
      this.graph.updateOptions({ file: this.getData() });
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
