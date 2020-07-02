<template>
  <div :class="getClass()" :style="getWidgetStyle()">
    <component
      v-bind:is="wspec.type"
      :wspec="wspec"
      :wdata="wdata"
      v-bind="getWidgetProperties()"
      :style="getItemStyle()"
      :dark="dark"
      :colorScheme="colorScheme"
      v-on:db-event="handleDbEvent"
    >
    </component>
  </div>
</template>

<script>
import pathOr from 'ramda/es/pathOr';
// [sv2] TODO remove
// Imports all item components, then whatever is specified in dashboard will be used dynamically
// import DbWidgets from '../dbwidgets';
import log from '../log';
export default {
  name: 'DbWidgetContainer',
  // components: DbWidgets,
  props: {
    layoutClass: String,
    wspec: Object,
    wdata: Object,
    dark: {
      type: Boolean,
      default: false
    },
    colorScheme: {
      type: String,
      default: 'default'
    }
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
      // display:flex + width:100% below - Important ! Firefox resizing
      // TODO Check if additional flex props needs to be set ( i.e. 0 0 auto ... )
      let wStyle = 'min-height: 50px; position: relative;display:flex;';
      if ('style' in this.wspec) {
        wStyle += this.wspec.style;
      }
      return wStyle;
    },
    getWidgetProperties: function() {
      let props = Object.assign({}, pathOr({}, ['properties'], this.wspec), this.wdata);
      return props; //pathOr({}, ['properties'], this.wspec);
      //return {_updated:this.wdata._updated};
    },
    getItemStyle: function() {
      // display:flex + width:100% below - Important ! Firefox resizing
      // TODO Check if additional flex props needs to be set ( i.e. 0 0 auto ... )
      let iStyle = 'position: relative;min-height:100%;width:100%;';
      // TODO pass item-specific styles ?
      if ('height' in this.wspec) {
        iStyle += 'height:' + this.wspec.height + 'px;';
      } else {
        iStyle += 'height:100%';
      }
      return iStyle;
    },
    handleDbEvent(payload) {
      log.debug(`DbWidgetContainer: db-event:${payload.type || 'NO-TYPE'}`);
      // Augment event with widget id
      this.$emit('db-event', Object.assign({}, { id: this.wspec.id }, payload));
    }
  }
};
</script>
<style lang="scss"></style>
