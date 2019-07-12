<template>
  <div style="position: relative;">
    <div>
      <div>Default configuration</div>
      <db-horizon :data="chartData"></db-horizon>
    </div>
    <div>
      <br />
      <div>Adjust seriesHeight: make each series higher (50px)</div>
      <db-horizon :data="chartData" :seriesHeight="50"></db-horizon>
    </div>
    <div>
      <br />
      <div>Adjust overlap: less color steps (2)</div>
      <db-horizon :data="chartData" :colorSteps="2"></db-horizon>
    </div>
    <div>
      <br />
      <div>Adjust overlap: more color steps (9)</div>
      <db-horizon :data="chartData" :colorSteps="9"></db-horizon>
    </div>
    <div>
      <br />
      <div>Different color scheme (schemeYlOrBr)</div>
      <db-horizon :data="chartData" scheme="schemeYlOrBr"></db-horizon>
    </div>
    <div>
      <br />
      <div>Dark mode. TODO Font color in DbHorizon</div>
      <db-horizon :data="chartData" :dark="true" style="background-color: #0f2027; color: white;"></db-horizon>
    </div>
  </div>
</template>

<script>
import DbHorizon from '../../../components/d3/DbHorizon';

export default {
  name: 'about',
  components: {
    DbHorizon
  },
  data() {
    return {
      show: false,
      hData: null,
      chartData: this.generateData()
    };
  },
  methods: {
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
