const ApiHelpers = {
  /**
   * encode
   * returns encoded string
   */
  encode(category, type) {
    const q = `[[at(document.${category},+"${type}")+]]`;
    return encodeURI(q)
  },
  encodeComponent(category, type) {
    const q = `[[at(document.${category}, ["${type}"])]]`;
    return encodeURIComponent(q)
  }
};

// %5B%5Bat(document.tags%2C%20%5B%22landing%20page%22%5D)%5D%5D

export default ApiHelpers
