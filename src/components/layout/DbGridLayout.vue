<template>
  <div class="db-grid-layout">
    <div :class="'db-dash-item ' + widget.class" v-for="widget in spec.widgets" v-bind:key="widget.id" :style="widget.style">
      {{ widget.name }}
      <component v-bind:is="widget.type" style="height:150px;">
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
    spec: Object,
    data: Object
  }
};
</script>
