/* DbTrendLine: Trend Line using https://github.com/QingWei-Li/vue-trend */
<template>
  <div class="dbc-trend-line" ref="chart">
    <trend
      :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
      :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
      auto-draw
      smooth
      stroke-width="4"
    >
    </trend>
  </div>
</template>
<script>
import Trend from 'vuetrend';
export default {
  name: 'DbTrendLine',
  components: {
    Trend
  },
  data() {
    return {
      pieChart: undefined,
      pieSize: 150
    };
  },
  props: {
    /*
    wspec: {
      type: Object,
      default: () => this.defaultOptions
    },
    */
    wdata: Object
  },
  computed: {
    data() {
      return this.wdata.trend || [];
    }
  },
  watch: {
    // TODO
  },
  mounted() {
    //window.addEventListener('resize', this.handleResize);
    //this.render();
  },
  methods: {
    initSize() {
      if (this.size != 0) {
        this.pieSize = this.size;
      } else {
        let cH = this.$refs.chart.clientHeight;
        let cW = this.$refs.chart.clientWidth;
        this.pieSize = cH > cW ? cW : cH;
      }
    },
    handleResize(/*event*/) {
      this.$nextTick(() => {
        this.render();
      });
    },
    render() {
      //this.initSize();
      if (this.pieChart) {
        // Remove child element
        this.$refs.chart.removeChild(this.$refs.chart.lastChild);
      }
    }
  }
};
</script>
<style scoped>
.dbc-easy-pie {
  position: relative;
  text-align: center;
}
.dbc-easy-pie .inner-text {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  display: block;
}
</style>
