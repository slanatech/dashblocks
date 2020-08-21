<template>
  <div ref="container" :class="containerClass">
    <div id="map" ref="map"></div>
    <canvas id="deck-canvas" ref="canvas"></canvas>
    <!--<v-btn class="mx-2 geo-expand" fab dark small color="pink" @click="toggleMaximize">
      <v-icon dark>{{ expanded ? 'mdi-fullscreen-exit' : 'mdi-fullscreen' }}</v-icon>
    </v-btn>-->
  </div>
</template>
<script>
import * as d3 from 'd3';
//import usgeodata from '../../static/us_geo.json';
//import mapboxgl from 'mapbox-gl';
import { Deck } from '@deck.gl/core';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import log from '../log';

let mapboxgl = null;

const INITIAL_VIEW_STATE = {
  latitude: 37.8,
  longitude: -122.45,
  zoom: 15
};

export default {
  name: 'GeoMap',
  components: {},
  props: {
    height: {
      type: Number,
      default: 400
    },
    // Array of arrays. Each array represents single time series.
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      expanded: false,
      containerWidth: 1000,
      colorRange: [
        [1, 152, 189],
        [254, 173, 84],
        [209, 55, 78]
      ]
    };
  },
  computed: {
    containerClass: function() {
      return 'ac-geo-map' + (this.expanded ? ' ac-geo-fullscreen' : '');
    },
    viewState: function() {
      return {
        longitude: -98.6,
        latitude: 36.4,
        zoom: this.containerWidth > 600 ? 4 : 2,
        minZoom: 2,
        maxZoom: 20,
        pitch: 40.5,
        bearing: 0
      };
    }
  },
  created() {
    // creating a non reactive map object
    this.map = null;
    this.deck = null;
  },
  watch: {},
  mounted() {
    import('mapbox-gl').then(module => {
      log.info('mapbox-gl: imported');
      mapboxgl = module.default;
      this.containerWidth = this.$refs.container.clientWidth;
      this.$nextTick(() => {
        this.render();
      });
    });
  },
  beforeDestroy: function() {},
  methods: {
    initSize() {},
    render() {
      let a = 1;
      this.map = new mapboxgl.Map({
        accessToken: 'pk.eyJ1IjoidWJlcmRhdGEiLCJhIjoiY2pudzRtaWloMDAzcTN2bzN1aXdxZHB5bSJ9.2bkj3IiRC8wj3jLThvDGdA',
        container: this.$refs.map,
        interactive: false,
        style: this.mapStyle || 'mapbox://styles/mapbox/dark-v9',
        center: [this.viewState.longitude, this.viewState.latitude],
        zoom: this.viewState.zoom,
        pitch: this.viewState.pitch,
        bearing: this.viewState.bearing
      });

      // creating the deck.gl instance
      this.deck = new Deck({
        canvas: this.$refs.canvas,
        width: '100%',
        height: '100%',
        initialViewState: this.viewState,
        controller: true,
        // change the map's viewstate whenever the view state of deck.gl changes
        onViewStateChange: ({ viewState }) => {
          this.map.jumpTo({
            center: [viewState.longitude, viewState.latitude],
            zoom: viewState.zoom,
            bearing: viewState.bearing,
            pitch: viewState.pitch
          });
        }
      });

      // DO this two times: first - to calculate max in bin, and set up scaleSqrt.
      // Second - to actually render layer based on scaleSqrt

      // TODO This may need to be adjusted as data is being updated
      let maxBinValue = 100000;
      let sqrt = d3
        .scaleSqrt()
        .range([0, maxBinValue])
        .domain([0, 500]);

      const hexagonLayer = new HexagonLayer({
        id: 'heatmap',
        pickable: true,
        //colorRange: [[252,146,114], [252,146,114],[252,146,114], [251,106,74], [222,45,38], [165,15,21]],
        data: this.data,
        elevationRange: [0, 2000],
        elevationScale: 250,
        extruded: true,
        //colorDomain: [0,50000],
        getPosition: d => [d.lng, d.lat],
        // TODO Return sum of point values here: we have specific value associated with each coordinate point
        getElevationValue: points => sqrt(points.reduce((sum, p) => (sum += p.val), 0)),
        getColorValue: points => sqrt(points.reduce((sum, p) => (sum += p.val), 0)),
        //getColorWeight: point => point.val, // or here
        //colorAggregation: 'SUM',
        //getElevationWeight: point => point.val, // And here
        //weightAggregation: 'SUM',
        opacity: 0.3,
        radius: 10000,
        upperPercentile: 150,
        onSetElevationDomain: d => {
          console.log(`Got 2 onSetElevationDomain: ${JSON.stringify(d)}`);
        },
        onSetColorDomain: d => {
          console.log(`Got 2 onSetColorDomain: ${JSON.stringify(d)}`);
        },
        onHover: ({ object, x, y }) => {
          //const tooltip = `${object.centroid.join(', ')}\nCount: ${object.points.length}`;
          //console.log(JSON.stringify(object));
          /* Update tooltip
             http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object
          */
        }
      });

      // TODO

      this.deck.setProps({ layers: [hexagonLayer] });
    },
    toggleMaximize(){
      this.expanded = !this.expanded;
      this.$nextTick(() => {
        window.dispatchEvent(new Event('resize'));
      });
    }

  }
};
</script>
<style lang="scss">
.deck-container {
  width: 100%;
  height: 100%;
  position: relative;
}
#map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #e5e9ec;
  overflow: hidden;
}
#deck-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
