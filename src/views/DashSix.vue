<template>
  <div><db-dashboard v-if="ready" :dbspec="dbspec" :dbdata="dbdata" :dark="isDark"> </db-dashboard></div>
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
  computed: {
    isDark() {
      return this.$store.state.switchDark;
    }
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
    }
  }
};
</script>
