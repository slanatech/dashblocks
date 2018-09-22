<template>
  <div ref="container" class="dbc-dygraphs"/>
</template>
<script>
import Dygraphs from "dygraphs";

export default {
  props: {
    data: {},
    options: {}
  },
  data() {
    return {
      graph: null
    };
  },
  mounted() {
    this.render();
  },
  watch: {
    data: function() {
      // Rendering is triggered when data changed
      // To force re-render if only options changed, call $refs.child.render
      this.render();
    }
  },
  methods: {
    render() {
      //console.log("Rendering Dtgraph ...");
      this.graph = new Dygraphs(this.$refs.container, this.data, this.options);
    }
  }
};
</script>
<style>
.dbc-dygraphs {
  width: 100%;
  height: 95%;
  display: block;
}
</style>
