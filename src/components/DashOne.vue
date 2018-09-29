<template>
  <div class="dbc-dashboard">
    <div class="dbc-dashboard" v-for="widget in dbspec.widgets" v-bind:key="widget.id">
      Name: {{ widget.name }}
      Data: {{ dbdata[widget.name] }}
      <component v-bind:is="widget.type">
      </component>
    </div>
  </div>
</template>

<script>
// Imports all components, then whatever is specified in dashboard will be used dynamically
import DbWidgets from "./dbwidgets";

// TODO LAYOUTS !!!
// TODO Under layout property of dashboard spec, do layout-specific config

export default {
  name: "DashOne",
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
          type: "bootstrap",
          // Rows, Columns
          rows: [[{ w1: "1" }, { w2: "2" }]]
        },
        widgets: [
          {
            id: "1",
            name: "w1",
            type: "WidgetOne"
          },
          {
            id: "2",
            name: "w2",
            type: "WidgetTwo"
          }
        ]
      }
    };
  }
};
</script>


/* Notes **

That works:
components: {
'WidgetOne': () => import('./WidgetOne.vue')
},


*/
