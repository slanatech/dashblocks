<template>
  <div v-html="markup"></div>
</template>
<script>
export default {
  name: 'DbMarkup',
  props: {
    markup: {
      type: String,
      default: ''
    }
  }
};
</script>
