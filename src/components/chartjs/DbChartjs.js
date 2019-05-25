import Chart from 'chart.js';
// eslint-disable-next-line
import ChartjsPluginLabels from 'chartjs-plugin-labels';
import dbColors from '../dbcolors';
import dbUtils from '../dbutils';
import log from '../log';
import merge from 'deepmerge';

// TODO Issue - does not resize properly in Firefox

export function generateChart(chartId, chartType) {
  return {
    render: function(createElement) {
      return createElement(
        'div',
        {
          style: this.styles,
          class: this.cssClasses
        },
        [
          createElement('canvas', {
            attrs: {
              id: this.chartId,
              width: this.width,
              height: this.height
            },
            ref: 'canvas'
          })
        ]
      );
    },

    props: {
      _updated: {
        type: Number,
        default: 0
      },
      chartId: {
        default: chartId,
        type: String
      },
      width: {
        default: 100,
        type: Number
      },
      height: {
        default: 100,
        type: Number
      },
      cssClasses: {
        type: String,
        default: ''
      },
      styles: {
        type: Object
      },
      plugins: {
        type: Array,
        default() {
          return [];
        }
      },
      dark: {
        default: false,
        type: Boolean
      },
      data: Object,
      options: {
        type: Object
      }
    },

    data() {
      return {
        _chart: null,
        _plugins: this.plugins,
        chartOptions: {},
        chartData: {},
        // TEMP TODO Computed
        defaultColors: dbColors.getColors(this.dark)
      };
    },

    computed: {
      defaultOptions: function() {
        return {
          responsive: true,
          maintainAspectRatio: false,
          onClick: (evt, item) => {
            this.onClick(evt, item);
          },
          legend: {
            labels: {
              fontColor: this.dark ? '#FFF' : '#000' // TODO Get from dbcolors
            }
          }
        };
      },
      defaultColors: function() {
        return dbColors.getColors(this.dark);
      }
    },

    watch: {
      _updated: function() {
        log.debug('DbChartjs: _updated prop changed');
        this.scheduleUpdate(true, false);
      },
      data: {
        handler() {
          log.debug('DbChartjs: data prop changed');
          this.scheduleUpdate(true, false);
        },
        deep: true
      },
      options: {
        handler() {
          log.debug('DbChartjs: options prop changed');
          this.scheduleUpdate(false, true);
        },
        deep: true
      },
      dark: function() {
        log.debug('DbChartjs: dark prop changed');
        this.scheduleUpdate(false, true);
      }
    },

    mounted() {
      // Make a full copy of data:
      // Chartjs augments datasets with _meta data, which may lead to watch loop
      // as well as, updating properties passed to component is not a good idea
      this.chartData = JSON.parse(JSON.stringify(this.data));
      this.preProcess(true);
      this.renderChart(this.chartData, this.chartOptions);
    },

    methods: {
      scheduleUpdate(updateData, updateOptions) {
        log.debug('DbChartjs: schedule update');
        this.$nextTick(() => {
          if (updateData) {
            this.updateData();
          }
          this.preProcess(updateOptions);
          if (this.$data._chart) {
            if (updateOptions) {
              this.$data._chart.options = this.chartOptions;
            }
            this.$data._chart.update();
          }
        });
      },

      preProcess(updateOptions) {
        if (updateOptions) {
          this.setupOptions();
        }

        // Process datasets: set default colors if not specified
        // For chart.js, need to set colors in datasets  - see
        // https://github.com/chartjs/Chart.js/issues/815
        if (!this.chartData || !('datasets' in this.chartData) || !Array.isArray(this.chartData.datasets)) {
          return;
        }

        for (let idx = 0; idx < this.chartData.datasets.length; idx++) {
          this.setupDataset(this.chartData.datasets[idx], idx);
        }
      },

      updateData() {
        if (!this.data) {
          return;
        }

        if ('labels' in this.data) {
          this.chartData.labels = this.data.labels;
        }

        if (!('datasets' in this.data) || !Array.isArray(this.data.datasets)) {
          this.chartData.datasets = [];
          return;
        }

        for (let idx = 0; idx < this.data.datasets.length; idx++) {
          let ds = this.data.datasets[idx];
          if (idx < this.chartData.datasets.length) {
            // Preserve _meta which is generated and maintained by chartjs
            /// Merge in new data / props passed via data prop
            let merged = Object.assign({ _meta: this.chartData.datasets[idx]._meta }, merge({}, ds));
            this.chartData.datasets[idx] = merged;
            //this.chartData.datasets[idx].data = merged; //merge([],ds.data); // ???
            //this.chartData.datasets[idx].label = ds.label;
          } else {
            // Adding new dataset dynamically - setup it once
            this.chartData.datasets.push(merge({}, ds));
            this.setupDataset(this.chartData.datasets[idx], idx);
          }
        }
      },

      // Set params and colors for dataset, if not explicitly specified
      setupDataset(ds, idx) {
        if ('borderColor' in ds || 'backgroundColor' in ds) {
          return; // Colors set in dataset
        }
        // TODO Dark/Light switch - make sure colors are updated when we set them, and not updated when passed in options
        // TODO Use meta key: _db
        // Depending on chart type
        if (['pie-chart', 'doughnut-chart', 'polar-chart'].includes(this.chartId)) {
          ds.borderWidth = 1; //ds.borderWidth || 0;
          //ds.borderColor = "rgba(0, 0, 0, 0.2)";
          ds.borderColor = 'rgba(255, 255, 255, 0.2)';
          //ds.segmentStrokeWidth = 20;
          //ds.segmentStrokeColor = "rgba(255, 255, 255, 0)";
          ds.backgroundColor = this.defaultColors.map(x => dbColors.hex2RGBA(x, 0.5));
        } else {
          ds.borderWidth = ds.borderWidth || 1;
          ds.borderColor = this.defaultColors[idx];
          ds.backgroundColor = dbColors.hex2RGBA(this.defaultColors[idx], 0.5);
        }
      },

      setupOptions() {
        log.debug('DbChartjs: setting up options');

        let opts = null;

        if (['radar-chart', 'polar-chart'].includes(this.chartId)) {
          opts = merge.all([
            this.defaultOptions,
            {
              scale: {
                angleLines: {
                  lineWidth: 1,
                  color: this.dark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'
                },
                gridLines: {
                  color: this.dark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                  zeroLineColor: '#FFF'
                },
                ticks: {
                  showLabelBackdrop: !this.dark,
                  fontColor: this.getAxesColor()
                }
              }
            },
            this.options || {} // What's passed in options will override defaults
          ]);
        } else if (['pie-chart', 'doughnut-chart'].includes(this.chartId)) {
          opts = merge(this.defaultOptions, this.options || {});
          // Enables custom label generation
          //utils.ensureProperty(opts, 'legend', {});
          //utils.ensureProperty(opts.legend, 'labels', {});
          //utils.ensureProperty(opts.legend.labels, 'generateLabels', this.generatePieLabels);
        } else {
          opts = merge(this.defaultOptions, this.options || {});
          dbUtils.ensureProperty(opts, 'scales', {});
          dbUtils.ensureProperty(opts.scales, 'xAxes', [{}]);
          opts.scales.xAxes = opts.scales.xAxes.map(x => this.setupScale(x));
          dbUtils.ensureProperty(opts.scales, 'yAxes', [{}]);
          opts.scales.yAxes = opts.scales.yAxes.map(x => this.setupScale(x));
        }

        this.chartOptions = opts;
      },

      setupScale(axe) {
        return merge(
          {
            gridLines: {
              color: this.dark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
              zeroLineColor: '#EEE'
            },
            ticks: {
              fontColor: this.getAxesColor()
            }
          },
          axe
        );
      },

      /*
      scalesSSS: {
        // TODO Only set up for specific chart types !
        xAxes: [
          {
            gridLines: {
              color: 'rgba(255, 255, 255, 0.1)',
              zeroLineColor: '#EEE'
            },
            ticks: {
              fontColor: this.getAxesColor()
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              color: 'rgba(255, 255, 255, 0.2)'
            },
            ticks: {
              fontColor: this.getAxesColor()
            }
          }
        ]
      }
       */

      getAxesColor() {
        return this.dark ? '#FFF' : '#666';
      },
      addPlugin(plugin) {
        this.$data._plugins.push(plugin);
      },
      generateLegend() {
        if (this.$data._chart) {
          return this.$data._chart.generateLegend();
        }
      },
      // TODO Custom labels generation - consider if needs to be used
      generateLabels: function(chart) {
        var data = chart.data;
        if (data.labels.length && data.datasets.length) {
          return data.labels.map(function(label, i) {
            var meta = chart.getDatasetMeta(0);
            var ds = data.datasets[0];
            var arc = meta.data[i];
            var custom = (arc && arc.custom) || {};
            var getValueAtIndexOrDefault = Chart.helpers.getValueAtIndexOrDefault;
            var arcOpts = chart.options.elements.arc;
            var fill = custom.backgroundColor
              ? custom.backgroundColor
              : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
            var stroke = custom.borderColor
              ? custom.borderColor
              : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
            var bw = custom.borderWidth
              ? custom.borderWidth
              : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);
            return {
              // And finally :
              text: ds.data[i] + ' ' + label,
              fillStyle: fill,
              strokeStyle: stroke,
              lineWidth: bw,
              hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
              index: i
            };
          });
        }
        return [];
      },
      renderChart(data, options) {
        this.$nextTick(() => {
          if (this.$data._chart) this.$data._chart.destroy();
          this.$data._chart = new Chart(this.$refs.canvas.getContext('2d'), {
            type: chartType,
            data: data,
            options: options,
            plugins: this.$data._plugins
          });
        });
      }
    },
    beforeDestroy() {
      if (this.$data._chart) {
        this.$data._chart.destroy();
      }
    }
  };
}

