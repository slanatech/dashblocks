<template>
  <div class="db-dashboard">
    <component
      v-bind:is="layoutComponent"
      :spec="dbspec"
      :data="dbdata"
    >
    </component>
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
        w2: 20
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
            name: 'w1',
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
    }
  }
};
</script>
<style>
.db-dash-item {
  border: 1px solid magenta;
}
</style>

/* Notes **

That works:
components: {
'WidgetOne': () => import('./WidgetOne.vue')
},


*/
