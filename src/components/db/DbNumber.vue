/* DashBlocks: Number widget * TODO: use https://github.com/rendro/easy-pie-chart/blob/master/dist/easypiechart.js *
and: * https://github.com/DotNetAge/vue-easy-pie-chart/blob/master/package.json */
<template>
  <div class="dbc-number">
    <div class="dbc-n-hdr">
      <span class="dbc-n-title">{{ title }}</span> <span class="dbc-n-tag">{{ tag }}</span>
    </div>
    <div class="dbc-n-content">
      <div class="dbc-n-icon">OPA</div>
      <div class="dbc-n-payload">
        <div class="dbc-n-values">
          <div class="dbc-n-value">11111111</div>
          <div class="dbc-n-subtitle">200 OK Requests per Second</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DbNumber',
  props: {
    wspec: Object,
    wdata: Object,
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
    val() {
      //console.log(`Computed val: ${this.wdata.value}`);
      return this.wdata.value;
    }
  }
};
</script>
<style lang="scss">
.dbc-number {
  width: 100%;
  height: 100%;
  background-color: aquamarine;
  display: flex;
  flex-flow: column;

  .dbc-n-hdr {
    background: tomato;
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
    background-color: antiquewhite;
    flex: 2;
    position: relative;
  }

  .dbc-n-icon {
    position: absolute;
    width: 100%;
    height: 100%;
    background: fuchsia;
  }

  .dbc-n-payload {
    position: absolute;
    text-align: right;
    width: 100%;
    height: 100%;
  }

  .dbc-n-values {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    margin-right: 10px;
  }

  .dbc-n-value {
    font-size: 36px;
  }

  .dbc-n-subtitle {
    font-size: 14px;
  }
}

/*
.number-wrapper {
  width: 100%;
  position: relative;
}
.number-chart {
  position: relative;
  display: inline-block;
  width: 90px;
  height: 90px;
  text-align: center;
  vertical-align: bottom;
}
.number-icon {
  position: relative;
  display: inline-block;
  width: 90px;
  height: 90px;
  text-align: center;
  vertical-align: middle;
  line-height: 1;
}
.number-icon:before {
  font-size: 85px;
}
.number-icon-red:before {
  color: #fa603d;
}
.number-icon-green:before {
  color: #4b6a41;
}
.number-icon-yellow:before {
  color: #fabb3d;
}
.number-icon-neutral:before {
  color: #e4e9f0;
}
.number-chart canvas {
  position: absolute;
  top: 0;
  left: 0;
}
.percent {
  display: inline-block;
  line-height: 90px;
  z-index: 2;
  font-size: 20px;
}
.percent:after {
  content: '%';
  margin-left: 0.1em;
  font-size: 18px;
}
.number-values {
  position: relative;
  overflow: hidden;
  display: inline-block;
  width: calc(100% - 95px);
  height: 90px;
  vertical-align: top;
  line-height: 1;
}
.number-values-total {
  position: relative;
  overflow: hidden;
  display: inline-block;
  width: 100%;
  height: 90px;
  vertical-align: top;
  line-height: 1;
}
.number-data {
  text-align: right;
  display: inline-block;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
}
.number-value {
  text-shadow: none;
  font-size: 36px;
  font-weight: normal;
  text-align: right;
}
.number-subtitle {
  font-size: 14px;
}
.number-sparkline {
  display: inline-block;
  width: 100%;
  text-align: right;
  position: absolute;
  bottom: 2px;
}
.number-pointer {
  cursor: pointer;
}
*/
</style>
