/* DashBlocks: Number widget */
<template>
  <div class="db-number">
    <div class="db-n-content">
      <div v-if="hasTrend" class="db-n-layer">
        <db-sparkline :_updated="_updated" :data="trend" :max="trendMax" :height="60" style="position:absolute;bottom:0;width:100%;"></db-sparkline>
      </div>
      <div v-if="hasIcon" class="db-n-layer" style="text-align: right;">
        <div class=""><i :class="iconClass"></i></div>
      </div>
      <div v-if="hasPct" class="db-n-layer" style="text-align: right;">
        <div style="float: right;">
          <db-easy-pie :_updated="_updated" :value="percentValue" :percentRanges="percentRanges" :lineWidth="8" :size="86" :dark="dark" fontSize="14px"></db-easy-pie>
        </div>
      </div>
      <div class="db-n-main">
        <div class="db-n-hdr">
          <span class="text-md db-txt-faded">{{ title }}</span>
        </div>
        <div>
          <div class="db-n-value db-txt-highlight">{{ formattedValue }}</div>
          <div class="text-sm db-txt-faded">{{ subtitle }}</div>
          <div>
            <!--<db-trend-line :_updated="_updated" :data="trend" :gradient="trendGradient" :strokeWidth="4" :height="50"></db-trend-line>-->
          </div>
          <div class="text-xxs db-txt-faded db-n-footer">{{ footer }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DbSparkline from './DbSparkline';
import DbEasyPie from './DbEasyPie';
import { dbStdProps } from '../mixins/dbstdprops';
import { sprintf } from 'sprintf-js';
export default {
  name: 'DbNumber',
  components: {
    DbSparkline,
    DbEasyPie
  },
  mixins: [dbStdProps],
  props: {
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
    trendMax: {
      type: Number,
      default: null
    },
    ranges: {
      type: Array,
      default: () => []
    },
    percentRanges: {
      type: Array,
      default: () => []
    },
    icon: {
      type: String,
      default: ''
    },
    title: String,
    subtitle: String,
    qualifier: {
      type: String,
      default: ''
    },
    footer: {
      type: String,
      default: ''
    },
    // TODO ???
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
    dark: function() {
      this.scheduleUpdate(true);
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
      return this.icon + ' db-n-icon ' + this.getRangeClass();
    },
    formattedValue() {
      return sprintf(this.format, this.value, this.qualifier);
    },
    percentValue() {
      if (this.total > 0) {
        return (this.value / this.total) * 100;
      } else {
        return 0;
      }
    }
  },
  methods: {
    getRangeClass() {
      if (!this.hasRanges) {
        return 'db-txt-faded';
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
