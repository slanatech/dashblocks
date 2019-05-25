<template>
  <div><db-dashboard v-if="ready" :dbspec="dbspec" :dbdata="dbdata" :dark="isDark"> </db-dashboard></div>
</template>

<script>
import DbDashboard from '@/components/dashboard/DbDashboard.vue';
import DbData from '../components/dbdata';

export default {
  name: 'DashboardFour',
  components: {
    DbDashboard
  },
  data() {
    return {
      dbdata: new DbData(),
      dbspec: {
        layout: {
          type: 'grid'
        },
        widgets: [
          {
            id: '2',
            name: 'w2',
            type: 'DbDygraphsBar',
            cspan: 16,
            height: 250,
            properties: {
              options: {
                stackedGraph: true,
                title: 'Traffic over time',
                ylabel: 'Requests, Mil.',
                labels: ['Date', 'Success', 'Error'],
                legend: 'always'
              }
            }
          },
          {
            id: '3',
            name: 'w3',
            type: 'DbChartjsPie',
            cspan: 4,
            height: 250
          },
          {
            id: '4',
            name: 'w4',
            type: 'DbChartjsPie',
            cspan: 4,
            height: 250
          },
          {
            id: '6',
            name: 'w6',
            type: 'DbChartjsHorizontalBar',
            cspan: 4,
            height: 250
          },
          {
            id: '7',
            name: 'w7',
            type: 'DbChartjsBar',
            cspan: 4,
            height: 250
          }
        ]
      },
      ready: false
    };
  },
  computed: {
    isDark() {
      return this.$store.state.switchDark;
    }
  },
  mounted() {
    this.$store.dispatch('setDashboardSpec', { spec: JSON.stringify(this.dbspec, null, '\t') });
    // Initialize dashboard data
    this.initialize();
    this.ready = true;
  },
  methods: {
    initialize: function() {
      let dthData2 = [];
      let sTS = Date.now() - 100 * 3600 * 1000;

      for (let i = 0; i < 100; i++) {
        let cTs = sTS + i * 3600 * 1000;
        let d = new Date(cTs);
        dthData2.push([d, Math.random(), Math.random()]);
      }

      this.dbdata.setWData('w2', {
        data: dthData2
      });

      let dataTwoSeries = {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
          {
            label: 'Data One',
            data: [10, 20, 30, 100]
          },
          {
            label: 'Data Two',
            data: [50, 10, 70, 11]
          }
        ]
      };

      this.dbdata.setWData('w3', {
        data: {
          labels: ['January', 'February', 'March', 'April'],
          datasets: [
            {
              label: 'Data One',
              data: [10, 20, 30, 100]
            }
          ]
        }
      });

      this.dbdata.setWData('w4', {
        data: {
          labels: ['January', 'February', 'March', 'April'],
          datasets: [
            {
              label: 'Data One',
              data: [50, 10, 67, 45]
            }
          ]
        }
      });

      this.dbdata.setWData('w6', {
        data: JSON.parse(JSON.stringify(dataTwoSeries))
      });
      this.dbdata.setWData('w7', {
        data: JSON.parse(JSON.stringify(dataTwoSeries))
      });
    },
    getRand: function(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
  }
};
</script>
