<template>
  <div class="db-dashboard">
    <component v-bind:is="layoutComponent" :dbspec="dbspec" :dbdata="dbdata"> </component>
    <div @click="handleInc">INC</div>
  </div>
</template>

<script>
import DbLayouts from './dblayouts';
import DbData from '../dbdata';

// TODO LAYOUTS
// TODO Under layout property of dashboard spec, do layout-specific config
// TODO Handle responsive in Layout - https://alligator.io/vuejs/vue-media-queries/ - or justr

export default {
  name: 'DashOne',
  components: DbLayouts.components,
  data() {
    return {
      dbdata: new DbData(),
      dbspec: {
        layout: {
          type: 'grid'
        },
        widgets: [
          {
            id: '1',
            name: 'w1',
            type: 'WidgetOne',
            class: 'cspan-2'
          },
          {
            id: '2',
            name: 'w2',
            type: 'WidgetTwo',
            class: 'cspan-2'
          },
          {
            id: '1',
            name: 'w5',
            type: 'WidgetBar',
            class: 'cspan-4'
          },
          {
            id: '1',
            name: 'w5',
            type: 'WidgetBar',
            class: 'cspan-4'
          },
          {
            id: '1',
            name: 'w1',
            type: 'WidgetOne'
          },
          {
            id: '1',
            name: 'w1',
            type: 'WidgetOne'
          },
          {
            id: '1',
            name: 'w1',
            type: 'WidgetOne'
          },
          {
            id: '1',
            name: 'w1',
            type: 'WidgetOne'
          },
          {
            id: '1',
            name: 'w1',
            type: 'WidgetOne'
          },
          {
            id: '1',
            name: 'w1',
            type: 'WidgetOne'
          },
          {
            id: '1',
            name: 'w1',
            type: 'WidgetOne'
          },
          {
            id: '1',
            name: 'w1',
            type: 'WidgetOne'
          },
          {
            id: '1',
            name: 'w1',
            type: 'WidgetOne'
          },
          {
            id: '1',
            name: 'w1',
            type: 'WidgetOne'
          },
          {
            id: '1',
            name: 'w1',
            type: 'WidgetOne'
          }
        ]
      }
    };
  },
  computed: {
    layoutComponent() {
      return DbLayouts.resolve(this.dbspec.layout.type);
    }
  },
  created() {
    //console.log('Created !');
    this.dbdata.setWData('w1', {
      value: 10
    });
    this.dbdata.setWData('w2', {
      value: 20
    });
    this.dbdata.setWData('w5', {
      labels: ['January', 'February', 'March', 'April'],
      datasets: [
        {
          label: 'Data One',
          data: [10, 20, 30, 100]
        }
      ]
    });
  },
  methods: {
    handleInc: function() {
      //this.dbdata['_updated'] = Date.now();

      this.dbdata.wdata['w1'].value = this.dbdata.wdata['w1'].value + 10;

      //this.dbdata.setWData('w1', {
      //  value: newVal
      //});

      /*
      this.dbdata.wdata.w1 = this.dbdata.wdata.w1 + 10;
      let d = this.dbdata.wdata.w5.datasets[0].data;
      this.dbdata.wdata.w5.labels.push(`L:${Math.random()}`);
      d.push(Math.random());
      for (let i = 0; i < d.length; i++) {
        this.$set(d, i, d[i] + 10);
        //d[i] = d[i] + 10;
      }
      */
      //this.$set(this.dbdata,'w5',nd);
    }
  }
};
</script>
<style>
.db-dash-item {
  border: 1px solid magenta;
}
</style>

/* Notes ** That works: components: { 'WidgetOne': () => import('./WidgetOne.vue') }, */
