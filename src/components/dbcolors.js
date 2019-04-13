// Colors definition

// D3 - https://github.com/d3/d3-scale-chromatic/blob/master/src/categorical/category10.js
const defaultColors = [
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

const defaultColorsMaterial = [
  '#0288D1', // light-blue darken-2
  '#F57C00', // orange darken-2
  '#689F38', // light-green darken-2
  '#D32F2F', // red darken-2
  '#7B1FA2', // purple darken-2
  '#5D4037', // brown darken-2
  '#F06292', // pink lighten-2
  '#455A64', // blue-grey darken-2
  '#FBC02D', // yellow darken-2
  '#0288D1' // light-blue darken-2
];

// TODO More D3 colors

// TODO Color definitions based on base set - normal, warning, alarm ...

// TODO Gradients

// TODO Light / Dark themes support

// TODO Make it a class, export instance, add methods like getColors that would return colors for current theme

export default {
  defaultColors,
  defaultColorsMaterial
};
