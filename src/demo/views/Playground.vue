<template>
  <db-dashboard v-if="ready" :dbspec="dbspec" :dbdata="dbdata" :dark="isDark"> </db-dashboard>
</template>

<script>
import { DbData, DbDashboard } from 'dashblocks';
import { demodashboard } from '@/demo/mixins/demodashboard';
import energydata from '@/demo/data/energy.json';
import ridgemapdata from '@/demo/data/ridgemapdata.json';

export default {
  name: 'Playground',
  components: {
    DbDashboard
  },
  mixins: [demodashboard],
  data() {
    return {
      isDark: false,
      dbdata: new DbData(),
      // Declare Dashboard Layout. Add widgets to your dashboard, specifying how many columns and rows
      // each widget takes. Dashblocks provides 16-columns CSS Grid layout.
      // Pass additional options to widgets to adjust appearance as needed.
      dbspec: {
        layout: {
          type: 'grid'
        },
        widgets: [
          {
            id: 'wF',
            type: 'DbFunnel',
            cspan: 16,
            height: 600
          }
        ]
      },
      ready: false
    };
  },
  mounted() {
    this.$store.dispatch('setDashboardSpec', { spec: JSON.stringify(this.dbspec, null, '\t') });
    this.initialize();
    this.ready = true;
  },
  methods: {
    initialize: function() {
      this.dbdata.setWData('wF', {
        labels: ['Impressions', 'Add To Cart', 'Buy'],
        subLabels: ['Direct', 'Social Media', 'Ads'],
        values: [
          // with the given Labels and SubLabels here's what the values represent:
          //
          // Direct, Social, Ads
          //    |      |     |
          //    v      v     v
          [3000, 2500, 6500], // Segments of "Impressions" from top to bottom
          [3000, 1700, 1000], // Segments of "Add To Cart"
          [600, 200, 130] // Segments of "Buy"
        ],
        colors: [
          ['#FFB178', '#FF3C8E'], // color set for "Impressions" segment
          ['#A0BBFF', '#EC77FF'], // color set for "Add To Cart" segment
          ['#A0F9FF', '#7795FF'] // color set for "Buy" segment
        ],
        direction: 'vertical',
        gradientDirection: 'vertical',
        height: 500,
        width: 1500,
        animated: true
      });
    }
  }
};
</script>
