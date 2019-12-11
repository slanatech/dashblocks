// Standard properties for Dashblocks components
export const dbStdProps = {
  props: {
    /**
     * Change to trigger data update.
     * Set this to current timestamp to inform component that data has been updated.
     * Helpful in situations when, for example, only values in array are changed.
     * See https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats
     */
    _updated: {
      type: Number,
      default: 0
    },
    /**
     * Enable dark mode
     *
     * `true,false`
     */
    dark: {
      type: Boolean,
      default: false
    },
    /**
     * Color Scheme Name
     * App may define multiple color schemes for different charts
     * and use this prop to specify which colorScheme to use
     * default: "default" - refers to default dashblocks colorScheme which is always defined
     */
    colorScheme: {
      type: String,
      default: 'default'
    }
  }
};
