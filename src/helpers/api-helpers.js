const ApiHelpers = {
  /**
   * encode
   * returns encoded string
   */
  encode(category, type) {
    const q = `[[at(document.${category},+"${type}")+]]`;
    return encodeURI(q)
  }
};

export default ApiHelpers
