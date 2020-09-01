<template>
  <div>
    <db-dashboard v-if="ready" :dbspec="dbspec" :dbdata="dbdata" :dark="isDark" @db-event="handleDbEvent"> </db-dashboard>
    <div v-on:click="onReset" style="margin-top:50px;">RESET</div>
  </div>
</template>

<script>
import DbDashboard from '@/components/dashboard/DbDashboard.vue';
import DbData from '../../components/dbdata';
import { demodashboard } from '../mixins/demodashboard';
import pathOr from 'ramda/es/pathOr';
import perspective from '@finos/perspective';
import moment from 'moment';
import energy from '../data/energy.json';

export default {
  name: 'DynamicSankey',
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
            id: 'w2',
            type: 'DbDygraphsBar',
            cspan: 12,
            height: 240,
            properties: {
              options: {
                stackedGraph: true,
                title: 'Sales over time',
                ylabel: 'Sales, $ Mil',
                labels: ['Date', 'Sales, $ Mil'],
                legend: 'always'
              }
            }
          },
          {
            id: `wSK`,
            type: 'DbSankey',
            cspan: 12,
            height: 560
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
    await this.initData();
    await this.initialize();
  },
  methods: {
    initData: async function() {
      const data = await fetch('data/superstore.arrow');
      const dataBuffer = await data.arrayBuffer();
      this.table = this.worker.table(dataBuffer);
      /* Does not work by some reason
      this.table.add_computed([
        {
          column: 'computed',
          inputs: 'Order Date',
          func: x => x / 100000,
          type: 'integer'
        }
      ]); */
    },

    initialize: async function() {
      await this.showData();
    },

    queryData: async function(viewConfig) {
      //let groupByDepth = pathOr([],['row_pivot'],viewConfig).length;
      let dthView = this.table.view(viewConfig);
      let vJson = await dthView.to_json();

      let allData = {};
      vJson.map(r => {
        let rp = r['__ROW_PATH__'];
        if (Array.isArray(rp) && rp.length > 0) {
          let grp = rp[0]; // Group
          if (!(grp in allData)) {
            allData[grp] = {
              values: {},
              data: []
            };
          }
          let gEntry = allData[grp];
          let values = {};
          pathOr([], ['columns'], viewConfig).map(x => {
            values[x] = r[x];
          });
          if (rp.length === 1) {
            gEntry.values = values;
          } else {
            gEntry.data.push({
              key: rp[1],
              values: values
            });
          }
        }
      });
      dthView.delete();
      return allData;
    },

    getSankeyData: async function(viewConfig,valueProp) {
      let numGroups = viewConfig.row_pivots.length;
      let dthView = this.table.view(viewConfig);
      let vJson = await dthView.to_json();

      let nodes = [];
      let links = [];
      let nodesNameIdx = {};
      //let resolveNode = x => { if(x in nodesNameIdx) {return nodesNameIdx[x]} else {nodesNameIdx[x] = }}
      let resolveNode = x => { if(!(x in nodesNameIdx)) { nodesNameIdx[x] = nodes.push({name: x})-1;} return nodesNameIdx[x]; }

      vJson.map(r => {
        let rp = r['__ROW_PATH__'];

        if (Array.isArray(rp) && rp.length === numGroups) {
          let cN = rp[0];
          for(let i=1;i<rp.length;i++){
            let nStart = resolveNode(cN);
            let nEnd = resolveNode(rp[i]);
            links.push({
              source: nStart,
              target: nEnd,
              value: r[valueProp]
            });
            cN = rp[i];
          }
        }
      });

      dthView.delete();
      return {
        nodes: nodes,
        links: links
      };
    },

    // TODO Evolve this to more robust aggregation, i.e. multiple values, function as aggregator ...
    // groupPeriod: 'month', etc
    reduceTimeSeries(timestamps, values, groupPeriod) {
      if (!Array.isArray(timestamps) || !Array.isArray(values) || timestamps.length != values.length) {
        return [];
      }
      let result = [];
      let tsCurrent = moment(timestamps[0])
        .startOf(groupPeriod)
        .valueOf();
      let accCurrent = 0;
      timestamps.map((x, i) => {
        let tsn = moment(x)
          .startOf(groupPeriod)
          .valueOf();
        if (tsn !== tsCurrent) {
          result.push({
            t: tsCurrent,
            v: accCurrent
          });
          tsCurrent = tsn;
          accCurrent = values[i];
        } else {
          accCurrent += values[i];
        }
      });
      return result;
    },

    showData: async function() {
      let filters = [];
      // Apply datetime filter when zoomed in
      if (this.startTimestamp && this.endTimestamp) {
        filters = [
          ['Order Date', '>', this.startTimestamp - 5.5 * 365 * 24 * 60 * 60 * 1000],
          ['Order Date', '<=', this.endTimestamp - 5.5 * 365 * 24 * 60 * 60 * 1000]
        ];
      }

      let dthViewConfig = {
        columns: ['Order ID', 'Sales', 'Quantity'],
        aggregates: { 'Order ID': 'count', Sales: 'sum', Quantity: 'sum' },
        row_pivots: ['Order Date'],
        filter: filters
      };

      let allData = await this.queryData(dthViewConfig);
      let groupBy = 'month';
      if (Object.keys(allData).length < 300) {
        groupBy = 'day';
      }
      let tsByMonth = this.reduceTimeSeries(
        //allData.data.map(d => d.key + 5.5 * 365 * 24 * 60 * 60 * 1000),
        Object.keys(allData).map(t => parseInt(t) + 5.5 * 365 * 24 * 60 * 60 * 1000),
        Object.keys(allData).map(k => allData[k].values['Sales']),
        groupBy
      );

      this.dbdata.setWData('w2', {
        data: tsByMonth.map(d => {
          return [new Date(d.t), d.v];
        })
      });

      /*
      this.dbdata.setWData('wS', {
        data: {
          labels: Object.keys(bySegment),
          datasets: [{ data: Object.keys(bySegment).map(x => bySegment[x].values['Sales']) }]
        }
      }); */

      let sankeyData = await this.getSankeyData({
        columns: ['Order ID', 'Sales', 'Quantity'],
        aggregates: { 'Order ID': 'count', Sales: 'sum', Quantity: 'sum' },
        row_pivots: ['Region', 'Category', 'Sub-Category'],
        filter: filters
      }, 'Sales');

      this.dbdata.setWData('wSK', {
        data: Object.freeze(sankeyData)
      });

      this.ready = true;
    },
    getRand: function(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },
    onReset(){
      this.startTimestamp = null;
      this.endTimestamp = null;
      this.$nextTick(() => {
        this.showData();
      });
    },
    handleDbEvent(event) {
      console.log(`Got event: ${event.type}`);
      switch (event.type) {
        case 'zoom': {
          let from = pathOr(null, ['minDate'], event);
          let to = pathOr(null, ['maxDate'], event);
          if (from && to) {
            this.startTimestamp = from;
            this.endTimestamp = to;
            event.g.updateOptions({
              dateWindow: null,
              valueRange: null
            });
            this.showData();
            //let mFrom = moment(from).format('YYYY/MM/DD HH:mm:ss');
            //let mTo = moment(to).format('YYYY/MM/DD HH:mm:ss');
            // reset local time range settings, so it'll be re-calculated
            //this.setRange({ from: from, to: to, title: `${mFrom} - ${mTo}` });
            // Query will be triggered by time range change watch
          }
          break;
        }
      }
    }
  }
};
</script>
