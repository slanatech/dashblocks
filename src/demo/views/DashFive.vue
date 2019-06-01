<template>
  <div>
    <db-dashboard v-if="ready" :dbspec="dbspec" :dbdata="dbdata" :dark="isDark"> </db-dashboard>
    <div @click="handleInc">INC</div>
    <div @click="handleInc2">INC-2</div>
    <div @click="handleIncStroke">INC-STROKE</div>
  </div>
</template>

<script>
import DbDashboard from '@/components/dashboard/DbDashboard.vue';
import DbData from '@/components/dbdata';
import dashFourSpec from '@/demo/dashboards/dashfive.json';
import { demodashboard } from '@/demo/mixins/demodashboard';

export default {
  name: 'DashFive',
  components: {
    DbDashboard
  },
  mixins: [demodashboard],
  data() {
    return {
      dbdata: new DbData(),
      dbspec: dashFourSpec,
      ready: false
    };
  },
  created() {
    this.$store.dispatch('setDashboardSpec', { spec: JSON.stringify(this.dbspec, null, '\t') });
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
      this.dbdata.setWData('w4', {
        value: 56500,
        trend: [10, 2, 3, 4, 5, 6, 5, 4, 3, 2, 10, 10, 2, 3, 4, 5, 6, 5, 4, 3, 2, 10, 10, 2, 3, 4, 5, 6, 5, 4, 3, 2, 10]
      });
      this.dbdata.setWData('w5', {
        value: 520
      });
      this.dbdata.setWData('w6', {
        value: 5200,
        trend: [10, 2, 3, 4, 5, 6, 5, 4, 3, 2, 10, 4, 3, 2, 10]
      });
      this.dbdata.setWData('w7', {
        data: [
          {
            y: [10, 2, 3, 4, 5, 6, 5, 4, 3, 2, 10, 10, 4, 3, 2, 10, 10, 2, 3, 4, 5, 6, 5, 4, 3, 2, 10],
            type: 'bar'
          }
        ]
      });
      this.dbdata.setWData('w8', {
        data: [
          {
            y: [10, 2, 3, 4, 5, 6, 5, 4, 3, 2, 10, 10, 4, 3, 2, 10, 10, 2, 3, 4, 5, 6, 5, 4]
          },
          {
            y: [10, 12, 13, 14, 15, 16, 15, 14, 13, 12, 20, 20, 14, 13, 12, 20, 20, 12, 13, 14, 15, 16, 15, 14]
          }
        ]
      });
      this.dbdata.setWData('w9', {
        data: [
          {
            values: [19, 26, 55],
            labels: ['A', 'B', 'C']
          }
        ]
      });

      let dthData = [];
      let sTS = Date.now() - 100 * 3600 * 1000;
      for (let i = 0; i < 100; i++) {
        let cTs = sTS + i * 3600 * 1000;
        dthData.push([new Date(cTs), i]);
      }

      this.dbdata.setWData('wa', {
        data: dthData
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
      // This works
      this.dbdata.setWData('w4', {
        value: 15555,
        trend: [40, 2, 3, 4, 5, 6, 5, 4, 3, 2, 50]
      });
      // This works
      this.dbdata['w4'].value = 55555;
      // This does not work, as expected
      // TODO - would need to call dbdata.update here ?
      //this.dbdata['w4'].trend[0] = 100;

      /*
      this.dbdata.setWData('w7', {
        data: [
          {
            x: ['A', 'B', 'C', 'D', 'E'],
            y: [10, 24, 3, 2, 10]
          }
        ]
      });
      this.dbdata.setWData('w8', {
        data: [
          {
            x: ['A', 'B', 'C', 'D', 'E'],
            y: [20, 124, 13, 12, 110]
          }
        ]
      });
      */
      this.dbdata['w8'].data[0].y[0] = 100;
      this.dbdata.touch('w8');
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
