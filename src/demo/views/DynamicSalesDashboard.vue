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
        colorScheme: 'DivergingPuOr',
        widgets: []
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

    // Query Arrow data, and return result converted to json
    // MAX 2 levels
    /* viewConfig sample
      let viewConfig = {
        columns: ['Order ID', 'Sales', 'Quantity'],
        aggregates: { 'Order ID': 'count', Sales: 'sum', Quantity: 'sum' },
        row_pivot: [groupBy, 'Order Date']
      };
    */
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
      let groupBy = 'Sub-Category';

      let viewConfig = {
        columns: ['Order ID', 'Sales', 'Quantity'],
        aggregates: { 'Order ID': 'count', Sales: 'sum', Quantity: 'sum' },
        row_pivot: [groupBy, 'Order Date']
      };

      let allData = await this.queryData(viewConfig);

      let totalOrders = Object.keys(allData)
        .map(x => allData[x].values['Order ID'])
        .reduce((sum, v) => sum + v, 0);

      let totalSales = Object.keys(allData)
        .map(x => allData[x].values['Sales'])
        .reduce((sum, v) => sum + v, 0);

      let byCategorySegment = await this.queryData({
        columns: ['Order ID', 'Sales', 'Quantity'],
        aggregates: { 'Order ID': 'count', Sales: 'sum', Quantity: 'sum' },
        row_pivot: ['Sub-Category', 'Segment']
      });

      let byCategoryRegion = await this.queryData({
        columns: ['Order ID', 'Sales', 'Quantity'],
        aggregates: { 'Order ID': 'count', Sales: 'sum', Quantity: 'sum' },
        row_pivot: ['Sub-Category', 'Region']
      });

      let dbWidgets = [];
      let idx = 0;
      for (let group of Object.keys(allData)) {
        let gEntry = allData[group];
        let byCategorySegmentEntry = byCategorySegment[group];
        let byCategoryRegionEntry = byCategoryRegion[group];

        let tsByMonth = this.reduceTimeSeries(
          gEntry.data.map(d => d.key + 5.5 * 365 * 24 * 60 * 60 * 1000),
          gEntry.data.map(d => d.values['Sales']),
          'month'
        );

        let tsQuantityByMonth = this.reduceTimeSeries(
          gEntry.data.map(d => d.key + 5.5 * 365 * 24 * 60 * 60 * 1000),
          gEntry.data.map(d => d.values['Quantity']),
          'month'
        );

        dbWidgets.push({
          id: `wA${idx}`,
          type: 'DbNumber',
          cspan: 3,
          properties: {
            title: `${group} Orders`,
            subtitle: 'Total orders received',
            value: pathOr(0, ['values', 'Order ID'], gEntry),
            total: totalOrders,
            trend: tsQuantityByMonth.map(x=>x.v) //gEntry.data.map(x => x.values['Quantity'])
          }
        });

        dbWidgets.push({
          id: `wL${idx}`,
          type: 'DbDygraphsBar',
          cspan: 3,
          rspan: 2,
          height: 220,
          properties: {
            options: { title: `${group} Sales Over Time`, labels: ['Date', 'Value'], legend: 'follow' /*rollPeriod: 60*/ },
            data: tsByMonth.map(d => {
              return [new Date(d.t), d.v];
            })
          }
        });

        dbWidgets.push({
          id: `wC${idx}`,
          type: 'DbChartjsDoughnut',
          cspan: 3,
          rspan: 2,
          properties: {
            options: {
              legend: { position: 'right' },
              title: {
                display: true,
                fontFamily: 'Roboto, sans-serif',
                fontSize: 16,
                fontStyle: 'normal',
                text: 'Sales by Segment'
              }
            },
            data: {
              labels: byCategorySegmentEntry.data.map(x => x.key),
              datasets: [
                {
                  data: byCategorySegmentEntry.data.map(x => x.values['Sales'])
                }
              ]
            }
          }
        });

        dbWidgets.push({
          id: `wR${idx}`,
          type: 'DbChartjsDoughnut',
          cspan: 3,
          rspan: 2,
          properties: {
            options: {
              legend: { position: 'right' },
              title: {
                display: true,
                fontFamily: 'Roboto, sans-serif',
                fontSize: 16,
                fontStyle: 'normal',
                text: 'Sales by Region'
              }
            },
            data: {
              labels: byCategoryRegionEntry.data.map(x => x.key),
              datasets: [
                {
                  data: byCategoryRegionEntry.data.map(x => x.values['Sales'])
                }
              ]
            }
          }
        });

        dbWidgets.push({
          id: `wB${idx}`,
          type: 'DbNumber',
          cspan: 3,
          properties: {
            title: `${group} Sales`,
            subtitle: `Total sales for ${group}`,
            format: '$%.2f',
            value: pathOr(0, ['values', 'Sales'], gEntry),
            total: totalSales,
            trend: tsByMonth.map(x => x.v)
          }
        });

        idx++;
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
