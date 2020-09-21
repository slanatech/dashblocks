<template>
  <div style="margin: 80px;">
    <db-dashboard v-if="ready" :dbspec="dbspec" :dbdata="dbdata" :dark="isDark" @db-event="handleDbEvent"> </db-dashboard>
  </div>
</template>

<script>
import DbDashboard from '@/components/dashboard/DbDashboard.vue';
import DbData from '../../components/dbdata';
import { demodashboard } from '../mixins/demodashboard';
import perspective from '@finos/perspective';
import swsdata from '../data/sws_api_stats.json';

export default {
  name: 'SankeyDashboard',
  components: {
    DbDashboard
  },
  mixins: [demodashboard],
  data() {
    return {
      dbdata: new DbData(),
      dbspec: {
        layout: {
          type: 'grid',
          size: 12
        },
        colorScheme: 'Tableau',
        widgets: [
          {
            id: `wMP1`,
            type: 'DbMultiProgress',
            cspan: 4,
            properties: {
              title: 'CPU Usage'
            }
          },
          {
            id: `wMP2`,
            type: 'DbMultiProgress',
            cspan: 4,
            properties: {
              title: 'Memory Utilization',
              'progress-color': '#4e79a7'
            }
          },
          {
            id: `wMP3`,
            type: 'DbMultiProgress',
            cspan: 4,
            properties: {
              title: 'Apdex Score',
              'progress-reverse': true,
              'progress-color-mode': 'test'
            }
          }
        ]
      },
      ready: false,
      startTimestamp: null,
      endTimestamp: null,
      worker: null,
      table: null,
      view: null
    };
  },
  async mounted() {
    this.worker = perspective.worker();
    this.$store.dispatch('setDashboardSpec', { spec: JSON.stringify(this.dbspec, null, '\t') });
    // Initialize dashboard data
    await this.initialize();
  },
  methods: {
    initialize: async function() {
      await this.showData();
    },

    showData: async function() {
      let multiProgressData1 = [
        { title: 'host1.acme.com', value: 20 },
        { title: 'host2.acme.com', value: 30 },
        { title: 'host3.acme.com', value: 40 },
        { title: 'host4.acme.com', value: 50 },
        { title: 'host5.acme.com', value: 60 },
        { title: 'host6.acme.com', value: 70 },
        { title: 'host7.acme.com', value: 80 },
        { title: 'host8.acme.com', value: 90 },
        { title: 'host9.acme.com', value: 100 }
      ];

      let multiProgressData2 = [
        { title: 'host1.acme.com', value: 20 },
        { title: 'host2.acme.com', value: 40 },
        { title: 'host3.acme.com', value: 65 },
        { title: 'host4.acme.com', value: 85 },
        { title: 'host5.acme.com', value: 95 },
        { title: 'host6.acme.com', value: 86 },
        { title: 'host7.acme.com', value: 60 },
        { title: 'host8.acme.com', value: 40 },
        { title: 'host9.acme.com', value: 20 }
      ];

      let multiProgressData3 = [
        { title: 'host1.acme.com', value: 98 },
        { title: 'host2.acme.com', value: 87 },
        { title: 'host3.acme.com', value: 70 },
        { title: 'host4.acme.com', value: 60 },
        { title: 'host5.acme.com', value: 50 },
        { title: 'host6.acme.com', value: 40 },
        { title: 'host7.acme.com', value: 30 },
        { title: 'host8.acme.com', value: 15 },
        { title: 'host9.acme.com', value: 5 }
      ];

      this.dbdata.setWData('wMP1', {
        data: multiProgressData1
      });

      this.dbdata.setWData('wMP2', {
        data: multiProgressData2
      });

      this.dbdata.setWData('wMP3', {
        data: multiProgressData3
      });

      this.ready = true;
    },

    getRand: function(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
  }
};
</script>
