<template>
  <div><db-dashboard :dbspec="dbspec" :dbdata="dbdata"> </db-dashboard></div>
</template>

<script>
import DbDashboard from '@/components/DbDashboard.vue';
import DbData from '../dbdata';
import dashFourSpec from '../dashboards/dashfour.json';

export default {
  name: 'DashFour',
  components: {
    DbDashboard
  },
  data() {
    return {
      dbdata: new DbData(),
      dbspec: dashFourSpec
    };
  },
  created() {
    // Initialize dashboard data
    this.initialize();
  },
  methods: {
    initialize: function() {
      // Set data for our widgets
      this.dbdata.setWData('w1', {
        value: 10
      });
      this.dbdata.setWData('w2', {
        value: 20
      });
      this.dbdata.setWData('w3', {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
          {
            label: 'Data One',
            data: [10, 20, 30, 100]
          }
        ]
      });
      this.dbdata.setWData('w5', {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
          {
            label: 'Data One',
            data: [10, 20, 30, 100]
          }
        ]
      });
      this.dbdata.setWData('w6', {
        value: 25
      });
    }
  }
};
</script>
