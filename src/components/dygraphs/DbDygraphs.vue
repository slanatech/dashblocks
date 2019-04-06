<template>
  <div ref="container" class="db-dygraphs" />
</template>
<script>
import Dygraphs from 'dygraphs';
import 'dygraphs/dist/dygraph.css';

export default {
  props: {
    _updated: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object
    }
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
      //console.log("Rendering Dygraph ...");
      this.graph = new Dygraphs(this.$refs.container, this.data, this.options);
    }
  }
};
</script>
<style>
.db-dygraphs {
  width: 100%;
  height: 100%;
  position: relative;
}
.dygraph-axis-label {
  font-size: 12px;
}
.dygraph-ylabel {
  font-size: 16px;
}
.dygraph-title {
  font-size: 16px;
  font-weight: normal;
  text-align: left;
}
</style>
