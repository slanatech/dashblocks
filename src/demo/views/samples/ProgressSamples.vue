<template>
  <div style="position: relative;">
    <div>
      <div>Linear Progress - Default configuration</div>
      <db-linear-progress :value="progressValue"></db-linear-progress>
    </div>
    <div style="margin-top:30px;" class="db-dashboard db-theme-default  db-dark">
      <div>Progress - Default configuration</div>
      <div style="width: 300px;height: 70px;">
      <db-progress title="Requests" subtitle="Number of requests" value="80"></db-progress>
      </div>
    </div>
  </div>
</template>

<script>
import DbLinearProgress from '../../../components/db/DbLinearProgress.vue';
import DbProgress from '../../../components/db/DbProgress.vue';

export default {
  name: 'about',
  components: {
    DbLinearProgress,
    DbProgress
  },
  data() {
    return {
      show: false,
      hData: null,
      chartData: this.generateData(),
      trendData: [10, 5, 11, 28, 32, 9, 21, 6],
      progressValue: 100
    };
  },
  mounted() {
    this.startUpdates();
  },
  methods: {
    startUpdates() {
      let comp = this;
      /*
      setInterval(() => {
        let newval = Math.floor(Math.random() * 100);
        //console.log(`Updating progress to ${newval}`);
        comp.progressValue = newval;
      }, 100);
      */
    },
    generateData() {
      let chartData = [];
      let valuesS1 = [];
      let valuesS2 = [];
      let sTS = Date.now() - 100 * 3600 * 1000;

      for (let i = 0; i < 100; i++) {
        let cTs = sTS + i * 3600 * 1000;
        let d = new Date(cTs);
        valuesS1.push({ date: d, value: Math.random() });
        valuesS2.push({ date: d, value: Math.random() });
      }
      chartData.push({ key: 'Series 1', values: valuesS1 });
      chartData.push({ key: 'Series 2', values: valuesS2 });
      return chartData;
    }
  }
};
</script>
