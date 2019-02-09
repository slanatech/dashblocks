/* DashBlocks Data */

import Vue from 'vue';
import pathOr from 'ramda/es/pathOr';

// TODO Support different kinds of data
// - plain hash by widget name
// - tabular data - i.e. query result from SQL
//   - support "query" in widgets to get data from table
// - dataframes

/* DashBlocks Data holder */
class DbData {
  constructor() {
    this.updated = 't' + Date.now();
  }

  // TODO Get

  // TODO Set / Update
  setWData(key, data) {
    Vue.set(this, key, data);
    Vue.set(this[key], 'updated', 't' + Date.now());
    /*
      Object.assign(
      {},
      {
        _updated: Date.now()
      },
    );
    */

    // ???
    Vue.set(this, 'updated', 't' + Date.now());
  }

  /*
  setUpdated(key) {
    //Vue.set(this[key], '_updated', Date.now())
    this.updated = 't' + Date.now();
  }
  */

  getWData(key) {
    return pathOr(null, [key], this);
  }

  // TODO in setters, modify property like _updated = Date.now(), to trigger prop watch
}

export default DbData;
