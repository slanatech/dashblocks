<template>
  <div class="db-dashboard">
    <component v-bind:is="layoutComponent" :spec="dbspec" :data="dbdata"> </component>
    <div @click="handleInc">INC</div>
  </div>
</template>

<script>
import DbLayouts from './dblayouts';

// TODO LAYOUTS
// TODO Under layout property of dashboard spec, do layout-specific config
// TODO Handle responsive in Layout - https://alligator.io/vuejs/vue-media-queries/ - or justr

export default {
  name: 'DashOne',
  components: DbLayouts.components,
  mounted() {
    //this.components['WidgetOne'] = import('./WidgetOne.vue');
  },
  data() {
    return {
      dbdata: {
        w1: 10,
        w2: 20,
        w5: {
          labels: ['January', 'February', 'March', 'April'],
          datasets: [
            {
              label: 'Data One',
              data: [10, 20, 30, 100]
            }
          ]
        }
      },
      dbspec: {
        layout: {
          type: 'grid'
        },
        widgets: [
          {
            id: '1',
            name: 'w1',
            type: 'WidgetOne',
            class: 'cspan-2'
          },
          {
            id: '2',
            name: 'w2',
            type: 'WidgetTwo',
            class: 'cspan-2'
          },
          {
            id: '1',
            name: 'w5',
            type: 'WidgetBar',
            class: 'cspan-4'
          },
          {
            id: '1',
            name: 'w5',
            type: 'WidgetBar',
            class: 'cspan-4'
          },
          {
            id: '1',
            name: 'w1',
            type: 'WidgetOne'
          },
          {
            id: '1',
            name: 'w1',
            type: 'WidgetOne'
          },
          {
            id: '1',
            name: 'w1',
            type: 'WidgetOne'
          },
          {
            id: '1',
            name: 'w1',
            type: 'WidgetOne'
          },
          {
            id: '1',
            name: 'w1',
            type: 'WidgetOne'
          },
          {
            id: '1',
            name: 'w1',
            type: 'WidgetOne'
          },
          {
            id: '1',
            name: 'w1',
            type: 'WidgetOne'
          },
          {
            id: '1',
            name: 'w1',
            type: 'WidgetOne'
          },
          {
            id: '1',
            name: 'w1',
            type: 'WidgetOne'
          },
          {
            id: '1',
            name: 'w1',
            type: 'WidgetOne'
          },
          {
            id: '1',
            name: 'w1',
            type: 'WidgetOne'
          }
        ]
      }
    };
  },
  computed: {
    layoutComponent() {
      return DbLayouts.resolve(this.dbspec.layout.type);
    }
  },
  methods: {
    handleInc: function() {
      this.dbdata.w1 = this.dbdata.w1 + 10;
      let d = this.dbdata.w5.datasets[0].data;
      for (let i = 0; i < d.length; i++) {
        this.$set(d, i, d[i] + 10);
        //d[i] = d[i] + 10;
      }
      //this.$set(this.dbdata,'w5',nd);
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
