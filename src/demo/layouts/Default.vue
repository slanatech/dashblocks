<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="text-grey-4 db-toolbar" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="leftShown = !leftShown" />

        <q-toolbar-title>
          dashblocks
        </q-toolbar-title>

        <q-toggle v-model="dark" icon="brightness_medium">
          <q-tooltip anchor="bottom right" self="center middle">Dark Mode</q-tooltip>
        </q-toggle>

        <q-toggle v-model="rotateEnabled" icon="dynamic_feed">
          <q-tooltip anchor="bottom right" self="center middle">Slide show</q-tooltip>
        </q-toggle>

        <!--
        <q-btn dense flat size="md" round icon="refresh" @click="performRefresh" />
        <q-btn-toggle v-model="refreshTimeout" text-color="blue-grey-8" toggle-text-color="grey-4" size="md" dense flat :options="refreshOptions" />
        -->
        <q-btn dense flat round icon="menu" @click="rightShown = !rightShown" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above :mini="miniState" v-model="leftShown" side="left" bordered @on-layout="handleLeftLayout">
      <q-list>
        <q-item clickable v-ripple v-for="item in menuItems" v-bind:key="item.link" :to="item.link" exact>
          <q-item-section avatar>
            <q-icon :name="item.icon">
              <q-tooltip anchor="top right" self="center middle">
                {{ item.title }}
              </q-tooltip>
            </q-icon>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-expansion-item
        :content-inset-level="0.3"
        v-for="menuSection in menuSections"
        v-bind:key="menuSection.title"
        :icon="menuSection.icon"
        :label="menuSection.title"
        :class="`ei-${menuSection.title}`"
        expand-separator
        v-model="menuSection.expanded"
        v-on:click="setMiniState(false)"
      >
        <q-tooltip anchor="top right" self="center middle" :target="`.ei-${menuSection.title} i`">{{ menuSection.title }}</q-tooltip>
        <q-list>
          <q-item clickable v-ripple v-for="item in menuSection.items" v-bind:key="item.link" :to="item.link" exact>
            <q-item-section avatar>
              <q-icon :name="item.icon" size="xs">
                <q-tooltip anchor="top right" self="center middle">
                  {{ item.title }}
                </q-tooltip>
              </q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.title }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
      <q-separator></q-separator>
      <q-btn :ripple="false" class="full-width" flat :icon="miniState ? 'chevron_right' : 'chevron_left'" size="md" @click="toggleMiniState" />
    </q-drawer>

    <q-drawer v-model="rightShown" side="right" bordered overlay :width="600">
      <code-viewer></code-viewer>
    </q-drawer>

    <q-page-container>
      <transition :name="transitionName">
        <q-page class="db-page">
          <q-toolbar style="margin: 4px 4px 4px 0px;">
            <q-icon class="text-primary" name="trending_up" size="md" />
            <!--<q-avatar :icon="icon" color="primary" text-color="white" size="md"/>-->
            <q-toolbar-title> {{ currentRouteName }} </q-toolbar-title>
          </q-toolbar>
          <router-view />
        </q-page>
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import dbColors from '../../components/dbcolors';
import CodeViewer from '../views/CodeViewer.vue';

