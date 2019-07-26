<template>
  <div style="position: relative;width: 100%;">
    <div style="width: 100%">
      <div>Default configuration</div>
      <db-dygraphs-bar :data="chartData.dthData" class="db-dygraphs-sample"></db-dygraphs-bar>
    </div>
    <br />
    <div style="width: 100%">
      <div>Two Series</div>
      <db-dygraphs-bar :data="chartData.dthData2" class="db-dygraphs-sample"></db-dygraphs-bar>
    </div>
    <br />
    <div>
      <div>Dark mode. TODO Font color in DbDygraphs</div>
      <db-dygraphs-bar :data="chartData.dthData2" :dark="true" class="db-dygraphs-sample" style="background-color: #0f2027; color: white;"></db-dygraphs-bar>
    </div>
  </div>
</template>

<script>
import DbDygraphsBar from '../../../components/dygraphs/DbDygraphsBar';

export default {
  name: 'about',
  components: {
    DbDygraphsBar
  },
  data() {
    return {
      chartData: this.generateData()
    };
  },
  methods: {
    generateData() {
      let dthData = [];
      let dthData2 = [];
      let dthData3 = [];
      let sTS = Date.now() - 100 * 3600 * 1000;

      for (let i = 0; i < 100; i++) {
        let cTs = sTS + i * 3600 * 1000;
        let d = new Date(cTs);
        let r = Math.random();
        dthData.push([d, r, r + 0.5]);
        dthData2.push([d, Math.random(), Math.random()]);
        dthData3.push(Math.random());
      }

      return {
        dthData: dthData,
        dthData2: dthData2,
        dthData3: dthData3
      };
    }
  }
};
</script>
<style>
.db-dygraphs-sample {
  position: relative;
  width: 100%;
  height: 200px;
}
</style>
