//#Calc: calc.js v04a

// declaring variables before ready function for console access
// for beta and release versions will move inside ready function

// declaring variables that may change

let allClear = '';
let eqauls = '';
let inputValue = '';
let opValue2 = '';
let opValue = '';
let calcSum = 0;
let calcStatus = 0;
let numberValue = '';
let firstNumberValue = 0;
let secondNumberValue = 0;

const calc = {
	/* Calc object with methods for basic calculations
			to do : decimal functions
			to do : Negitave/Positive (-/+)
			to do : Percent (%) functions
			future : Menory functions
			future : "scientific" calculator functions
	*/
		sumValue: 0,
		allClear: function() {
			this.sumValue = 0;
			console.log(this.sumValue);
			return this.sumValue;
		},
		divide: function(numValue1, numValue2) {
			this.sumValue = numValue1 / numValue2;
			return this.sumValue;
		},
		multiply: function(numValue1, numValue2) {
			this.sumValue = numValue1 * numValue2;
			return this.sumValue;
		},
		subtract: function(numValue1, numValue2) {
			this.sumValue = numValue1 - numValue2;
			return this.sumValue;
		},
		addition: function(numValue1, numValue2) {
			this.sumValue = numValue1 + numValue2;
			return this.sumValue;
		},
		equals: function() {
			console.log(this.sumValue);
			return this.sumValue;
		}
} // end calculator object

const mytest = {
	// add methods to use to help debug

	log: function (value) {
		console.log(value);
		}
}

const ux = {
	/* User Experience, UX
		any code needed to implement a working calculator user interface, UI,
		so UX is how a UI should work, look and feel
	*/

	displayValue: function (value) {
			$('.display').html('<input type="text" id="inputNoBlink" value="' + value + '"></input>');
		},

	noBlink: function () {
		$('#input').remove();
	}

} // end ux object

$(document).ready( function () {
// waiting for html document to load

		$('#ac').click(function(event){

				allClear = $(this).text();
				console.log(allClear);

				calcSum = calc.allClear();
				ux.displayValue(calcSum);
				calcStatus = 0;
				firstNumberValue = 0;
				secondNumberValue = 0;
				numberValue = '';
				opValue = '';
				equals = '';

		});

		$('#equals').click(function(event){

				equals = $(this).text();

				if ( calcStatus <= 1 ) {  // entered something like, + 3 = or 3 + 4 =

					// so need to make sure second numberValue value parsed into secondNumberValue
					secondNumberValue = parseInt(numberValue, 10);
					console.log('secondNumberValue:' + secondNumberValue);
					// secondNumberValue may be 0
				}

				console.log(equals);

					// do math, get and save calcSum


					if ( opValue === '/' ) {

							calcSum = calc.divide(firstNumberValue, secondNumberValue);
							ux.displayValue(calcSum);
							console.log(calcSum);

					} else if ( opValue === '*' ) {

							calcSum = calc.multiply(firstNumberValue, secondNumberValue);
							ux.displayValue(calcSum);
							console.log(calcSum);

					} else if ( opValue === '-' ) {

							calcSum = calc.subtract(firstNumberValue, secondNumberValue);
							ux.displayValue(calcSum);
							console.log(calcSum);

					} else if ( opValue === '+' ) {

							calcSum = calc.addition(firstNumberValue, secondNumberValue);
							ux.displayValue(calcSum);
							console.log(calcSum);
					} // end if to match opValue

					calcSum = calc.equals();
					// get ready for more math
					numberValue = calcSum.toString(10);
					firstNumberValue = calcSum;
					secondNumberValue = 0
					opValue = '';
					calcStatus = 0;

		});

		$('#nine, #eight, #seven, #six, #five, #four, #three, #two, #one, #zero, #decimal').click(function(event) {

				// reading number input into string, so that multiple digit value can be captured
				numberValue += $(this).text();
				ux.displayValue(numberValue);
				console.log('input stream..' + numberValue);
				//ux.noBlink();


		});

		$('#posNeg, #percent, #divide, #multiply, #subtract, #add').click(function(event) {

				inputValue = $(this).text();
				console.log('input stream...' + inputValue);
				console.log('calcStatus: ' + calcStatus);

				// calcSum (how many numbers do we have)
				// if 0 save numberValue to firstNumberValue
				// if 1 save numberValue to secondNumberValue
				// increment calcStatus, += 1
				if (calcStatus == 0) {
									firstNumberValue = parseInt(numberValue, 10);
									numberValue = '';
									console.log('firstNumberValue:' + firstNumberValue);
									opValue = inputValue;
									console.log('opValue: ' + opValue);
									calcStatus += 1;
						} else if (calcStatus == 1) {
									secondNumberValue = parseInt(numberValue, 10);
									console.log('secondNumberValue:' + secondNumberValue);
									opValue2 = inputValue;
									console.log('opValue2: ' + opValue2);
									numberValue = '';
									calcStatus += 1;
						}

			 // is calcStatus >= 1, do we have 2 number values,
			 // if true, do math
			 // for each math operation, save calcSum to firstNumberValue, as subtotal
			if ( calcStatus >= 2 && opValue === '/' ) {

					calcSum = calc.divide(firstNumberValue, secondNumberValue);
					ux.displayValue(calcSum);
					console.log(calcSum);
					firstNumberValue = calcSum;
					calcStatus = 1;
					opValue = opValue2;

			} else if ( calcStatus >= 2 && opValue === '*' ) {

					calcSum = calc.multiply(firstNumberValue, secondNumberValue);
					ux.displayValue(calcSum);
					console.log(calcSum);
					firstNumberValue = calcSum;
					calcStatus = 1;
					opValue = opValue2;

			} else if ( calcStatus >= 2 && opValue === '-' ) {

					calcSum = calc.subtract(firstNumberValue, secondNumberValue);
					ux.displayValue(calcSum);
					console.log(calcSum);
					firstNumberValue = calcSum;
					calcStatus = 1;
					opValue = opValue2;

			} else if ( calcStatus >= 2 && opValue === '+' ) {

					calcSum = calc.addition(firstNumberValue, secondNumberValue);
					ux.displayValue(calcSum);
					console.log(calcSum);
					firstNumberValue = calcSum;
					calcStatus = 1;
					opValue = opValue2;
			} // end if (calcStatus > 2)

		}); // end operators click event handler

}); // end ready function

// see CalcProject.txt for more developer notes
