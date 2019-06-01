<template>
  <div :style="{ position: 'absolute', height: '100%', width: '100%' }">
    <v-btn fixed dark fab top right color="pink" @click="handleUpdateSpec"> <v-icon>refresh</v-icon> </v-btn>
    <div ref="editor" :style="{ position: 'absolute', height: '100%', width: '100%' }"></div>
  </div>
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
      currentHitIdx: null,
      saving: false
    };
  },
  watch: {
    dbSpecText: function(val) {
      if (!this.saving) {
        this.editor.setValue(val, 1);
      } else {
        this.saving = false;
      }
    }
  },
  computed: {
    dbSpecText() {
      return this.$store.state.dashboardSpec;
    }
  },
  mounted: function() {
    let vm = this;
    let lang = this.lang || 'json';
    let theme = this.theme || 'chrome';

    require('brace/ext/emmet');
    require('brace/mode/json');
    require('brace/theme/chrome');
    require('brace/ext/searchbox');

    let editor = (vm.editor = ace.edit(this.$refs.editor));
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

    editor.setValue(this.dbSpecText, 1);
    this.editor = editor;
  },
  methods: {
    handleUpdateSpec: function() {
      this.saving = true;
      this.$store.dispatch('setDashboardSpec', { spec: this.editor.getValue() });
    }
  }
};
</script>
<style></style>
