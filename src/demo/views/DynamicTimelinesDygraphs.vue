<template>
  <db-dashboard v-if="ready" :dbspec="dbspec" :dbdata="dbdata" :dark="isDark" @db-event="handleDbEvent"> </db-dashboard>
</template>

<script>
import DbDashboard from '@/components/dashboard/DbDashboard.vue';
import DbData from '../../components/dbdata';
import { demodashboard } from '../mixins/demodashboard';
import pathOr from 'ramda/es/pathOr';
import perspective from '@finos/perspective';

export default {
  name: 'DynamicTimelinesDygraphs',
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
        widgets: [
          /*
          {
            id: 'w2',
            type: 'DbDygraphsBar',
            cspan: 16,
            height: 220,
            properties: {
              colorScheme: 'barChartDiverging',
              options: {
                stackedGraph: true,
                title: 'Traffic over time',
                ylabel: 'Requests, Mil.',
                labels: ['Date', 'Value'],
                legend: 'always'
              }
            }
          }*/
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

    showData: async function() {

      let groupBy = 'Sub-Category';

      let viewConfig = {
        columns: ['Order ID', 'Sales', 'Quantity'],
        aggregates: { 'Order ID': 'count', Sales: 'sum', Quantity: 'sum' },
        row_pivot: [groupBy, 'Order Date']
      };
      // Apply datetime filter when zoomed in
      /*
      if (this.startTimestamp && this.endTimestamp) {
        dthViewConfig.filter = [
          ['Order Date', '>', this.startTimestamp],
          ['Order Date', '<=', this.endTimestamp]
        ];
      }
      */
      let dthView = this.table.view(viewConfig);
      let vjson = await dthView.to_json();

      let allData = {};
      vjson.map(r => {
        let rp = r['__ROW_PATH__'];
        if (Array.isArray(rp) && rp.length === 2) {
          let grp = rp[0]; // Group
          if (!(grp in allData)) {
            allData[grp] = {
              ts: [],
              data: []
            };
          }
          let gEntry = allData[grp];
          let ts = rp[1] + 5.5*365*24*60*60*1000; // Timestamp
          let data = {
            count: r['Order ID'],
            quantity: r['Quantity'],
            sales: r['Sales']
          };
          gEntry.ts.push(ts);
          gEntry.data.push(data);
        }
      });

      /*
            type: 'DbDygraphsBar',
            cspan: 16,
            height: 220,
            properties: {
              colorScheme: 'barChartDiverging',
              options: {
                stackedGraph: true,
                title: 'Traffic over time',
                ylabel: 'Requests, Mil.',
                labels: ['Date', 'Value'],
                legend: 'always'
              }
            }

      */

      let dbWidgets = [];
      let idx = 0;
      for (let group of Object.keys(allData)) {
        let gEntry = allData[group];
        let wid = `w${idx++}`;
        let wdef = {
          id: wid,
          type: 'DbDygraphsLine',
          cspan: 3,
          height: 220,
          properties: {
            options: {
              title: group,
              labels: ['Date', 'Value'],
              legend: 'follow'
            }
          }
        };
        dbWidgets.push(wdef);
        //let wData = { labels: gEntry.ts, datasets: [{ data: gEntry.data.map(d => d.quantity), lineTension: 0.1 }] };
        let wData = gEntry.data.map((d,i) => {return [new Date(gEntry.ts[i]), d.quantity]});
        this.dbdata.setWData(wid, { data: wData });
      }
      this.dbspec.widgets = dbWidgets;

      let a = 1;
      this.ready = true;
    },

    showDataOld: async function() {
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
        data: dthData
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
