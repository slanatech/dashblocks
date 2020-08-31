<template>
  <db-dashboard v-if="ready" :dbspec="dbspec" :dbdata="dbdata" :dark="isDark" @db-event="handleDbEvent"> </db-dashboard>
</template>

<script>
import DbDashboard from '@/components/dashboard/DbDashboard.vue';
import DbData from '../../components/dbdata';
import { demodashboard } from '../mixins/demodashboard';
import pathOr from 'ramda/es/pathOr';
import perspective from '@finos/perspective';
import moment from 'moment';

export default {
  name: 'DashblocksShowcase',
  components: {
    DbDashboard
  },
  mixins: [demodashboard],
  data() {
    return {
      dbdata: new DbData(),
      dbspec: {
        layout: {
          type: 'grid'
        },
        widgets: [
          {
            id: 'w2',
            type: 'DbDygraphsBar',
            cspan: 16,
            height: 220,
            properties: {
              colorScheme: 'barChartDiverging',
              options: {
                stackedGraph: true,
                title: 'Sales over time',
                ylabel: 'Requests, Mil.',
                labels: ['Date', 'Value'],
                legend: 'always'
              }
            }
          },
          {
            id: 'w4',
            type: 'DbChartjsPie',
            cspan: 4,
            height: 250
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

    // TODO Evolve this to more robust aggregation, i.e. multiple values, function as aggregator ...
    // groupPeriod: 'month', etc
    reduceTimeSeries(timestamps, values, groupPeriod) {
      if (!Array.isArray(timestamps) || !Array.isArray(values) || timestamps.length != values.length) {
        return [];
      }
      let result = [];
      let tsCurrent = moment(timestamps[0]).startOf(groupPeriod).valueOf();
      let accCurrent = 0;
      timestamps.map((x, i) => {
        let tsn = moment(x).startOf(groupPeriod).valueOf();
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
      let dthData = [];

      let dthViewConfig = {
        columns: ['Order ID', 'Sales', 'Quantity'],
        aggregates: { 'Order ID': 'count', Sales: 'sum', Quantity: 'sum' },
        row_pivot: ['Order Date']
      };

      // Apply datetime filter when zoomed in
      if (this.startTimestamp && this.endTimestamp) {
        dthViewConfig.filter = [
          ['Order Date', '>', this.startTimestamp],
          ['Order Date', '<=', this.endTimestamp]
        ];
      }

      let allData = await this.queryData(dthViewConfig);
      let groupBy = 'month';
      if( Object.keys(allData).length < 300){
        groupBy = 'day';
      }
      let tsByMonth = this.reduceTimeSeries(
        //allData.data.map(d => d.key + 5.5 * 365 * 24 * 60 * 60 * 1000),
        Object.keys(allData).map(t => parseInt(t)),
        Object.keys(allData).map(k => allData[k].values['Sales']),
        groupBy
      );


      /*
      let dthView = this.table.view(dthViewConfig);
      let vjson = await dthView.to_json();
      vjson.map(r => {
        let rp = r['__ROW_PATH__'];
        if (Array.isArray(rp) && rp.length > 0) {
          let ts = rp[0]; // Timestamp
          let v = r['Quantity']; // r['Order ID']; // Value
          dthData.push([new Date(ts), v]);
        }
      });
      dthView.delete();
      dthView = null;
      */


      /*
      let totalReq = 0;
      let sTS = Date.now() - 100 * 3600 * 1000;
      for (let i = 0; i < 100; i++) {
        let cTs = sTS + i * 3600 * 1000;
        let d = new Date(cTs);
        let r = Math.random();
        let e = Math.random();
        totalReq += r + e;
        dthData2.push([d, r, e]);
      }
      */

      this.dbdata.setWData('w2', {
        data: tsByMonth.map(d => {
          return [new Date(d.t), d.v];
        })
      });

      this.dbdata.setWData('w4', {
        data: {
          labels: ['January', 'February', 'March', 'April'],
          datasets: [
            {
              label: 'Data One',
              data: [50, 10, 67, 45]
            }
          ]
        }
      });

      this.ready = true;
    },
    getRand: function(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },
    handleDbEvent(event) {
      switch (event.type) {
        case 'zoom': {
          let from = pathOr(null, ['minDate'], event);
          let to = pathOr(null, ['maxDate'], event);
          if (from && to) {
            this.startTimestamp = from;
            this.endTimestamp = to;
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
