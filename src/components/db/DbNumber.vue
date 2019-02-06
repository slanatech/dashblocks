/* DashBlocks: Number widget * TODO: use https://github.com/rendro/easy-pie-chart/blob/master/dist/easypiechart.js *
and: * https://github.com/DotNetAge/vue-easy-pie-chart/blob/master/package.json */
<template>
  <div class="swsbox float-e-margins">
    <div class="swsbox-title">
      <span class="sws-widget-extra label pull-right">label</span>
      <h5 class="sws-widget-title">Title</h5>
    </div>
    <div class="swsbox-content" style="display: block;">
      <div class="swsbox-trend"><i class="sws-widget-trend fa"></i></div>
      <div class="swsbox-values">
        <h1 class="sws-widget-value no-margins">111</h1>
        <small class="sws-widget-subtitle">Subtitle</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DbNumber',
  props: {
    wspec: Object,
    wdata: Object
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
.pull-right {
  float: right !important;
}
.swsbox {
  clear: both;
  margin-bottom: 10px;
  margin-top: 0;
  padding: 0;
}
.swsbox-title {
  -moz-border-bottom-colors: none;
  -moz-border-left-colors: none;
  -moz-border-right-colors: none;
  -moz-border-top-colors: none;
  background-color: #ffffff;
  border-color: #e7eaec;
  border-image: none;
  border-style: solid solid solid;
  border-width: 1px 0 1px;
  color: inherit;
  margin-bottom: 0px;
  padding: 5px 10px 5px 10px;
}

.swsbox-title h5 {
  margin-bottom: 0px;
}

.swsbox-extra-padding {
  padding: 10px;
}

.swsbox-footer {
  color: inherit;
  border-top: 1px solid #e7eaec;
  font-size: 90%;
  background: #ffffff;
  padding: 10px 15px;
}

.stat-percent {
  float: right;
}

.float-e-margins .btn {
  margin-bottom: 5px;
}

.swsbox-content {
  position: relative;
  overflow: hidden;
  display: inline-block;
  background-color: #ffffff;
  width: 100%;
  color: inherit;
  padding: 10px 10px 10px 10px;
  border-color: #e7eaec;
  border-image: none;
  border-style: solid solid none;
  border-width: 1px 0;
}

.swsbox-values {
  position: relative;
}

.swsbox-trend {
  display: inline-block;
  width: 100%;
  text-align: right;
  padding-right: 18px;
  position: absolute;
  bottom: 5px;
  font-size: 48px;
  color: #e7eaec;
}

.swsbox-trend-container {
  position: relative;
  display: inline-block;
  width: 100%;
}

.swsbox-trend-container svg {
  display: inline-block;
  position: absolute;
  top: 75%;
  -webkit-transform: translateY(-75%);
  -ms-transform: translateY(-75%);
  transform: translateY(-75%);
  right: 0;
}

.swsbox-collapse2 {
  padding-right: 10px;
}

.swsbox-info {
  /*color: #8a6d3b; */
  color: #31708f;
}

.swsbox-info .swsbox-content,
.swsbox-info .swsbox-title {
  /*background-color: #fcf8e3;*/
  background-color: #d9edf7;
}

.swsbox-info .swsbox-content {
  /*border-color: #faebcc;*/
  border-color: #bce8f1;
}

.swsbox-info-subtitle {
  font-size: 16px;
  font-weight: 600;
}
</style>
