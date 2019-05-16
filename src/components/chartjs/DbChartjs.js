import Chart from 'chart.js';
import dbColors from '../dbcolors';
import dbUtils from '../dbutils';
import log from '../log';

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
        // TEMP TODO Computed
        defaultColors: dbColors.getColors(this.dark),
        optionsB: {
          responsive: true,
          maintainAspectRatio: false,
          onClick: (evt, item) => {
            this.onClick(evt, item);
          }
        }
      };
    },

    computed: {
      // Augment passed options with defaults
      graphOptions: function() {
        return Object.assign({}, this.defaultOptions, this.options);
      },
      defaultOptions: function() {
        return {
          responsive: true,
          maintainAspectRatio: false,
          onClick: (evt, item) => {
            this.onClick(evt, item);
          }
          /*
          legendSSS: {
            labels: {
              fontColor: '#FFF'
            }
          },
          scaleRad: {
            // TODO Only set up for specific chart types !
            angleLines: {
              lineWidth: 1,
              color: 'rgba(255, 255, 255, 0.5)'
            },
            gridLines: {
              color: 'rgba(255, 255, 255, 0.5)',
              zeroLineColor: '#FFF'
            },
            ticks: {
              showLabelBackdrop: false, // TODO Have it false for Dark !
              fontColor: this.getAxesColor()
            }
          },
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
        };
      }
    },

    watch: {
      _updated: function() {
        log.debug('DbChartjs: _updated prop changed');
        this.scheduleUpdate(false);
      },
      data: {
        handler() {
          log.debug('DbChartjs: data prop changed');
          this.scheduleUpdate(false);
        },
        deep: true
      },
      dark: function() {
        this.scheduleUpdate(true);
      }
    },

    mounted() {
      this.preProcess();
      this.renderChart(this.data, this.chartOptions);
    },

    methods: {
      scheduleUpdate() {
        // TODO Support updating options
        log.debug('DbChartjs: schedule update');
        this.$nextTick(() => {
          this.preProcess();
          if (this.$data._chart) {
            this.$data._chart.options = this.chartOptions;
            this.$data._chart.update();
          }
        });
      },

      preProcess() {
        // Process options
        this.setupOptions();

        // Process datasets
        // Set default colors if not specified
        // For chart.js, need to set colors in datasets  - see
        // https://github.com/chartjs/Chart.js/issues/815
        if (!this.data || !('datasets' in this.data) || !Array.isArray(this.data.datasets)) {
          return;
        }

        for (let idx = 0; idx < this.data.datasets.length; idx++) {
          this.setupDataset(this.data.datasets[idx], idx);
        }
      },

      // Set params and colors for dataset, if not explicitly specified
      setupDataset(ds, idx) {
        if ('borderColor' in ds || 'backgroundColor' in ds) {
          return; // Colors set in dataset
        }
        // TODO Dark/Light switch - make sure colors are updated when we set them, not passed in options
        // Depending on chart type
        if (['pie-chart', 'doughnut-chart', 'polar-chart'].includes(this.chartId)) {
          ds.borderWidth = ds.borderWidth || 3;
          //ds.borderColor =  "rgba(0, 0, 0, 0.2)";
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
        let opts = Object.assign({}, this.defaultOptions, this.options);
        let isRadial = ['radar-chart', 'polar-chart'].includes(this.chartId);

        // Process Axes
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
        this.chartOptions = opts;
      },

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
