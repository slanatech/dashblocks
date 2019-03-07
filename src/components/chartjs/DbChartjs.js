import Chart from 'chart.js';
import Colors from '../dbcolors';

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
      chartId: {
        default: chartId,
        type: String
      },
      width: {
        default: 400,
        type: Number
      },
      height: {
        default: 150,
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
      wspec: Object,
      wdata: Object
    },

    data() {
      return {
        _chart: null,
        _plugins: this.plugins,
        chartdata: null,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          onClick: (evt, item) => {
            this.onClick(evt, item);
          }
        }
      };
    },

    mounted() {
      this.chartdata = JSON.parse(JSON.stringify(this.wdata));
      // TEMP TODO Optimize
      // Set default colors if not specified
      let dsidx = 0;
      for (let ds of this.chartdata.datasets) {
        if (!('backgroundColor' in ds)) {
          ds.backgroundColor = Colors.defaultColors[dsidx];
        }
        dsidx++;
      }
      this.renderChart(this.chartdata, this.options);
    },

    methods: {
      addPlugin(plugin) {
        this.$data._plugins.push(plugin);
      },
      generateLegend() {
        if (this.$data._chart) {
          return this.$data._chart.generateLegend();
        }
      },
      renderChart(data, options) {
        if (this.$data._chart) this.$data._chart.destroy();
        this.$data._chart = new Chart(this.$refs.canvas.getContext('2d'), {
          type: chartType,
          data: data,
          options: options,
          plugins: this.$data._plugins
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
