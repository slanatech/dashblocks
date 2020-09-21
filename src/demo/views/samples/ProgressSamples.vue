<template>
  <div style="position: relative;">
    <div>
      <div>Linear Progress - Default configuration</div>
      <db-linear-progress :value="progressValue"></db-linear-progress>
    </div>
    <div style="margin-top:30px;" class="db-dashboard db-theme-default  db-dark">
      <div>Progress - Default configuration</div>
      <div style="width: 400px;border: 1px solid #0d47a1;">
        <db-progress title="Requests" subtitle="Total Number of requests" value="80" :trend="trendData"></db-progress>
      </div>
    </div>
    <div style="margin-top:30px;" class="db-dashboard db-theme-default  db-dark">
      <div>Multi-Progress - Default configuration</div>
      <div style="width: 400px;">
        <db-multi-progress title="CPU Usage" :data="multiProgressData" :progress-height="15" :progress-color="'#4e79a7'"></db-multi-progress>
      </div>
    </div>
  </div>
</template>

<script>
import DbLinearProgress from '../../../components/db/DbLinearProgress.vue';
import DbProgress from '../../../components/db/DbProgress.vue';
import DbMultiProgress from '../../../components/db/DbMultiProgress.vue';

export default {
  name: 'about',
  components: {
    DbLinearProgress,
    DbProgress,
    DbMultiProgress
  },
  data() {
    return {
      show: false,
      hData: null,
      chartData: this.generateData(),
      trendData: [10, 5, 11, 28, 32, 9, 21, 6],
      progressValue: 100,
      multiProgressData: []
    };
  },
  mounted() {
    this.initialize();
    this.startUpdates();
  },
  methods: {
    initialize(){
      this.multiProgressData = [
        {title: 'host1.acme.com', value: 20},
        {title: 'host2.acme.com', value: 30},
        {title: 'host3.acme.com', value: 40},
        {title: 'host4.acme.com', value: 50},
        {title: 'host5.acme.com', value: 60},
        {title: 'host6.acme.com', value: 70},
        {title: 'host7.acme.com', value: 80},
        {title: 'host8.acme.com', value: 90},
        {title: 'host9.acme.com', value: 100}
      ]
    },
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
