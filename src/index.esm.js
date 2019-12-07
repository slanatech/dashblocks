import DbData from './components/dbdata';
import dbColors from './components/dbcolors';
import dbUtils from './components/dbutils';

export * from './components.js';

function installPlugin(Vue, opts) {}

// DashBlocks Vue plugin
const DashBlocks = {
  install(Vue, opts) {
    // Register specified components
    if (opts.components) {
      Object.keys(opts.components).forEach(key => {
        if (!(key in ['DashBlocks', 'DbData', 'dbColors', 'dbUtils'])) {
          const c = opts.components[key];
          Vue.component(key, c);
        }
      });
    }
    /*
    Vue.component('db-dygraphs-bundle', function(resolve) {
      // This special require syntax will instruct Webpack to
      // automatically split your built code into bundles which
      // are loaded over Ajax requests.
      require(['./dygraphs/DbDygraphsBar'], resolve);
    });
    */
  }
};

export { DashBlocks, DbData, dbColors, dbUtils };

/*
import DbColors from './components/dbcolors';
import DbUtils from './components/dbutils';
import DbData from './components/dbdata';
import DbDashboard from './components/dashboard/DbDashboard';
import DbHorizon from './components/d3/DbHorizon';
import DbSunburst from './components/d3/DbSunburst';
import DbSankey from './components/d3/DbSankey';
import DbRidgeline from './components/d3/DbRidgeline';
import {
  DbChartjsBar,
  DbChartjsHorizontalBar,
  DbChartjsDoughnut,
  DbChartjsLine,
  DbChartjsPie,
  DbChartjsPolarArea,
  DbChartjsRadar,
  DbChartjsBubble,
  DbChartjsScatter
} from './components/chartjs/DbChartjs';
import DbNumber from './components/db/DbNumber';
import DbEasyPie from './components/db/DbEasyPie';
import DbTrendLine from './components/db/DbTrendLine';
import DbTrendBar from './components/db/DbTrendBar';
import DbSparkline from './components/db/DbSparkline';
import DbDygraphsBar from './components/dygraphs/DbDygraphsBar';
import DbDygraphsLine from './components/dygraphs/DbDygraphsLine';
import DbDygraphsSparkLine from './components/dygraphs/DbDygraphsSparkLine';
import DbDygraphsDateTimeHistogram from './components/dygraphs/DbDygraphsDateTimeHistogram';

export {
  DbColors,
  DbUtils,
  DbData,
  DbDashboard,
  DbHorizon,
  DbSunburst,
  DbSankey,
  DbRidgeline,
  DbChartjsBar,
  DbChartjsHorizontalBar,
  DbChartjsDoughnut,
  DbChartjsLine,
  DbChartjsPie,
  DbChartjsPolarArea,
  DbChartjsRadar,
  DbChartjsBubble,
  DbChartjsScatter,
  DbNumber,
  DbEasyPie,
  DbTrendLine,
  DbTrendBar,
  DbSparkline,
  DbDygraphsBar,
  DbDygraphsLine,
  DbDygraphsSparkLine,
  DbDygraphsDateTimeHistogram
};
*/

/*
export default {
  DbColors,
  DbUtils,
  DbHorizon,
  DbSunburst,
  DbSankey,
  DbRidgeline,
  DbChartjsBar,
  DbChartjsHorizontalBar,
  DbChartjsDoughnut,
  DbChartjsLine,
  DbChartjsPie,
  DbChartjsPolarArea,
  DbChartjsRadar,
  DbChartjsBubble,
  DbChartjsScatter,
  DbNumber,
  DbEasyPie,
  DbTrendLine,
  DbTrendBar,
  DbSparkline,
  DbDygraphsBar,
  DbDygraphsLine,
  DbDygraphsSparkLine,
  DbDygraphsDateTimeHistogram
};
*/
