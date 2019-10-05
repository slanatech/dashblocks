/* DashBlocks: Number widget */
<template>
  <div class="dbc-number">
    <div class="dbc-n-content">
      <div v-if="hasIcon" class="dbc-n-layer" style="text-align: right;">
        <div class=""><i :class="iconClass"></i></div>
      </div>
      <div v-if="hasPct" class="dbc-n-layer" style="text-align: right;">
        <div style="float: right;">
          <db-easy-pie :_updated="_updated" :value="percentValue" :lineWidth="8" :size="86" fontSize="14px"></db-easy-pie>
        </div>
      </div>
      <div class="dbc-n-main">
        <div class="dbc-n-hdr">
          <span class="text-md">{{ title }}</span>
        </div>
        <div>
          <div class="dbc-n-value">{{ formattedValue }}</div>
          <div class="text-sm text-faded">{{ subtitle }}</div>
          <div>
            <!--<db-trend-line :_updated="_updated" :data="trend" :gradient="trendGradient" :strokeWidth="4" :height="50"></db-trend-line>-->
            <db-sparkline :_updated="_updated" :data="trend"></db-sparkline>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DbTrendLine from './DbTrendLine';
import DbSparkline from './DbSparkline';
import DbEasyPie from './DbEasyPie';
import { sprintf } from 'sprintf-js';
export default {
  name: 'DbNumber',
  components: {
    DbTrendLine,
    DbSparkline,
    DbEasyPie
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
    format: {
      type: String,
      default: '%d'
    },
    total: {
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
    subtitle: String,
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
      // TODO if we have trend, and don't have explicit icon, show trend up / down
      return this.icon !== '';
    },
    hasPct() {
      return this.total > 0;
    },
    iconClass() {
      return this.icon + ' dbc-number-icon ' + this.getRangeClass();
    },
    formattedValue() {
      return sprintf(this.format, this.value);
    },
    percentValue() {
      if (this.total > 0) {
        return this.value / this.total;
      } else {
        return 0;
      }
    }
  },
  methods: {
    getRangeClass() {
      if (!this.hasRanges) {
        return 'text-neutral';
      }
      if (this.value <= this.ranges[0]) {
        return 'text-success';
      } else if (this.value <= this.ranges[1]) {
        return 'text-warning';
      } else {
        return 'text-alarm';
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

  .dbc-n-main {
    position: relative;
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
    font-size: 250%;
    padding: 6px;
    border-radius: 4px;
    color: white;
    opacity: 0.4;
  }
}
</style>
