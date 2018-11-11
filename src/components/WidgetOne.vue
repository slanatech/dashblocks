<template>
  <div class="dbc-widget">{{ wdata }}</div>
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
  }
};
</script>
