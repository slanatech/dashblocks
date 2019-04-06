<template>
  <div id="app" :class="[{ collapsed: collapsed }]">
    <div class="content"><router-view /></div>
    <sidebar-menu
      :menu="menu"
      :collapsed="collapsed"
      @collapse="onCollapse"
      :theme="sidebarTheme"
      :showOneChild="true"
      :width="'300px'"
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
          title: 'Dashboard One',
          icon: 'fa fa-user'
        },
        {
          title: 'Dashboard Two',
          href: '/about',
          icon: 'fa fa-chart-area'
        },
        {
          title: 'Dashboard Three',
          href: '/dashthree',
          icon: 'fa fa-chart-area'
        },
        {
          title: 'Dashboard Four',
          href: '/dashfour',
          icon: 'fa fa-chart-area'
        },
        {
          title: 'Dashboard Five',
          href: '/dashfive',
          icon: 'fa fa-chart-area'
        },
        {
          title: 'Dashboard Six',
          href: '/dashsix',
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
  padding-left: 300px;
}

#app.collapsed {
  padding-left: 50px;
}

.content {
  padding: 20px;
}

.v-sidebar-menu {
  background: #0f2027; /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #0f2027, #203a43, #2c5364); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #0f2027,
    #203a43,
    #2c5364
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  &.vsm-icon {
    background-color: red;
  }
}
</style>
