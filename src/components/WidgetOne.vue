<template>
  <div>{{ val }}</div>
</template>

<script>
export default {
  name: 'WidgetOne',
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
