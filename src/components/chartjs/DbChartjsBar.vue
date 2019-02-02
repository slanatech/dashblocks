<script>
import { Bar } from 'vue-chartjs';
export default {
  extends: Bar,
  data() {
    return {
      that: this,
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
  props: {
    wspec: Object,
    wdata: Object,
    height: {
      default: 150,
      type: Number
    }
  },
  mounted() {
    this.chartdata = JSON.parse(JSON.stringify(this.wdata));
    this.renderChart(this.chartdata, this.options);
  },
  watch: {
    wdata: {
      handler(newVal) {
        //console.log('wdata prop changed: ', newVal, ' | was: ', oldVal);
        //this.renderChart(newVal, this.options);
        this.chartdata = JSON.parse(JSON.stringify(newVal));
        //console.log(`chartdata: ${JSON.stringify(this.chartdata)}`);
        this.renderChart(this.chartdata, this.options);
      },
      deep: true
    }
  },
  methods: {
    onClick: function(/*evt,item*/) {
      //let activeEl = this.$data._chart.getElementAtEvent(evt);
      /*
        var firstPoint = myChart.getElementAtEvent(evt)[0];
        if (firstPoint) {
            var label = myChart.data.labels[firstPoint._index];
            var value = myChart.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
        }
       */
      //console.log('On click! Label: ');
      // TODO Fire event
    }
  }
};
</script>
