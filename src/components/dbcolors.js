// DashBlocks Colors

// Base color sets from d3
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3Color from 'd3-color';
//import log from './log';
//import gColors from './utils/colors';

// TODO More D3 colors
// TODO Color definitions based on base set - normal, warning, alarm ...
// TODO Gradients
// TODO Light / Dark themes support
// TODO Make it a class, export instance, add methods like getColors that would return colors for current theme

// See http://tools.medialab.sciences-po.fr/iwanthue/index.php
// https://medium.com/@Elijah_Meeks/color-advice-for-data-visualization-with-d3-js-33b5adc41c90

//const d3Colors = [ '#1f77b4','#ff7f0e','#2ca02c','#d62728','#9467bd','#8c564b','#e377c2','#7f7f7f','#bcbd22','#17becf'];

// eslint-disable-next-line
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

// eslint-disable-next-line
let g2 = [
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
  '#BF1B00'
];

// eslint-disable-next-line
let g3 = [
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

// rgb(126, 178, 109)
// #7EB26D

// eslint-disable-next-line
const carbonDarkR = [
  '#007d79',
  '#ff7eb6',
  '#fa4d56',
  '#fff1f1',
  '#6fdc8c',
  '#4589ff',
  '#d12771',
  '#d2a106',
  '#08bdba',
  '#bae6ff',
  '#ba4e00',
  '#d4bbff',
  '#8a3ffc',
  '#33b1ff'
];

// eslint-disable-next-line
const diverging1 = ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'];
// eslint-disable-next-line
const diverging2 = ['#8e0152', '#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#f7f7f7', '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221', '#276419'];
// eslint-disable-next-line
const diverging3 = ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850', '#006837'];

/* DashBlocks Colors */
class DbColors {
  constructor() {
    // TODO //
    this.spectralDiverging = d3ScaleChromatic.schemeSpectral[4];
    this.a = d3ScaleChromatic.schemeRdYlBu[6];
    this.b = this.a.reverse();
  }

  // TODO getColors by "palette"
  // App may define multiple palettes.
  // "default" is always defined, and used if no palette name is passed to the chart
  // colorPalette: <name> is standard prop for chart components
  // palette defines both light and dark sets
  // plus more, like alarm / normal / warning colors

  getColors(dark) {
    //return dark ? d3ScaleChromatic.schemePastel1 : d3ScaleChromatic.schemeSet1;
    //return dark ? grafanaColors : d3ScaleChromatic.schemeCategory10;
    //return dark ? d3ScaleChromatic.schemeTableau10 : d3ScaleChromatic.schemeCategory10;
    //let a = gColors;
    //return dark ? d3ScaleChromatic.schemeSet3 : d3ScaleChromatic.schemeCategory10;

    //return dark ? this.a : d3ScaleChromatic.schemeTableau10;
    //return dark ? grafanaColors : d3ScaleChromatic.schemeTableau10;

    //let colorsTurbo = [0.25, 0.5, 0.75, 1].map(x => d3ScaleChromatic.interpolateTurbo(x));
    //let colorsInferno = [0.25, 0.5, 0.75, 1].map(x => d3ScaleChromatic.interpolateInferno(x));

    return dark ? grafanaColors : d3ScaleChromatic.schemeTableau10;
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
