// Import all Db Layouts
import DbGridLayout from './layout/DbGridLayout.vue';

// Mapping of layout name to layout component name
const DB_LAYOUT = Object.freeze({
  grid: 'DbGridLayout'
});

// Resolve layout component by layout name
function resolveLayout(layoutname) {
  // grid is default
  if (!(layoutname in DB_LAYOUT)) {
    return 'DbGridLayout';
  }
  return DB_LAYOUT[layoutname];
}

export default {
  DB_LAYOUT: DB_LAYOUT,
  components: {
    DbGridLayout
  },
  resolve: resolveLayout
};
