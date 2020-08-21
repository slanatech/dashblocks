<template>
    <db-dashboard v-if="ready" :dbspec="dbspec" :dbdata="dbdata" :dark="isDark"> </db-dashboard>
</template>

<script>
import { DbData, DbDashboard } from 'dashblocks';
import { demodashboard } from '@/demo/mixins/demodashboard';
import geodata from '@/demo/data/geo_data_us.json';

export default {
  name: 'GeoMapBoxUS',
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
            id: 'wG',
            type: 'DbGeoMapbox',
            cspan: 16,
            height: 700
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
      this.dbdata.setWData('wG', {
        data: Object.freeze(geodata)
      });
    }
  }
};
</script>
