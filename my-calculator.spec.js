describe("calculator.js", function () {

  describe("Calculator Class", function () {
    let calculator;
    let calculator2;

    beforeEach(function() {
      /* Anything inside this block executes before each spect (it) inside this describe */
      calculator = new Calculator();
      calculator2 = new Calculator()
    })

    afterEach(function() {
      /* Anything inside this block executes after each spec (it) inside this describe. */
    })
    
    it("should initialize the total", function () {
      expect(calculator.total).toBe(0);
      expect(calculator.total).toBeFalsy();
    })
    it("should be instantiated", function () {
      expect(calculator).toBeTruthy();
      expect(calculator2).toBeTruthy();
      expect(calculator).toEqual(calculator2);
      expect(calculator.constructor.name).toContain("Calc");

      //register the custom matcher
      jasmine.addMatchers(customMatchers);
      expect(calculator).toBeCalculator();
      expect(2).not.toBeCalculator();
    })

    // .toEqual() recurisvely validates all keys and properties match in 2 objects
    // .toBe() compares strict equivalence, even if 2 objects are "equal" they take up 2 different locations in memory

    it('should instaniates unique objects', function () {
      expect(calculator).not.toBe(calculator2);
    })

    it("should have common opperations", function () {
      expect(calculator.add).not.toBeUndefined();
      expect(calculator.subtract).toBeDefined();
      expect(calculator.multiply).toBeDefined();
      expect(calculator.divide).toBeDefined();
    })

    it("should be able to overwrite total", function () {
      calculator.total = null;
      expect(calculator.total).toBeNull();
    })

    it("should not handle NaN", function () {
      calculator.total = 20;
      calculator.multiply("a");
      expect(calculator.total).toBeNaN();
    })
  });

  describe("add()", function () {
    it("should add numbers to total", function () {
      const calculator = new Calculator();
      calculator.add(5);
      expect(calculator.total).toBe(5);
    })

    it("should return the total", function () {
      const calculator = new Calculator();
      calculator.total = 50;
      expect(calculator.add(20)).toBe(70);
      expect(calculator.total).toMatch(/-?\d+/);
      expect(typeof calculator.total).toMatch('number');
      expect(calculator.total).toEqual(jasmine.anything());
      expect(function () { }).toEqual(jasmine.anything());
      expect(null).not.toEqual(jasmine.anything());
      expect(undefined).not.toEqual(jasmine.anything());
      // 3rd Party Matcher
      expect(calculator.total).toBeNumber();
    })
  });

  describe("subtract()", function () {
    it("should subtract numbers from total", function () {
      const calculator = new Calculator();
      calculator.total = 30;
      calculator.subtract(5);
      expect(calculator.total).toBe(25);
    })
  });

  describe("multiply()", function () {
    it("should multiply total by number", function () {
      const calculator = new Calculator();
      calculator.total = 100;
      calculator.multiply(2);
      expect(calculator.total).toBe(200);
    })
  });
  
  describe("divide()", function () {
    it("should divide total by number", function () {
      const calculator = new Calculator();
      calculator.total = 30;
      calculator.divide(5);
      expect(calculator.total).toBe(6);
    })

    // whatever is returned by the annonymous function in expect()is throwing an error
    it("should handle dividing by 0", function () {
      const calculator = new Calculator();
      expect(
        function () { calculator.divide(0) }
      ).toThrow();
      expect(
        function () { calculator.divide(0) }
      ).toThrowError(Error);
      expect(
        function () { calculator.divide(0) }
      ).toThrowError(Error, "Cannot divide by zero");
    })
  });
})