<template>
  <div><db-dashboard v-if="ready" :dbspec="dbspec" :dbdata="dbdata"> </db-dashboard></div>
</template>

<script>
import DbDashboard from '@/components/DbDashboard.vue';
import DbData from '../dbdata';
import dashSixSpec from '../dashboards/dashsix.json';
import TestData from '../data/testdata';

export default {
  name: 'DashSix',
  components: {
    DbDashboard
  },
  data() {
    return {
      dbdata: new DbData(),
      dbspec: dashSixSpec,
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
