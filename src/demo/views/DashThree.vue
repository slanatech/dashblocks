<template>
  <!--
    <component v-bind:is="dbDashboardComponent" :dbspec="dbspec" :dbdata="dbdata" themeClass="db-theme-custom" :dark="isDark"> </component>
  -->
  <component v-bind:is="dbDashboardComponent" :dbspec="dbspec" :dbdata="dbdata" :dark="isDark"> </component>
</template>

<script>
import DbDashboard from '@/components/dashboard/DbDashboard.vue';
import DbData from '@/components/dbdata';
import * as d3 from 'd3';
import dashThreeSpec from '@/demo/dashboards/dashthree.json';
import { demodashboard } from '@/demo/mixins/demodashboard';

export default {
  name: 'home',
  components: {
    DbDashboard
  },
  mixins: [demodashboard],
  data() {
    return {
      dbDashboardComponent: null, // Lazy rendering, we'll need to wait for data to be loaded
      dbdata: new DbData(),
      dbspec: dashThreeSpec
    };
  },
  created() {
    this.$store.dispatch('setDashboardSpec', { spec: JSON.stringify(this.dbspec, null, '\t') });
    // Start initialization
    this.initialize();
  },
  methods: {
    initialize: async function() {
      // Get the data, and when it becomes available, render dashboard by setting dashboard component
      let data = await this.getData();
      // Set data for our widget
      this.dbdata.setWData('w1', { data: data });
      // Trigger component drawing
      this.dbDashboardComponent = 'DbDashboard';
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
