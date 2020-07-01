<template>
  <db-dashboard :dbspec="dbspec" :dbdata="dbdata" :dark="isDark"> </db-dashboard>
</template>

<script>
import DbDashboard from '@/components/dashboard/DbDashboard.vue';
import DbData from '@/components/dbdata';
import dashSpec from '@/demo/dashboards/ChartJsShowcase.json';
import { demodashboard } from '@/demo/mixins/demodashboard';

export default {
  name: 'DashFour',
  components: {
    DbDashboard
  },
  mixins: [demodashboard],
  data() {
    return {
      dbdata: new DbData(),
      dbspec: dashSpec
    };
  },
  created() {
    this.$store.dispatch('setDashboardSpec', { spec: JSON.stringify(this.dbspec, null, '\t') });
    // Initialize dashboard data
    this.initialize();
  },
  methods: {
    initialize: function() {
      let dataOneSeries = {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
          {
            label: 'Data One',
            data: [10, 20, 30, 100]
          }
        ]
      };

      let dataFunnel = {
        labels: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'], //, 'P7', 'P8','P9', 'P10', 'P11', 'P12','P13', 'P14', 'P15', 'P16'],
        datasets: [
          {
            label: 'Data One',
            data: [20, 80, 70, 50, 40, 30]
          }
        ]
      };

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

      let dataBubbleTwoSeries = {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
          {
            label: 'Data One',
            data: [
              { x: 10, y: 20, r: 10 },
              { x: 20, y: 20, r: 20 },
              { x: 30, y: 30, r: 30 },
              { x: 100, y: 200, r: 100 }
            ]
          },
          {
            label: 'Data Two',
            data: [
              { x: 30, y: 50, r: 50 },
              { x: 60, y: 60, r: 60 },
              { x: 80, y: 70, r: 70 },
              { x: 100, y: 200, r: 10 }
            ]
          }
        ]
      };

      let dataScatterTwoSeries = {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
          {
            label: 'Data One',
            data: [
              { x: 10, y: 20 },
              { x: 20, y: 20 },
              { x: 30, y: 30 },
              { x: 100, y: 200 }
            ]
          },
          {
            label: 'Data Two',
            data: [
              { x: 30, y: 50 },
              { x: 60, y: 60 },
              { x: 80, y: 70 },
              { x: 100, y: 200 }
            ]
          }
        ]
      };

      let d1 = JSON.parse(JSON.stringify(dataTwoSeries));
      let d2 = JSON.parse(JSON.stringify(dataOneSeries));
      let d3 = JSON.parse(JSON.stringify(dataTwoSeries));
      let d4 = JSON.parse(JSON.stringify(dataOneSeries));
      let d5 = JSON.parse(JSON.stringify(dataTwoSeries));
      let d6 = JSON.parse(JSON.stringify(dataOneSeries));
      let d7 = JSON.parse(JSON.stringify(dataTwoSeries));
      let d8 = JSON.parse(JSON.stringify(dataTwoSeries));
      let d9 = JSON.parse(JSON.stringify(dataBubbleTwoSeries));
      let d10 = JSON.parse(JSON.stringify(dataScatterTwoSeries));

      this.dbdata.setWData('w1', { data: d1 });
      this.dbdata.setWData('w2', { data: d2 });
      this.dbdata.setWData('w3', { data: d3 });
      this.dbdata.setWData('w4', { data: d4 });
      this.dbdata.setWData('w5', { data: d5 });
      this.dbdata.setWData('w6', { data: d6 });
      this.dbdata.setWData('w7', { data: d7 });
      this.dbdata.setWData('w8', { data: d8 });
      this.dbdata.setWData('w9', { data: d9 });
      this.dbdata.setWData('w10', { data: d10 });
      this.dbdata.setWData('w11', { data: dataFunnel });

      //let bw = 1;
      // Dynamic updates
      setInterval(
        function(comp) {
          let v = comp.dbdata['w2'].data.datasets[0].data[0];
          comp.dbdata['w2'].data.datasets[0].data[0] = v + 10;
          // We can add dynamically any prop to dataset entry ...
          //comp.dbdata['w2'].data.datasets[0].borderWidth = bw++;
          comp.dbdata.touch('w2');
        },
        1000,
        this
      );
    }
  }
};
</script>
