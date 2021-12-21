class Calculator {
  constructor() {
      this.total = 0;
  }
  get version() {
    // we need to return the entire fetch method call
    return fetch('https://gist.githubusercontent.com/juanlizarazo/4b2d229ba483ca13b1a6d7bf3079dc8b/raw/228ac05e04118037be02c38d9b86945c1356a2e2/version.json')
    // the fetch call will return a promise witch to be handled to return another promise containing the resolved JS object / parsing the JSON object into a JS object
      .then(function(result) {
        return result.json()
      })
      // when the JSON promise is resolved this will return the version property of the JS Object
      .then(function(json) {
        return json.version;
      })
  };
  
  add(number) {
    return this.total += number;
  };
  subtract(number) {
    return this.total -= number;
  };
  multiply(number) {
    return this.total *= number;
  };
  divide(number) {
    if (number === 0) {
      throw new Error('Cannot divide by zero');
    }
    return this.total /= number;
  };
}