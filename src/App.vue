<template>
  <div id="app">
    <v-app id="inspire" :dark="switchDark">
      <v-navigation-drawer fixed v-model="drawer" :mini-variant.sync="mini" app>
        <v-toolbar flat class="transparent">
          <v-list class="pa-0">
            <v-list-tile avatar>
              <v-list-tile-avatar> <img src="./assets/logo.png" /> </v-list-tile-avatar>

              <v-list-tile-content> <v-list-tile-title>DASHBLOCKS</v-list-tile-title> </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon @click.stop="mini = !mini;"> <v-icon>chevron_left</v-icon> </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-toolbar>

        <v-list dense two-line subheader>
          <v-list-tile v-for="item in items" :key="item.title" avatar :to="item.href">
            <v-tooltip bottom>
              <v-list-tile-avatar slot="activator">
                <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
              </v-list-tile-avatar>
              <span>{{ item.title }}</span>
            </v-tooltip>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple> <v-icon color="amber lighten-3">info</v-icon> </v-btn>
            </v-list-tile-action>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-subheader inset>Add more dashboards ...</v-subheader>
        </v-list>
      </v-navigation-drawer>

      <v-toolbar dense fixed app>
        <v-toolbar-side-icon @click.stop="drawer = !drawer;"></v-toolbar-side-icon>
        <v-toolbar-title>{{ currentRouteName }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon> <v-icon>more_vert</v-icon> </v-btn>
        <div><v-switch v-model="switchDark" label="Dark" hide-details></v-switch></div>
      </v-toolbar>

      <v-content>
        <v-container fluid fill-height>
          <v-layout>
            <v-flex>
              <div class="content"><router-view /></div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      mini: true,
      switchDark: false,
      items: [
        {
          icon: 'bar_chart',
          iconClass: 'teal lighten-2 white--text',
          title: 'Dashboard One',
          subtitle: 'Take one ...',
          href: '/'
        },
        {
          icon: 'bubble_chart',
          iconClass: 'teal lighten-2 white--text',
          title: 'Dashboard Two',
          subtitle: 'Another try',
          href: '/about'
        },
        {
          icon: 'insert_chart',
          iconClass: 'teal lighten-2 white--text',
          title: 'Dashboard Three',
          subtitle: '',
          href: '/dashthree'
        },
        {
          icon: 'insert_chart',
          iconClass: 'teal lighten-2 white--text',
          title: 'Dashboard Four',
          subtitle: '',
          href: '/dashfour'
        },
        {
          icon: 'insert_chart',
          iconClass: 'teal lighten-2 white--text',
          title: 'Dashboard Five',
          subtitle: '',
          href: '/dashfive'
        },
        {
          icon: 'insert_chart',
          iconClass: 'teal lighten-2 white--text',
          title: 'Dashboard Six',
          subtitle: '',
          href: '/dashsix'
        }
      ]
    };
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  },
  methods: {
    // TODO
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
</style>