export default {
  name: 'DbUxLayout',
  components: { CodeViewer },
  data() {
    return {
      miniState: true,
      leftShown: false,
      rightShown: false,
      transitionName: '',
      testColors: null,
      menuItems: [
        { title: 'Dashboard Showcase', link: '/', icon: 'trending_up' },
        { title: 'Chart.JS Showcase', link: '/chartjs', icon: 'pie_chart' },
        { title: 'Dashboard Three', link: '/dashthree', icon: 'pie_chart' },
        { title: 'Dashboard Four', link: '/dashfour', icon: 'pie_chart' },
        { title: 'Dashboard Five', link: '/dashfive', icon: 'pie_chart' },
        { title: 'Dashboard Six', link: '/dashsix', icon: 'pie_chart' },
        { title: 'Dygraphs Dynamic', link: '/dygraphsdynamic', icon: 'schedule' }
      ],
      menuSections: [
        {
          title: 'Dynamic Dashboards',
          icon: 'trending_up',
          expanded: false,
          items: [
            { title: 'Dynamic Timelines', link: '/dynamictimelines', icon: 'schedule' },
            { title: 'Dynamic Timelines Dygraphs', link: '/dynamictimelinesdygraphs', icon: 'schedule' },
            { title: 'Dynamic Sales Dashboard', link: '/dynamicsalesdashboard', icon: 'schedule' },
            { title: 'Sales Funnel Dashboard', link: '/salesfunnel', icon: 'filter_alt' },
            { title: 'Sales Sunburst Dashboard', link: '/salessunburst', icon: 'camera' },
            { title: 'Dynamic Sankey', link: '/dynamicsankey', icon: 'camera' }
          ]
        },
        {
          title: 'Overlay Dashboards',
          icon: 'layers',
          expanded: false,
          items: [
            { title: 'Overlay Infographic', link: '/overlay', icon: 'flip_to_front' },
            { title: 'Overlay Image', link: '/overlayimage', icon: 'flip_to_front' },
          ]
        },
        {
          title: 'Geo Dashboards',
          icon: 'thumbs_up_down',
          expanded: false,
          items: [
            { title: 'MapBox US', link: '/geomapboxus', icon: 'map' },
          ]
        },
        {
          title: 'Experimental',
          icon: 'thumbs_up_down',
          expanded: false,
          items: [
            { title: 'Playground', link: '/playground', icon: 'waves' },
            { title: 'Ridgeline', link: '/dashridgeline', icon: 'waves' },
            { title: 'Perspective', link: '/perspective', icon: 'waves' },
            { title: 'Spark Line Map', link: '/sparklinemap', icon: 'waves' },
            { title: 'Spark Line Map Dynamics', link: '/sparklinemapdyn', icon: 'waves' },
            { title: 'Spark Heat Map', link: '/sparkheatmap', icon: 'waves' },
            { title: 'Dynamic Perspective', link: '/dynp', icon: 'trending_up' },
            { title: 'Sankey Dashboard', link: '/sankeydashboard', icon: 'trending_up' }
         ]
        },
        {
          title: 'Samples',
          icon: 'toc',
          expanded: false,
          items: [
            { title: 'First Dashboard', link: '/sampledashboard', icon: 'code' },
            { title: 'DbHorizon', link: '/dbhorizonsamples', icon: 'code' },
            { title: 'DbDygraphsBar', link: '/dbdygraphsbarsamples', icon: 'code' }
          ]
        }
      ],
      /*
      refreshOptions: [
        { icon: 'pause', value: 0 },
        { label: '1s', value: 1000 },
        { label: '5s', value: 5000 },
        { label: '15s', value: 15000 },
        { label: '30s', value: 30000 },
        { label: '1m', value: 60000 }
      ],
      */
      rotateEnabled: false,
      rotateCurrent: -1,
      rotateOptions: ['/', '/chartjs', '/dashthree', '/dashfour', '/dashsix', '/dygraphsdynamic']
    };
  },
  computed: {
    ...mapState({
      rotateTrigger: state => state.rotateTrigger
    }),
    currentRouteName() {
      return this.$route.name;
    },
    refreshTimeout: {
      get() {
        return this.$store.state.refreshTimeout;
      },
      set(value) {
        this.setRefreshTimeout({ timeout: value });
      }
    },
    dark: {
      get() {
        return this.$store.state.dark;
      },
      set(value) {
        this.setDark({ dark: value });
      }
    }
  },
  watch: {
    dark: {
      handler: function(val) {
        this.$q.dark.set(val);
      }
    },
    rotateEnabled: {
      handler: function(val) {
        if (val) {
          this.rotateCurrent = -1;
        }
      }
    },
    rotateTrigger: {
      handler: function() {
        if (!this.rotateEnabled) {
          return;
        }
        console.log(`Rotating screen: ${Date.now()}`);
        this.rotateCurrent++;
        if (this.rotateCurrent >= this.rotateOptions.length) {
          this.rotateCurrent = 0;
        }
        this.transitionName = 'fade';
        this.$router.push(this.rotateOptions[this.rotateCurrent]);
        this.$nextTick(() => {
          setTimeout(() => {
            this.transitionName = '';
          }, 550);
        });
      }
    }
  },
  mounted() {
    //this.testColors = dbColors.getColors(true); // TEMP TODO REMOVE
    this.initialize();
  },
  methods: {
    ...mapActions({
      setDark: 'setDark',
      initRefresh: 'initRefresh',
      setRefreshTimeout: 'setRefreshTimeout', // map `this.getStats()` to `... dispatch('getStats')`
      performRefresh: 'performRefresh'
    }),
    initialize(){
      this.$q.dark.set(this.dark);
      this.initRefresh();
      // Create color schemes
      dbColors.setColorScheme('Tableau', {
        light: dbColors.d3ScaleChromatic.schemeTableau10,
        dark: dbColors.d3ScaleChromatic.schemeTableau10.concat(dbColors.d3ScaleChromatic.schemeTableau10)
      });
      dbColors.setColorScheme('Diverging', {
        light: dbColors.d3ScaleChromatic.schemeRdYlBu[10],
        dark: dbColors.d3ScaleChromatic.schemeRdYlBu[10]
      });
      dbColors.setColorScheme('DivergingPuOr', {
        light: dbColors.d3ScaleChromatic.schemePiYG[5],
        dark: dbColors.d3ScaleChromatic.schemePuOr[5]
      });
      dbColors.setColorScheme('DivergingRdYlBu', {
        light: dbColors.d3ScaleChromatic.schemePiYG[5],
        dark: dbColors.d3ScaleChromatic.schemeRdYlBu[4]
      });
      dbColors.setColorScheme('DivergingPiYG', {
        light: dbColors.d3ScaleChromatic.schemePiYG[5],
        dark: dbColors.d3ScaleChromatic.schemePiYG[5]
      });
      dbColors.setColorScheme('DivergingRdYlGn', {
        light: dbColors.d3ScaleChromatic.schemePiYG[5],
        dark: dbColors.d3ScaleChromatic.schemeRdYlGn[8]
      });
      dbColors.setColorScheme('DivergingTest', {
        light: dbColors.d3ScaleChromatic.schemePiYG[5],
        dark: dbColors.d3ScaleChromatic.schemeReds[3].reverse()
      });
    },
    toggleMiniState() {
      this.miniState = !this.miniState;
      if (this.miniState) {
        // collapse all sections, when switching to mini
        for (let section of this.menuSections) {
          section.expanded = false;
        }
      }
      // need to wait a bit till it fully expands/collapses
      this.$nextTick(() => {
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, 200);
      });
    },
    setMiniState(newState) {
      if (this.miniState === newState) {
        return;
      }
      this.toggleMiniState();
    },
    handleLeftLayout(state) {
      console.log(`Left Layout ! ${state}`);
      this.$nextTick(() => {
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, 100);
      });
    }
  }
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
