/* DashBlocks - Test data for demo dashboards */

import dl from 'datalib';
//import pathOr from 'ramda/es/pathOr';

/* DashBlocks - Test data for demo dashboards */
class TestData {
  constructor() {
    this.stockdata = null;
  }

  init() {
    // Load test data
    this.stockdata = dl.csv('https://vega.github.io/datalib/data/stocks.csv');
  }

  // TODO Methods
}

export default TestData;
