function calculate(inputValue) {
  const regex = /\+|\-|\*|\//;
  const numbers = inputValue.split(regex);

  const numA = parseInt(numbers[0]);
  const numB = parseInt(numbers[1]);

  const operation = inputValue.match(regex);

  if (Number.isNaN(numA) || Number.isNaN(numB) || operation === null) {
    updateResult('Expression wasn\'t recognized')
    return;
    // returning undefined
  }

  // We don't have access to this instance to spy on because it's unique to main.js
  let calculator = new Calculator();
  // first call of .add()
  calculator.add(numA);

  let result;
  switch (operation[0]) {
    case '+':
      // second call of .add()
      result = calculator.add(numB);
      break;
    case '-':
      result = calculator.subtract(numB);
      break;
    case '*':
      result = calculator.multiply(numB);
      break;
    case '/':
      result = calculator.divide(numB);
      break;
  }
  updateResult(result);
}

function updateResult(result) {
  const element = document.getElementById('result');
  if (element) {
    element.innerText = result;
  }
}

function showVersion() {
  const calculator = new Calculator();

  const element = document.getElementById('version');

  // This is setting the version via the external resource/API call via the Caluculator class's version getter function
  calculator.version
    .then(function(version){
      element.innerText = version;
    })
    .catch(function(error){
      element.innerText = 'unknonwn';
    });
};