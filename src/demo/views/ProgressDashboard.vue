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

    getSankeyData: async function() {
      let rawData = swsdata;

      let nodes = [];
      let links = [];
      let linksIdx = {};
      let nodesNameIdx = {};
      let resolveNode = x => {
        if (!(x in nodesNameIdx)) {
          nodesNameIdx[x] = nodes.push({ name: x }) - 1;
        }
        return nodesNameIdx[x];
      };
      let registerLink = (nS, nT, nV) => {
        let nKey = `${nS}.${nT}`;
        if (!(nKey in linksIdx)) {
          linksIdx[nKey] = { source: nS, target: nT, value: nV };
        } else {
          linksIdx[nKey].value += nV;
        }
      };

      Object.keys(rawData.apistats).map(path => {
        let pathStats = rawData.apistats[path];

        Object.keys(pathStats).map(method => {
          let pathMethodStats = pathStats[method];
          let nM = resolveNode(method);
          let nP = resolveNode(path);
          registerLink(nM, nP, pathMethodStats.requests);
          let n2XX = resolveNode('2XX');
          let n3XX = resolveNode('3XX');
          let n4XX = resolveNode('4XX');
          let n5XX = resolveNode('5XX');
          if (pathMethodStats.requests > 0) {
            registerLink(nP, n2XX, pathMethodStats.success);
          }
          if (pathMethodStats.redirect > 0) {
            registerLink(nP, n3XX, pathMethodStats.redirect);
          }
          if (pathMethodStats.client_error > 0) {
            registerLink(nP, n4XX, pathMethodStats.client_error);
          }
          if (pathMethodStats.server_error > 0) {
            registerLink(nP, n5XX, pathMethodStats.server_error);
          }
        });
      });

      /*
      vJson.map(r => {
        let rp = r['__ROW_PATH__'];

        if (Array.isArray(rp) && rp.length === numGroups) {
          let cN = rp[0];
          for(let i=1;i<rp.length;i++){
            let nStart = resolveNode(cN);
            let nEnd = resolveNode(rp[i]);
            let nKey = `${nStart}.${nEnd}`;
            if( !(nKey in linksIdx) ) {
              linksIdx[nKey] = {
                source: nStart,
                target: nEnd,
                value: r[valueProp]
              };
            } else {
              linksIdx[nKey].value += r[valueProp];
            }
            cN = rp[i];
          }
        }
      });
      */

      Object.keys(linksIdx).map(x => {
        links.push(linksIdx[x]);
      });

      return {
        nodes: nodes,
        links: links
      };
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
