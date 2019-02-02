<template>
  <div class="dbc-grid-layout">
    <db-widget
      v-for="widget in dbspec.widgets"
      v-bind:key="widget.id"
      :layoutClass="getWidgetClass(widget)"
      :wspec="widget"
      :wdata="getWidgetData(widget)"
      :style="widget.style"
    >
    </db-widget>
  </div>
</template>

<script>
import pathOr from 'ramda/es/pathOr';
import DbWidget from '../widget/DbWidget.vue';
export default {
  name: 'DbGridLayout',
  components: {
    DbWidget
  },
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
    getWidgetClass: function(widget) {
      // TODO - wspan ?
      let wClass = '';
      let cspan = pathOr(null, ['cspan'], widget);
      if (cspan) {
        wClass += ' cspan-' + cspan;
      }
      let rspan = pathOr(null, ['rspan'], widget);
      if (rspan) {
        wClass += ' rspan-' + rspan;
      }
      return wClass;
    },
    getWidgetData: function(widget) {
      let wd = this.dbdata.getWData(widget.name);
      return wd;
    }
  }
};
</script>
<style lang="scss">
.db-dash-item {
  border: 1px solid magenta;
}
</style>
