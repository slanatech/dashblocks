<template>
  <div>
    <db-dashboard v-if="ready" :dbspec="dbspec" :dbdata="dbdata"> </db-dashboard>
    <div @click="handleInc">INC</div>
    <div @click="handleInc2">INC-2</div>
    <div @click="handleIncStroke">INC-STROKE</div>
  </div>
</template>

<script>
import DbDashboard from '@/components/DbDashboard.vue';
import DbData from '../dbdata';
import dashFourSpec from '../dashboards/dashfive.json';

export default {
  name: 'DashFive',
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
      this.dbdata.setWData('w1', {
        data: [0, 0, 0, 100, 80, 3, 4, 3, 2, 10]
      });
      this.dbdata.setWData('w2', {
        data: [
          { value: 0, title: '' },
          { value: 1, title: 'test1' },
          { value: 5, title: 'test5' },
          { value: 2, title: 'test2' },
          { value: 1, title: 'test1' }
        ]
      });
    },
    handleInc: function() {
      // Set completely new data for our widgets
      this.dbdata.setWData('w0', {
        data: [100, 80, 3, 4, 5, 6, 5, 4, 3, 2, 10]
      });
      this.dbdata.setWData('w1', {
        data: [0, 50, 50, 200, 80, 3, 4, 3, 2, 10]
      });
    },
    handleInc2: function() {
      this.dbdata['w0'].data[0] += 10;
      this.dbdata.setUpdated('w0');
    },
    handleIncStroke: function() {
      // Update dashboard spec - this works !
      this.dbspec.widgets[0].properties.strokeWidth += 2;
      // Cool! This works as well !
      //this.dbspec.widgets[0].cspan += 1;
    }
  }
};
</script>
