<template>
  <div><db-dashboard v-if="ready" :dbspec="dbspec" :dbdata="dbdata"> </db-dashboard></div>
</template>

<script>
import DbDashboard from '@/components/DbDashboard.vue';
import DbData from '../dbdata';
import TestData from '../data/testdata';

export default {
  name: 'DygraphsDynamic',
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
            id: '1',
            name: 'w1',
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
            id: '2',
            name: 'w2',
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
          }
        ]
      },
      testData: new TestData(),
      ready: false
    };
  },
  mounted() {
    // Initialize dashboard data
    this.initialize();
    this.ready = true;
  },
  methods: {
    initialize: function() {
      this.testData.init();

      let dthData = [];
      let dthData2 = [];
      let sTS = Date.now() - 100 * 3600 * 1000;

      for (let i = 0; i < 100; i++) {
        let cTs = sTS + i * 3600 * 1000;
        let d = new Date(cTs);
        let r = Math.random();
        dthData.push([d, r, r + 0.5]);
        dthData2.push([d, Math.random(), Math.random()]);
      }

      this.dbdata.setWData('w1', {
        data: dthData
      });

      this.dbdata.setWData('w2', {
        data: dthData2
      });

      let cntr = 101;

      setInterval(
        function(comp) {
          // Update first half of the values in the first chart
          for (let i = 0; i < 50; i++) {
            comp.dbdata['w1'].data[i][1] = Math.random();
          }
          comp.dbdata.touch('w1');

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
