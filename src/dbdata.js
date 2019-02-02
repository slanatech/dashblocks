/* DashBlocks Data */

import pathOr from 'ramda/es/pathOr';

// TODO Support different kinds of data
// - plain hash by widget name
// - tabular data - i.e. query result from SQL
//   - support "query" in widgets to get data from table
// - dataframes

/* DashBlocks Data holder */
class DbData {
  constructor() {
    this.wdata = {};
    this['_updated'] = Date.now();
  }

  // TODO Get

  // TODO Set / Update
  setWData(key, data) {
    this.wdata[key] = data;
    this.wdata[key]['_updated'] = Date.now();
    this['_updated'] = Date.now();
  }

  getWData(key) {
    return pathOr(null, [key], this.wdata);
  }

  // TODO in setters, modify property like _updated = Date.now(), to trigger prop watch
}

export default DbData;
