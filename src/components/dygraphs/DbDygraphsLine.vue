<template>
  <db-dygraphs ref="dygraph" :_updated="_updated" :data="data" :options="graphOptions" :dark="dark" :colorScheme="colorScheme" @db-event="handleDbEvent"> </db-dygraphs>
</template>
<script>
import { dbStdProps } from '../mixins/dbstdprops';
//import DygraphInteraction from 'dygraphs';
import DbDygraphs from './DbDygraphs';
//import log from '../log';
export default {
  name: 'DbDygraphsLine',
  components: {
    DbDygraphs
  },
  mixins: [dbStdProps],
  props: {
    data: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object
    }
  },
  data() {
    return {
      defaultOptions: {
        includeZero: true,
        panEdgeFraction: 0.00000001,
        fillGraph: true,
        fillAlpha: 0.2,
        /*
        highlightSeriesOpts: {
          strokeWidth: 2,
          strokeBorderWidth: 1,
          highlightCircleSize: 5
        },
        */
        // TODO Consider if needs to be enabled; need to import asyncronously so vuepress compiles
        //interactionModel: DygraphInteraction.defaultInteractionModel,
        axes: {
          x: {
            drawGrid: true
          }
        }
      }
    };
  },
  mounted: function() {},
  computed: {
    // Augment passed options with defaults for this chart type
    graphOptions: {
      get() {
        return Object.assign({}, this.defaultOptions, this.options);
      },
      set() {
        /*noop*/
      }
    }
  },
  methods: {
    getDygraphs() {
      return this.$refs.dygraph ? this.$refs.dygraph.getDygraphs() : null;
    },
    handleDbEvent(payload) {
      this.$emit('db-event', payload);
    }
  }
};
</script>
<style>
.dbc-dygraphs-line {
  width: 100%;
  height: 100%;
}

.dygraph-legendNN {
  background-color: rgba(209, 236, 241, 0.95) !important;
  padding: 4px;
  border: 1px solid #bee5eb;
  border-radius: 4px;
  pointer-events: none;
  width: 240px;
  position: absolute;
  margin-top: 40px;
}

.dbc-dygraphs-dth .dygraph-legend2 {
  font-size: 14px;
  text-align: left;
  margin-left: 65px;
}

.dbc-dygraphs-dth .dygraph-title2 {
  font-size: 18px;
  text-align: center;
}
</style>
