/* DashBlocks Data */

//import { pathOr } from 'ramda';

// TODO Support different kinds of data
// - plan hash by widget name
// - tabular data - i.e. query result from SQL
//   - support "query" in widgets to get data from table
// - etc

/* DashBlocks Data holder */
class DbData {
  constructor() {
    this.data = {};
  }

  // TODO Get

  // TODO Set / Update

  // TODO in setters, modify property like _updated = Date.now(), to trigger prop watch
}

export default DbData;
