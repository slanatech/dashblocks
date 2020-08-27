<template>
  <db-dashboard v-if="ready" :dbspec="dbspec" :dbdata="dbdata" :dark="isDark"> </db-dashboard>
</template>

<script>
import { DbData, DbDashboard, dbColors } from 'dashblocks';
import { demodashboard } from '@/demo/mixins/demodashboard';

export default {
  name: 'Playground',
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
        colorScheme: 'DivergingPiYG',
        widgets: [
          {
            id: 'wA',
            type: 'DbChartjsDoughnut',
            cspan: 4,
            height: 200
          },
          {
            id: 'wF',
            type: 'DbFunnel',
            cspan: 8,
            rspan: 3,
            height: 600
          },
          {
            id: 'wD',
            type: 'DbChartjsDoughnut',
            cspan: 4,
            height: 200,
            properties: {colorScheme: 'DivergingRdYlGn'}
          },
          {
            id: 'wB',
            type: 'DbChartjsDoughnut',
            cspan: 4,
            height: 200
          },
          {
            id: 'wE',
            type: 'DbChartjsDoughnut',
            cspan: 4,
            height: 200,
            properties: {colorScheme: 'DivergingRdYlGn'}
          },
          {
            id: 'wC',
            type: 'DbChartjsDoughnut',
            cspan: 4,
            height: 200
          },
          {
            id: 'wH',
            type: 'DbChartjsDoughnut',
            cspan: 4,
            height: 200,
            properties: {colorScheme: 'DivergingRdYlGn'}
          }
        ]
      },
      ready: false
    };
  },
  async mounted() {
    this.$store.dispatch('setDashboardSpec', { spec: JSON.stringify(this.dbspec, null, '\t') });
    this.initialize();
    this.ready = true;
  },
  methods: {
    initialize: function() {

      this.dbdata.setWData('wA', {
        data: {
          labels: ['Furniture', 'Office Supplies', 'Technology'],
          datasets: [{data: [500, 100, 200]}]
        }
      });

      this.dbdata.setWData('wB', {
        data: {
          labels: ['Furniture', 'Office Supplies', 'Technology'],
          datasets: [{data: [2000, 1800, 3000]}]
        }
      });

      this.dbdata.setWData('wC', {
        data: {
          labels: ['Furniture', 'Office Supplies', 'Technology'],
          datasets: [{data: [2000, 1000, 8000]}]
        }
      });

      this.dbdata.setWData('wD', {
        data: {
          labels: ['Central', 'East', 'South', 'West'],
          datasets: [{data: [2000, 2000, 8000,1000]}]
        }
      });

      this.dbdata.setWData('wE', {
        data: {
          labels: ['Central', 'East', 'South', 'West'],
          datasets: [{data: [100, 200, 800, 300]}]
        }
      });

      this.dbdata.setWData('wH', {
        data: {
          labels: ['Central', 'East', 'South', 'West'],
          datasets: [{data: [20, 50, 11, 30]}]
        }
      });

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
          [600, 200, 130]     // Segments of "Buy"
        ],
        colors: [
          //['#FFB178', '#FF3C8E'], // color set for "Impressions" segment
          dbColors.d3ScaleChromatic.schemePiYG[4],
          //['#A0BBFF', '#EC77FF'], // color set for "Add To Cart" segment
          dbColors.d3ScaleChromatic.schemeBrBG[4],
          //['#A0F9FF', '#7795FF']  // color set for "Buy" segment
          dbColors.d3ScaleChromatic.schemeRdYlGn[4],
        ],
        direction: 'vertical',
        gradientDirection: 'vertical',
        animated: true
      });
    }
  }
};
</script>
