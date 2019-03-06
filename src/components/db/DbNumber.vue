/* DashBlocks: Number widget */
<template>
  <div class="dbc-number">
    <div class="dbc-n-hdr">
      <span class="text-md">{{ title }}</span> <span class="db-badge db-float-right">{{ badge }}</span>
    </div>
    <div class="dbc-n-content">
      <div v-if="hasTrend" class="dbc-n-layer">
        <db-trend-line
          :_updated="_updated"
          :data="trend"
          :gradient="trendGradient"
          :strokeWidth="4"
          style="height: 80%; width: 80%;position: absolute;top:20%; right: 0%;"
        ></db-trend-line>
      </div>
      <div v-if="hasIcon" class="dbc-n-layer">
        <div class="db-v-center"><i :class="iconClass"></i></div>
      </div>
      <div class="dbc-n-layer" style="text-align: right;">
        <div class="db-v-center">
          <div class="dbc-n-value">{{ value }}</div>
          <div class="text-sm text-faded">200 OK Requests per Second: {{ hasTrend }}</div>
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
    ranges: {
      type: Array,
      default: () => []
    },
    icon: {
      type: String,
      default: ''
    },
    title: String,
    badge: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // TODO Better gradient for light and dark
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
    hasTrend() {
      return this.trend && Array.isArray(this.trend) && this.trend.length > 0;
    },
    hasRanges() {
      return this.ranges && Array.isArray(this.ranges) && this.ranges.length == 2;
    },
    hasIcon() {
      return this.icon !== '';
    },
    iconClass() {
      return this.icon + ' dbc-number-icon ' + this.getRangeClass();
    }
  },
  methods: {
    getRangeClass() {
      if (!this.hasRanges) {
        return 'bg-neutral';
      }
      if (this.value <= this.ranges[0]) {
        return 'bg-success';
      } else if (this.value <= this.ranges[1]) {
        return 'bg-warning';
      } else {
        return 'bg-alarm';
      }
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
    font-size: 210%;
  }

  .dbc-n-subtitle {
    font-size: 100%;
  }

  .dbc-number-icon {
    font-size: 210%;
    padding: 6px;
    border-radius: 4px;
    color: white;
    opacity: 0.6;
  }
}
</style>
