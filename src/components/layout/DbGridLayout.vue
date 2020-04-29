<template>
  <div :class="getClass()">
    <db-widget-container
      v-for="widget in dbspec.widgets"
      v-bind:key="widget.id"
      :layoutClass="getWidgetClass(widget)"
      :wspec="widget"
      :wdata="dbdata[widget.id]"
      :style="widget.style"
      :dark="dark"
      :colorScheme="dbspec.colorScheme || 'default'"
      @db-event="handleDbEvent"
    >
    </db-widget-container>
  </div>
</template>

<script>
import pathOr from 'ramda/es/pathOr';
import DbWidgetContainer from './DbWidgetContainer';
export default {
  name: 'DbGridLayout',
  components: {
    DbWidgetContainer
  },
  props: {
    dbspec: Object,
    dbdata: Object,
    dark: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    /*
    dbdata: {
      handler(newVal, oldVal) {
        console.log(`dbdata prop changed ${JSON.stringify(oldVal)} -> ${JSON.stringify(newVal)}`);
      },
      deep: true
    }
    */
  },
  methods: {
    getClass: function() {
      let layoutSize = pathOr(16, ['layout', 'size'], this.dbspec);
      return layoutSize === 16 ? 'db-grid-layout' : 'db-grid-layout-12';
    },
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
      //return Object.assign({},this.dbdata[widget.name]);
      return this.dbdata[widget.id];
    },
    handleDbEvent(payload) {
      // Pass up to dashboard
      this.$emit('db-event', payload);
    }
  }
};
</script>
<style lang="scss">
.db-dash-item {
  border: 1px solid magenta;
}
</style>
