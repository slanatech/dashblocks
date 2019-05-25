// DashBlocks Colors

// Base color sets from d3
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3Color from 'd3-color';
//import log from './log';

// TODO More D3 colors
// TODO Color definitions based on base set - normal, warning, alarm ...
// TODO Gradients
// TODO Light / Dark themes support
// TODO Make it a class, export instance, add methods like getColors that would return colors for current theme

// See http://tools.medialab.sciences-po.fr/iwanthue/index.php
// https://medium.com/@Elijah_Meeks/color-advice-for-data-visualization-with-d3-js-33b5adc41c90

//const d3Colors = [ '#1f77b4','#ff7f0e','#2ca02c','#d62728','#9467bd','#8c564b','#e377c2','#7f7f7f','#bcbd22','#17becf'];

const grafanaColors = [
  '#7EB26D', // 0: pale green
  '#EAB839', // 1: mustard
  '#6ED0E0', // 2: light blue
  '#EF843C', // 3: orange
  '#E24D42', // 4: red
  '#1F78C1', // 5: ocean
  '#BA43A9', // 6: purple
  '#705DA0', // 7: violet
  '#508642', // 8: dark green
  '#CCA300', // 9: dark sand
  '#447EBC',
  '#C15C17',
  '#890F02',
  '#0A437C',
  '#6D1F62',
  '#584477',
  '#B7DBAB',
  '#F4D598',
  '#70DBED',
  '#F9BA8F',
  '#F29191',
  '#82B5D8',
  '#E5A8E2',
  '#AEA2E0',
  '#629E51',
  '#E5AC0E',
  '#64B0C8',
  '#E0752D',
  '#BF1B00',
  '#0A50A1',
  '#962D82',
  '#614D93',
  '#9AC48A',
  '#F2C96D',
  '#65C5DB',
  '#F9934E',
  '#EA6460',
  '#5195CE',
  '#D683CE',
  '#806EB7',
  '#3F6833',
  '#967302',
  '#2F575E',
  '#99440A',
  '#58140C',
  '#052B51',
  '#511749',
  '#3F2B5B',
  '#E0F9D7',
  '#FCEACA',
  '#CFFAFF',
  '#F9E2D2',
  '#FCE2DE',
  '#BADFF4',
  '#F9D9F9',
  '#DEDAF7'
];

/* DashBlocks Colors */
class DbColors {
  constructor() {
    // TODO //
  }

  getColors(dark) {
    //return dark ? d3ScaleChromatic.schemePastel1 : d3ScaleChromatic.schemeSet1;
    return dark ? grafanaColors : d3ScaleChromatic.schemeCategory10;
  }

  hex2RGBA(hex, opacity) {
    let c = d3Color.color(hex);
    c.opacity = opacity;
    return c + '';
  }
}

let dbColors = new DbColors();
export default dbColors;

//const defaultColors = d3ScaleChromatic.schemeDark2;
// D3 - https://github.com/d3/d3-scale-chromatic/blob/master/src/categorical/category10.js
/*
const defaultColorsA = [
  '#1f77b4', // muted blue
  '#ff7f0e', // safety orange
  '#2ca02c', // cooked asparagus green
  '#d62728', // brick red
  '#9467bd', // muted purple
  '#8c564b', // chestnut brown
  '#e377c2', // raspberry yogurt pink
  '#7f7f7f', // middle gray
  '#bcbd22', // curry yellow-green
  '#17becf' // blue-teal
];
*/
