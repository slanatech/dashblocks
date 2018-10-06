<template>
  <div class="dbc-dashboard db-grid-layout">
    <div :class="'db-dash-item ' + widget.class" v-for="widget in dbspec.widgets" v-bind:key="widget.id" :style="widget.style">
      Name: {{ widget.name }}
      Data: {{ dbdata[widget.name] }}
      <component v-bind:is="widget.type">
      </component>
    </div>
  </div>
</template>

<script>
// Imports all components, then whatever is specified in dashboard will be used dynamically
import DbWidgets from './dbwidgets';

// TODO LAYOUTS
// TODO Under layout property of dashboard spec, do layout-specific config
// TODO Handle responsive in Layout - https://alligator.io/vuejs/vue-media-queries/ - or justr

export default {
  name: 'DashOne',
  components: DbWidgets,
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
          type: 'bootstrap',
          // Rows, Columns
          rows: [[{ w1: '1' }, { w2: '2' }]]
        },
        widgets: [
          {
            id: '1',
            name: 'w1',
            type: 'WidgetOne',
            class: 'cspan-4'
          },
          {
            id: '2',
            name: 'w2',
            type: 'WidgetTwo',
            style: 'grid-row-end: span 2;'
          },
          {
            id: '1',
            name: 'w1',
            type: 'WidgetOne',
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
          }
        ]
      }
    };
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
