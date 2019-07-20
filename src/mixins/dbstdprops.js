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
    }
  }
};
