<template>
  <div><db-dashboard v-if="ready" :dbspec="dbspec" :dbdata="dbdata" :dark="isDark"> </db-dashboard></div>
</template>

<script>
import DbDashboard from '@/components/dashboard/DbDashboard.vue';
import DbData from '@/components/dbdata';
import TestData from '@/demo/data/testdata';
import { demodashboard } from '@/demo/mixins/demodashboard';

export default {
  name: 'DygraphsDynamic',
  components: {
    DbDashboard
  },
  mixins: [demodashboard],
  data() {
    return {
      dbdata: new DbData(),
      dbspec: {
        layout: {
          type: 'grid'
        },
        widgets: [
          {
            id: 'w1',
            type: 'DbDygraphsBar',
            cspan: 16,
            height: 250,
            properties: {
              options: {
                stackedGraph: true
              }
            }
          },
          {
            id: 'w2',
            type: 'DbDygraphsLine',
            cspan: 16,
            height: 250,
            properties: {
              options: {
                stackedGraph: false,
                title: 'Random value Chart',
                ylabel: 'Probability',
                labels: ['Date', 'AAA', 'BBB'],
                legend: 'always'
              }
            }
          },
          {
            id: 'w3',
            type: 'DbDygraphsLine',
            cspan: 16,
            height: 250,
            properties: {
              options: {
                stackedGraph: false
              }
            }
          }
        ]
      },
      testData: new TestData(),
      ready: false
    };
  },
  mounted() {
    this.$store.dispatch('setDashboardSpec', { spec: JSON.stringify(this.dbspec, null, '\t') });
    // Initialize dashboard data
    this.initialize();
    this.ready = true;
  },
  methods: {
    initialize: function() {
      this.testData.init();

      let dthData = [];
      let dthData2 = [];
      let dthData3 = [];
      let sTS = Date.now() - 100 * 3600 * 1000;

      for (let i = 0; i < 100; i++) {
        let cTs = sTS + i * 3600 * 1000;
        let d = new Date(cTs);
        let r = Math.random();
        dthData.push([d, r, r + 0.5]);
        dthData2.push([d, Math.random(), Math.random()]);
        dthData3.push(Math.random());
      }

      this.dbdata.setWData('w1', {
        data: dthData
      });

      this.dbdata.setWData('w2', {
        data: dthData2
      });

      this.dbdata.setWData('w3', {
        data: dthData3
      });

      let cntr = 101;

      setInterval(
        function(comp) {
          // Update first half of the values in the first chart
          for (let i = 0; i < 50; i++) {
            comp.dbdata['w1'].data[i][1] = Math.random();
            //comp.dbdata['w3'].data[i] = Math.random();
          }
          comp.dbdata.touch('w1');
          //comp.dbdata.touch('w3');

          let newData3 = [];
          for (let i = 0; i < 100; i++) {
            newData3.push(Math.random());
          }

          comp.dbdata.setWData('w3', {
            data: newData3
          });

          // Add new value to second chart
          let x = new Date(sTS + cntr * 3600 * 1000);
          cntr++;
          comp.dbdata['w2'].data.shift();
          comp.dbdata['w2'].data.push([x, Math.random(), Math.random()]);
          comp.dbdata.touch('w2');
        },
        1000,
        this
      );
    }
  }
};
</script>
