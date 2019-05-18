<template>
  <div :style="{ position: 'absolute', height: '100%', width: '100%' }"></div>
</template>
<script>
let ace = require('brace');

export default {
  name: 'CodeViewer',
  props: {
    lang: String,
    theme: String,
    height: true,
    width: true
  },
  data: function() {
    return {
      editor: null,
      editorUpdating: false,
      mapping: null,
      currentHitIdx: null
    };
  },
  watch: {},
  computed: {},
  mounted: function() {
    let vm = this;
    let lang = this.lang || 'json';
    let theme = this.theme || 'chrome';

    require('brace/ext/emmet');
    require('brace/mode/json');
    require('brace/theme/chrome');
    require('brace/ext/searchbox');

    let editor = (vm.editor = ace.edit(this.$el));
    vm.editorUpdating = false;

    this.$emit('init', editor);

    editor.setOptions({
      enableEmmet: true,
      scrollPastEnd: false,
      showLineNumbers: true
    });
    editor.getSession().setMode('ace/mode/' + lang);
    editor.setTheme('ace/theme/' + theme);
    editor.$blockScrolling = Infinity;

    editor.setValue(this.$store.state.dashboardSpec, 1);
  }
};
</script>
<style></style>
