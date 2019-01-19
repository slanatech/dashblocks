<template>
  <div class="db-grid-layout">
    <div
      :class="'db-dash-item ' + widget.class"
      v-for="widget in dbspec.widgets"
      v-bind:key="widget.id"
      :style="widget.style"
    >
      {{ widget.name }}
      <component
        v-bind:is="widget.type"
        :wspec="widget"
        :wdata="getWidgetData(widget)"
        style="min-height:150px;position:relative;"
      >
      </component>
    </div>
  </div>
</template>

<script>
// Imports all components, then whatever is specified in dashboard will be used dynamically
import DbWidgets from '../dbwidgets';
export default {
  name: 'DbGridLayout',
  components: DbWidgets,
  props: {
    dbspec: Object,
    dbdata: Object
  },
  /*
  watch: {
    dbdata: {
      handler(newVal, oldVal) {
        //console.log(`dbdata prop changed ${JSON.stringify(oldVal)} -> ${JSON.stringify(newVal)}`);
      },
      deep: true
    }
  },
  */
  methods: {
    getWidgetData: function(widget) {
      //console.log(`getWidgetData called!`);
      let wd = this.dbdata.getWData(widget.name);
      return wd;
    }
  }
};
</script>
