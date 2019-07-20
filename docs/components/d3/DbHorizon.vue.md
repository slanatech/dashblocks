---
title:  "DbHorizon"
---
# DbHorizon

D3 Horizon Chart.
Based on [https://observablehq.com/@d3/horizon-chart](https://observablehq.com/@d3/horizon-chart)

DbHorizon accepts data in the following format:

```json
[
  {key:'Series1', values:[{date:new Date(),value: 1},{date:new Date(),value: 2}]},
  {key:'Series2', values:[{date:new Date(),value: 2},{date:new Date(),value: 1}]}
]
```


### Properties

|Name           |Type     |Required|Default |Description
|:--------------|:--------|:-------|:-------|:----------
|**_updated**|number|false|0|Change to trigger data update.<br/>Set this to current timestamp to inform component that data has been updated.<br/>Helpful in situations when, for example, only values in array are changed.<br/>See [https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats](https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats)
|**dark**|boolean|false|false|Enable dark mode<br/><br/>`true,false`
|**data**|array|false|() => []|Chart Data
|**seriesHeight**|number|false|23|Height of each series in pixels.
|**colorSteps**|number|false|7|Number of overlapping color steps, in range 1-9
|**scheme**|string|false|'schemePuBuGn'|Color scheme<br/>Use one of Discrete Diverging color schemes from d3-scale-chromatic:<br/><br/>`schemeBrBG,schemePRGn, ...`<br/><br/>See [https://github.com/d3/d3-scale-chromatic](https://github.com/d3/d3-scale-chromatic)

### Examples
<br/>
<br/>


<db-horizon-samples></db-horizon-samples>

#### Code

```vue
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

```
