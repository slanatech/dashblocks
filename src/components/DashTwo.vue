<template>
  <div class="db-dashboard">
    <component v-bind:is="layoutComponent" :dbspec="dbspec" :dbdata="dbdata"> </component>
    <div @click="handleInc">INC</div>
  </div>
</template>

<script>
import DbLayouts from './dblayouts';
import DbData from '../dbdata';
import log from './log';
import * as d3 from 'd3';

// TODO LAYOUTS
// TODO Under layout property of dashboard spec, do layout-specific config
// TODO Handle responsive in Layout - https://alligator.io/vuejs/vue-media-queries/ - or justr

export default {
  name: 'DashOne',
  components: DbLayouts.components,
  data() {
    return {
      layoutComponent: null,
      dbdata: new DbData(),
      dbspec: {
        layout: {
          type: 'grid'
        },
        widgets: [
          {
            id: '1',
            name: 'w1',
            type: 'DbHorizon',
            cspan: 16
          }
        ]
      }
    };
  },
  computed: {},
  async created() {
    log.info('Created !');

    // TODO Set log level based on props
    log.setLevel('error');

    // Get the data
    let data = await this.getData();

    log.info('Data: ' + JSON.stringify(data));

    this.dbdata.setWData('w1', { data: data });

    // Trigger component drawing
    this.layoutComponent = DbLayouts.resolve(this.dbspec.layout.type);
  },
  methods: {
    handleInc: function() {
      this.dbdata.wdata['w1'].value = this.dbdata.wdata['w1'].value + 10;
    },
    getData: async function() {
      const data = await d3.csv(
        'https://gist.githubusercontent.com/chrtze/c74efb46cadb6a908bbbf5227934bfea/raw/c32d94689dd432609c55d1758d8e69c59f94f802/traffic_weekly.csv',
        ({ name, date, total_1, total_2 }) => ({ name, date: new Date(date * 1000), value: +total_1 + +total_2 })
      );
      return d3
        .nest()
        .key(d => d.name)
        .sortValues((a, b) => a.date - b.date)
        .entries(data)
        .map(d => ((d.sum = d3.sum(d.values, d => d.value)), d))
        .sort((a, b) => b.sum - a.sum);
    }
  }
};
</script>
<style>
.db-dash-item {
  border: 1px solid magenta;
}
</style>

/* Notes ** That works: components: { 'WidgetOne': () => import('./WidgetOne.vue') }, */
