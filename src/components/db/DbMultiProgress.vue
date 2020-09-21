/* DashBlocks: Multi-Progress
 * Shows multiple progress values simultaneously */
<template>
  <div class="db-mpct">
    <div class="text-xl db-txt-faded">{{ title }}</div>
    <div v-for="(item,index) in data" v-bind:key="index">
      <div class="db-rsb" style="align-items: center;">
        <div class="text-md db-txt-faded">{{ item.title }}</div>
        <div class="text-xl db-txt-highlight" style="text-align: right">{{ formatValue(item.value) }}</div>
      </div>
      <db-linear-progress :value="item.value" :height="progressHeight" :color="progressColor" :reverse="progressReverse" :color-mode="progressColorMode"></db-linear-progress>
    </div>
  </div>
</template>

<script>
import DbSparkline from './DbSparkline';
import DbLinearProgress from './DbLinearProgress';
import DbEasyPie from './DbEasyPie';
import { dbStdProps } from '../mixins/dbstdprops';
import { sprintf } from 'sprintf-js';
export default {
  name: 'DbNumber',
  components: {
    //DbLinearProgress
  },
  mixins: [dbStdProps],
  props: {
    value: {
      type: Number,
      default: 0
    },
    format: {
      type: String,
      default: '%d %s'
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
    data: {
      type: Array,
      default: () => []
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
      default: '%'
    },
    footer: {
      type: String,
      default: ''
    },
    // TODO ???
    badge: {
      type: String,
      default: ''
    },
    progressHeight: {
      type: Number,
      default: 20
    },
    progressColor: {
      type: String,
      default: null
    },
    progressColorMode: {
      type: String,
      default: 'default'
    },
    progressReverse: {
      type: Boolean,
      default: false
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
    },
    formatValue(v) {
      return sprintf(this.format, v, this.qualifier);
    }
  }
};
</script>
