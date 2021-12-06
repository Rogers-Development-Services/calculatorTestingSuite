describe("main.js", function() {
  describe("calculate()", function() {
    it("validates expression", function() {

    });
    it("calls add", function() {
      
    });
    it("calls subtract", function() {
      
    });
    it("calls multiply", function() {
      
    });
    it("calls divide", function() {
      
    });
    it("validates opperation", function() {

    });
    it("calls updateResult", function() {
      
    });
  })
  describe("updateResult()", function() {
    // Define element to share the state between beforeALL afterAll and spec if using the arrow function definition and remove any refrence to the .this keyword
    // let element;

    beforeAll(function() {
      // Executed ONCE before all specs are executed.
      const element = document.createElement('div');
      element.setAttribute('id', 'result');

      document.body.appendChild(element);

      // This will set the state for this jasmine suite
      this.element = element;
    });

    afterAll(function() {
      // Executed ONCE after all specs are executed.
      document.body.removeChild(this.element);
    });

    it("adds result to DOM element", function() {
      updateResult('5');

      expect(this.element.innerText).toBe('5');
    })
  })
})