<template>
  <div :class="getClass()" :style="getWidgetStyle()">
    <component
      v-bind:is="wspec.type"
      :wspec="wspec"
      :wdata="wdata"
      v-bind="getWidgetProperties()"
      :style="getItemStyle()"
    >
    </component>
  </div>
</template>

<script>
import pathOr from 'ramda/es/pathOr';
// Imports all item components, then whatever is specified in dashboard will be used dynamically
import DbWidgets from '../dbwidgets';
export default {
  name: 'DbWidgetContainer',
  components: DbWidgets,
  props: {
    layoutClass: String,
    wspec: Object,
    wdata: Object
  },
  data() {
    return {
      test: 'test'
    };
  },
  /* TODO Check if needed
  computed: {
    foo() {
      return this.wdata._updated;
    }
  },
  watch: {
    foo() {
      console.log('DbWidgets: wdata._updated changed');
    }
  },
  */
  methods: {
    getClass: function() {
      let wClass = 'db-widget-container ';
      wClass += this.layoutClass;
      if ('class' in this.wspec) {
        wClass += ' ' + this.wspec.class;
      }
      return wClass;
    },
    getWidgetStyle: function() {
      let wStyle = 'min-height: 50px; position: relative;';
      if ('style' in this.wspec) {
        wStyle += this.wspec.style;
      }
      return wStyle;
    },
    getWidgetProperties: function() {
      let props = Object.assign({}, pathOr({}, ['properties'], this.wspec), this.wdata);
      return props; //pathOr({}, ['properties'], this.wspec);
    },
    getItemStyle: function() {
      let iStyle = 'position: relative;min-height:100%;';
      // TODO pass item-specific styles ?
      if ('height' in this.wspec) {
        iStyle += 'height:' + this.wspec.height + 'px;';
      } else {
        iStyle += 'height:100%';
      }
      return iStyle;
    }
  }
};
</script>
<style lang="scss"></style>
