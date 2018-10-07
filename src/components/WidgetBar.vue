<script>
import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,
  data() {
    return {
      datacollection: {
        labels: ['January', 'February'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, -20]
          }
        ]
      }
    };
  },
  mounted() {
    this.renderChart(this.datacollection, { responsive: true, maintainAspectRatio: false });
  }
};
</script>
