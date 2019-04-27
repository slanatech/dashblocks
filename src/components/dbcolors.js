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

/* DashBlocks Colors */
class DbColors {
  constructor() {
    // TODO //
  }

  getColors(dark) {
    //return dark ? d3ScaleChromatic.schemePastel1 : d3ScaleChromatic.schemeSet1;
    return dark ? d3ScaleChromatic.schemePastel1 : d3ScaleChromatic.schemeCategory10;
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
