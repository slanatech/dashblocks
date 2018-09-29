<template>
  <div class="home">
    <DashOne/>
  </div>
</template>

<script>
// @ is an alias to /src
import DashOne from "@/components/DashOne.vue";

export default {
  name: "home",
  components: {
    DashOne
  }
};
</script>
