/* DashBlocks: Number widget */
<template>
  <div class="dbc-number">
    <div class="dbc-n-hdr">
      <span class="dbc-n-title">{{ title }}</span> <span class="dbc-n-tag">{{ tag }}</span>
    </div>
    <div class="dbc-n-content">
      <div v-if="isTrend" class="dbc-n-layer">
        <db-trend-line
          :_updated="_updated"
          :data="trend"
          style="position: relative; min-height: 100%; height: 100%;"
        ></db-trend-line>
      </div>
      <div class="dbc-n-layer">
        <div class="dbc-v-center"><i class="fa fa-chart-area" style="font-size: 50px;"></i></div>
      </div>
      <div class="dbc-n-layer" style="text-align: right;">
        <div class="dbc-v-center">
          <div class="dbc-n-value">{{ value }}</div>
          <div class="dbc-n-subtitle">200 OK Requests per Second: {{ isTrend }}</div>
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
      test: 'test'
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

  .dbc-n-hdr {
    border-bottom: 1px solid #4285f4;
  }

  .dbc-n-title {
    font-size: 20px;
  }

  .dbc-n-tag {
    float: right;
    background: #4285f4;
    margin-right: 10px;
    margin-top: 2px;
  }

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

  .dbc-v-center {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    margin: 0px 10px 0px 10px;
  }

  .dbc-n-value {
    font-size: 36px;
  }

  .dbc-n-subtitle {
    font-size: 14px;
  }
}
</style>
