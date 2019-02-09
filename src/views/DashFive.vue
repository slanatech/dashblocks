<template>
  <div>
    <db-dashboard v-if="ready" :dbspec="dbspec" :dbdata="dbdata"> </db-dashboard>
    <div @click="handleInc">INC</div>
  </div>
</template>

<script>
import DbDashboard from '@/components/DbDashboard.vue';
import DbData from '../dbdata';
import dashFourSpec from '../dashboards/dashfive.json';

export default {
  name: 'DashFour',
  components: {
    DbDashboard
  },
  data() {
    return {
      dbdata: new DbData(),
      dbspec: dashFourSpec,
      ready: false
    };
  },
  created() {
    // Initialize dashboard data
    this.initialize();
    this.ready = true;
  },
  methods: {
    initialize: function() {
      // Set data for our widgets
      this.dbdata.setWData('w0', {
        data: [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 10]
      });
    },
    handleInc: function() {
      // Update data in our widgets
      //console.log('Changing data ...')
      this.dbdata['w0'].data = [100, 2, 3, 4, 5, 6, 5, 4, 3, 2, 10];
      this.dbdata['updated'] = 't' + Date.now();
      //console.log('Changing nested data ...')
      this.dbdata['w0']['updated'] = 't' + Date.now();
      //this.dbdata.setUpdated('w0');
      //this.dbdata['w0'] = Object.assign({},this.dbdata['w0'],{_updated: Date.now()});
      //this.dbdata['w0'] = {};
    }
  }
};
</script>
