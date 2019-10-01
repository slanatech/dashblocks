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
    // TODO accept widgets data set here
    // go through each key and add _updated
    this._updated = Date.now();
  }

  // TODO Get

  // TODO Set / Update
  setWData(key, data) {
    /*
    if (!(key in this)) {
      Vue.set(this, key, {d:data});
      Vue.set(this[key], '_updated', Date.now());
    } else {
      //Vue.set(this, key, data);
      this[key].d = data;
      this[key]['_updated'] = Date.now();
    }*/
    Vue.set(this, key, data);
    Vue.set(this[key], '_updated', Date.now());
    this['_updated'] = Date.now();
  }

  setUpdated(key) {
    Vue.set(this[key], '_updated', Date.now());
    Vue.set(this, '_updated', Date.now());
  }

  touch(key) {
    Vue.set(this[key], '_updated', Date.now());
    Vue.set(this, '_updated', Date.now());
  }

  getWData(key) {
    return pathOr(null, [key], this);
  }

  // TODO in setters, modify property like _updated = Date.now(), to trigger prop watch
}

export default DbData;