export const DbChartjsBar = generateChart('bar-chart', 'bar');
export const DbChartjsHorizontalBar = generateChart('horizontalbar-chart', 'horizontalBar');
export const DbChartjsDoughnut = generateChart('doughnut-chart', 'doughnut');
export const DbChartjsLine = generateChart('line-chart', 'line');
export const DbChartjsPie = generateChart('pie-chart', 'pie');
export const DbChartjsPolarArea = generateChart('polar-chart', 'polarArea');
export const DbChartjsRadar = generateChart('radar-chart', 'radar');
export const DbChartjsBubble = generateChart('bubble-chart', 'bubble');
export const DbChartjsScatter = generateChart('scatter-chart', 'scatter');

export default {
  DbChartjsBar,
  DbChartjsHorizontalBar,
  DbChartjsDoughnut,
  DbChartjsLine,
  DbChartjsPie,
  DbChartjsPolarArea,
  DbChartjsRadar,
  DbChartjsBubble,
  DbChartjsScatter
};

// Process Axes
/*
if (isRadial) {
  dbUtils.ensureProperty(opts, 'scale', {});
  dbUtils.ensureProperty(opts.scale, 'angleLines', {});
  dbUtils.ensureProperty(opts.scale.angleLines, 'lineWidth', 1);
  dbUtils.ensureProperty(
    opts.scale.angleLines,
    'color',
    this.dark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'
  );

  dbUtils.ensureProperty(opts.scale, 'gridLines', {});
  dbUtils.ensureProperty(
    opts.scale.gridLines,
    'color',
    this.dark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'
  );

  dbUtils.ensureProperty(opts.scale, 'ticks', {});
  dbUtils.ensureProperty(opts.scale.ticks, 'showLabelBackdrop', !this.dark);
  dbUtils.ensureProperty(opts.scale.ticks, 'fontColor', this.getAxesColor());
} else {
  // TODO setup
}
*/
