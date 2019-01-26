<template>
  <div id="app" :class="[{ collapsed: collapsed }]">
    <div class="content"><router-view /></div>
    <sidebar-menu
      :menu="menu"
      :collapsed="collapsed"
      @collapse="onCollapse"
      :theme="sidebarTheme"
      :showOneChild="true"
    />
  </div>
</template>

<script>
import { SidebarMenu } from 'vue-sidebar-menu';
export default {
  components: {
    SidebarMenu
  },
  data() {
    return {
      menu: [
        {
          header: true,
          title: 'DashBlocks'
        },
        {
          href: '/',
          title: 'Home',
          icon: 'fa fa-user'
        },
        {
          title: 'About',
          href: '/about',
          icon: 'fa fa-chart-area'
        }
      ],
      collapsed: false,
      sidebarTheme: 'default-theme'
    };
  },
  methods: {
    onCollapse(val) {
      this.collapsed = val;
      window.dispatchEvent(new Event('resize'));
    }
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600');

body,
html {
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
}

#app {
  padding-left: 350px;
}

#app.collapsed {
  padding-left: 50px;
}

.content {
  padding: 20px;
}
</style>
