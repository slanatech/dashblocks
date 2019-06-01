<template>
  <div><db-dashboard v-if="ready" :dbspec="dbspec" :dbdata="dbdata" :dark="isDark"> </db-dashboard></div>
</template>

<script>
import DbDashboard from '@/components/dashboard/DbDashboard.vue';
import DbData from '@/components/dbdata';
import dashSixSpec from '@/demo/dashboards/dashsix.json';
import TestData from '@/demo/data/testdata';
import { demodashboard } from '@/demo/mixins/demodashboard';

export default {
  name: 'DashSix',
  components: {
    DbDashboard
  },
  mixins: [demodashboard],
  data() {
    return {
      dbdata: new DbData(),
      dbspec: dashSixSpec,
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
      let dthDataS = [];
      let dthDataS1 = [];
      let sTS = Date.now() - 100 * 3600 * 1000;

      for (let i = 0; i < 100; i++) {
        let cTs = sTS + i * 3600 * 1000;
        let d = new Date(cTs);
        let r = Math.random();
        dthData.push([d, r, r + 0.5]);
        dthData2.push([d, Math.random(), Math.random()]);
        dthDataS.push([d, r]);
        dthDataS1.push(r);
      }

      this.dbdata.setWData('w1', {
        data: dthData
      });

      this.dbdata.setWData('w2', {
        data: dthData2
      });

      this.dbdata.setWData('w6', {
        data: dthData2
      });

      this.dbdata.setWData('w3', {
        //data: [[1,1],[2,2],[3,3],[4,3],[5,2]]
        data: dthDataS
      });

      this.dbdata.setWData('w4', {
        //data: [[1,1],[2,2],[3,3],[4,3],[5,2]]
        data: dthDataS
      });

      this.dbdata.setWData('w5', {
        data: dthDataS1
      });
    }
  }
};
</script>
