let moment = require('moment');

// DashBlocks utils
class DbUtils {
  constructor() {
    // When grouping by datetime interval, minimum and maximum number of entries allowed
    this.minAllowedGroupingEntries = 3;
    this.maxAllowedGroupingEntries = 1000;

    // Supported grouping intervals
    this.groupingIntervals = [
      { title: 'Auto', value: 'auto', divider: 10000000000 },
      { title: '1s', value: 'second', divider: 1000 },
      { title: '30s', value: '30s', divider: 30 * 1000 },
      { title: '1m', value: 'minute', divider: 60 * 1000 },
      { title: '5m', value: '5m', divider: 5 * 60 * 1000 },
      { title: '15m', value: '15m', divider: 15 * 60 * 1000 },
      { title: '30m', value: '30m', divider: 30 * 60 * 1000 },
      { title: '1h', value: 'hour', divider: 60 * 60 * 1000 },
      { title: '12h', value: '12h', divider: 12 * 60 * 60 * 1000 },
      { title: 'Day', value: 'day', divider: 24 * 60 * 60 * 1000 }
    ];
  }

  // GENERAL /////////////////////////////////////// //

  // Checks if prop exists in obj, and if not sets it to value
  ensureProperty(obj, prop, value) {
    if (!(prop in obj)) {
      obj[prop] = value;
    }
  }

  // Set path in object base, if not exist. names: ['prop1','prop2',...]
  pathSet(base, names) {
    for (let i = 0; i < names.length; i++) {
      base = base[names[i]] = base[names[i]] || {};
    }
    return base;
  }

  // Checks path in object base, if not exist. names: ['prop1','prop2',...]
  pathOr(def, names, base) {
    for (let i = 0; i < names.length; i++) {
      if (!base[names[i]]) return def;
      base = base[names[i]];
    }
    return base;
  }

  // DATE-TIME UTILS /////////////////////////////// //

  // Get from, to and duration in milliseconds based from and to string values
  // Takes into account ISO_8601 time intervals
  getTimeIntervalInfo(fromValue, toValue) {
    // Get and parse from and to
    // using ISO_8601 time intervals
    // https://en.wikipedia.org/wiki/ISO_8601#Time_intervals

    let from = null;
    let to = null;

    let currentTimeMs = Date.now();
    to = currentTimeMs; // Current time by default
    let toStr = toValue;
    if (toStr !== 'now') {
      let parsedTo = parseInt(toStr);
      if (!Number.isNaN(parsedTo)) {
        to = parsedTo;
      }
    }

    let fromStr = fromValue;
    let dms = 5 * 60 * 1000;
    if (fromStr.startsWith('P')) {
      // Attempt to process as ISO_8601 time interval
      let d = moment.duration(fromStr);
      if (d.isValid()) {
        dms = d.asMilliseconds();
      }
      from = to - dms;
    } else {
      let parsedFrom = parseInt(fromStr);
      from = Number.isNaN(parsedFrom) ? to - dms : parsedFrom;
    }

    let duration = to - from;
    return { tiFrom: from, tiTo: to, tiDuration: duration };
  }

  // Get grouping interval based on time interval duration in miliiseconds
  getDateTimeGroupingInterval(duration) {
    let dsec = duration / 1000;
    if (dsec <= 15 * 60) {
      return 'second';
    } // Up to 5 min
    if (dsec <= 24 * 60 * 60) {
      return 'minute';
    } // Up to 1 hour
    if (dsec <= 7 * 24 * 60 * 60) {
      return 'hour';
    } // Up to 24 hour
    // TODO more
    return 'day';
  }

  validateGroupingInterval(fromValue, toValue, groupingInterval) {
    if (groupingInterval === 'auto') {
      // Auto is always good
      return groupingInterval;
    }
    let { tiDuration } = this.getTimeIntervalInfo(fromValue, toValue);
    // Check suggested interval, and switch to Auto if it's not acceptable
    for (let candidateInterval of this.groupingIntervals) {
      if (candidateInterval.value === groupingInterval) {
        let numEntries = tiDuration / candidateInterval.divider;
        if (numEntries >= this.minAllowedGroupingEntries && numEntries < this.maxAllowedGroupingEntries) {
          return groupingInterval; // OK
        }
      }
    }
    return 'auto'; // default
  }

  filterGroupingIntervals(fromValue, toValue) {
    let { tiDuration } = this.getTimeIntervalInfo(fromValue, toValue);
    // Check all intervals, and return only ones >= min and < max
    let filteredIntervals = [];
    for (let candidateInterval of this.groupingIntervals) {
      if (candidateInterval.value === 'auto') {
        filteredIntervals.push(candidateInterval);
      } else {
        let numEntries = tiDuration / candidateInterval.divider;
        if (numEntries >= this.minAllowedGroupingEntries && numEntries < this.maxAllowedGroupingEntries) {
          filteredIntervals.push(candidateInterval);
        }
      }
    }
    return filteredIntervals;
  }
}

const dbUtils = new DbUtils();

export default dbUtils;
