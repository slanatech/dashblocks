/* DashBlocks: Number widget */
<template>
  <div class="dbc-number">
    <div class="dbc-n-hdr">
      <span class="text-md">{{ title }}</span> <span class="db-tag db-float-right">{{ tag }}</span>
    </div>
    <div class="dbc-n-content">
      <div v-if="isTrend" class="dbc-n-layer">
        <db-trend-line
          :_updated="_updated"
          :data="trend"
          :gradient="trendGradient"
          :strokeWidth="6"
          style="position: relative; min-height: 100%; height: 100%;"
        ></db-trend-line>
      </div>
      <div class="dbc-n-layer">
        <div class="db-v-center"><i class="fa fa-chart-area text-x3l bg-bad dbc-number-icon"></i></div>
      </div>
      <div class="dbc-n-layer" style="text-align: right;">
        <div class="db-v-center">
          <div class="text-xxl">{{ value }}</div>
          <div class="text-sm text-faded">200 OK Requests per Second: {{ isTrend }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DbTrendLine from './DbTrendLine';
export default {
  name: 'DbNumber',
  components: {
    DbTrendLine
  },
  props: {
    _updated: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 0
    },
    trend: {
      type: Array,
      default: () => []
    },
    title: String,
    tag: String
  },
  data() {
    return {
      trendGradient: ['#DCEDC8', '#FFF9C4', '#FFCCBC']
    };
  },
  /*
  watch: {
    wdata: {
      handler(newVal, oldVal) {
        console.log(`wdata prop changed ${JSON.stringify(oldVal)} -> ${JSON.stringify(newVal)}`);
      },
      deep: true
    }
  },
  */
  computed: {
    isTrend() {
      return this.trend && Array.isArray(this.trend) && this.trend.length > 0;
    }
  }
};
</script>
<style lang="scss">
.dbc-number {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;

  .dbc-n-content {
    width: 100%;
    flex: 2;
    position: relative;
  }

  .dbc-n-layer {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .dbc-n-value {
    font-size: 250%;
  }

  .dbc-n-subtitle {
    font-size: 100%;
  }

  .dbc-number-icon {
    padding: 8px;
    border-radius: 4px;
    color: white;
    opacity: 0.7;
  }
}
</style>
