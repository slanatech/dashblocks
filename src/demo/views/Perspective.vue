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
            id: 'wP',
            type: 'DbPerspective',
            cspan: 16,
            height: 600
          }
        ]
      },
      ready: false
    };
  },
  async mounted() {
    await this.$store.dispatch('setDashboardSpec', { spec: JSON.stringify(this.dbspec, null, '\t') });
    await this.initialize();
    this.ready = true;
  },
  methods: {
    initialize: async function() {
      // Fetch data from Arrow file
      const data = await fetch('data/superstore.arrow');
      const dataBuffer = await data.arrayBuffer();
      this.dbdata.setWData('wP', {
        data: Object.freeze(dataBuffer)
      });
    }
  }
};
</script>
