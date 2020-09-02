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
            id: `wSK`,
            type: 'DbSankey',
            cspan: 12,
            height: 800
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
      let resolveNode = x => { if(!(x in nodesNameIdx)) { nodesNameIdx[x] = nodes.push({name: x})-1;} return nodesNameIdx[x]; }
      let registerLink = (nS,nT,nV) => { let nKey = `${nS}.${nT}`; if( !(nKey in linksIdx) ) {linksIdx[nKey] = {source: nS,target: nT,value: nV};} else {linksIdx[nKey].value += nV;}}

      Object.keys(rawData.apistats).map(path => {
        let pathStats = rawData.apistats[path];

        Object.keys(pathStats).map(method => {
          let pathMethodStats = pathStats[method];
          let nM = resolveNode(method);
          let nP = resolveNode(path);
          registerLink(nM,nP,pathMethodStats.requests);
          let n2XX = resolveNode('2XX');
          let n3XX = resolveNode('3XX');
          let n4XX = resolveNode('4XX');
          let n5XX = resolveNode('5XX');
          if(pathMethodStats.requests > 0){
            registerLink(nP,n2XX,pathMethodStats.success);
          }
          if(pathMethodStats.redirect > 0){
            registerLink(nP,n3XX,pathMethodStats.redirect);
          }
          if(pathMethodStats.client_error > 0){
            registerLink(nP,n4XX,pathMethodStats.client_error);
          }
          if(pathMethodStats.server_error > 0){
            registerLink(nP,n5XX,pathMethodStats.server_error);
          }
        })

      })



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

      Object.keys(linksIdx).map( x=> {
        links.push(linksIdx[x]);
      })

      return {
        nodes: nodes,
        links: links
      };
    },


    showData: async function() {
      let sankeyData = await this.getSankeyData();

      this.dbdata.setWData('wSK', {
        data: Object.freeze(sankeyData)
      });

      this.ready = true;
    },

    getRand: function(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },
  }
};
</script>
