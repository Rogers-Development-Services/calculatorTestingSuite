describe("main.js", function() {
  describe("calculate()", function() {
    it("validates expression when the first number is invalid", function() {
      // The real updateResult method will not be called, the spy will be injected instead and log when it is called (.and.stub() is the default for spyOn, it stops the call on the real implimatation *Optional)
      spyOn(window, 'updateResult').and.stub();

      calculate('a+3');

      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('Expression wasn\'t recognized');
      expect(window.updateResult).toHaveBeenCalledTimes(1);
    });

    it("validates expression when the second number is invalid", function() {
      // The real updateResult method will not be called, the spy will be injected instead and log when it is called
      spyOn(window, 'updateResult');

      calculate('4+b');

      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('Expression wasn\'t recognized');
      expect(window.updateResult).toHaveBeenCalledTimes(1);

    });

    it("validates expression when the operation is invalid", function() {
      // The real updateResult method will not be called, the spy will be injected instead and log when it is called
      spyOn(window, 'updateResult');

      calculate('3_4');

      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('Expression wasn\'t recognized');
      expect(window.updateResult).toHaveBeenCalledTimes(1);

    });

    it("calls add", function() {
      // Have to spy on the class
      const spy = spyOn(Calculator.prototype, 'add');

      calculate('3+4');

      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenCalledWith(3);
      expect(spy).toHaveBeenCalledWith(4);
    });

    it("calls subtract", function() {
      const spy = spyOn(Calculator.prototype, 'subtract');

      calculate('5-2');

      expect(spy).toHaveBeenCalled();
      expect(spy).not.toHaveBeenCalledWith(5);
      expect(spy).toHaveBeenCalledWith(2);
    });

    it("calls multiply", function() {
      const spy = spyOn(Calculator.prototype, 'multiply');

      calculate('3*4');

      expect(spy).toHaveBeenCalled();
      expect(spy).not.toHaveBeenCalledWith(3);
      expect(spy).toHaveBeenCalledWith(4);
    });

    it("calls divide", function() {
      const spy = spyOn(Calculator.prototype, 'divide');

      calculate('8/4');

      expect(spy).toHaveBeenCalled();
      expect(spy).not.toHaveBeenCalledWith(8);
      expect(spy).toHaveBeenCalledWith(4);
    });

    it("validates opperation", function() {

    });

    it("calls updateResult (ex using and.callThrough)", function() {
      // True unit testing never calls the true functions; however, if you're unit testing something native to js like .split(), you'd call your function to ensure that the native function is called.
      spyOn(window, 'updateResult');
      // add a spy on the prototype but call the real implemntation
      spyOn(Calculator.prototype, 'multiply').and.callThrough();

      calculate('5*5');

      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith(25);
    });

    it("calls updateResult (ex using and.callFake)", function() {
      // Normally wont use .and.callFake() but it spys on the class but we want to call a custom specification inside our test
      spyOn(window, 'updateResult');
      // add a spy on the prototype but call the real implemntation. The argument is faked and is the same as the multiply method
      spyOn(Calculator.prototype, 'multiply').and.callFake(function(number) {
        return 'it works';
      });

      calculate('5*5');

      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('it works');
    });

    it("calls updateResult (ex using and.returnValue)", function() {
      // This is similar to and.callFake() but and.returnValue() is using the final value. The return value which is what you care about when you're trying to isolate dependencies and return values
      spyOn(window, 'updateResult');
      // add a spy on the prototype and replace the real implemntation of multiply and have this spec return whatever value we define. 
      spyOn(Calculator.prototype, 'multiply').and.returnValue('whatever [multiply] returns');

      calculate('5*5');

      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('whatever [multiply] returns');
    });

    it("calls updateResult (ex using and.returnValues)", function() {
      spyOn(window, 'updateResult');
      // first argument is the first call which has no return value. The second call has result as the return value
      spyOn(Calculator.prototype, 'add').and.returnValues(null, 'whatever [add] returns');

      calculate('5+5');

      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('whatever [add] returns');
    });

    it('does not handle errors', function() {
      // since our switch statement in main.js has no error handeling we can test for that here in our spec
      spyOn(Calculator.prototype, 'multiply').and.throwError('some error');

      expect(function() {calculate('5*5')}).toThrowError('some error');
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
  describe("showVersion()", function() {
    it('calls calculator.version', function() {
      spyOn(document, 'getElementById').and.returnValue({
        innerText: null
      });
      // SpyOn on can not install a spy on version property
      const spy = spyOnProperty(Calculator.prototype, 'version', 'get').and.returnValue(
        Promise.resolve()
      );

      showVersion();

      expect(spy).toHaveBeenCalled();
    });
  })
})