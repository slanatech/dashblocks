<template>
</template>
<script>
  export default {
    mounted() {
      (function() {
        var d = window.document, s = d.createElement('script');
        s.src = 'https://buttons.github.io/buttons.js';
        s.setAttribute('defer',"");
        s.setAttribute('async',"");
        (d.head || d.body).appendChild(s);
      })();
    }
  }
</script>