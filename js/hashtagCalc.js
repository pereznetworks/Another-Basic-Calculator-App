//#Calc: calc.js v1.0a

// declaring variables before ready function for console access
// for beta and release versions will move inside ready function

// built-in debug.log feature: log errors, error handling

// declaring variables that may change

let allClear = '';
let eqauls = '';
let inputValue = '';
let opValue2 = '';
let opValue = '';
let calcSum = 0;
let calcStatus = 0; // number of entered values parseInt by math-operations
let numberValue = '';
let firstNumberValue = 0;
let secondNumberValue = 0;
let numberOfValues = 0;  // number of values that are passed to a object-method


const calc = {
	/* Calc object with methods for basic calculations
      basic math function (fx):
      divide, multiply, subtract, add, use decimals
		  input Negitave/Positive (-/+) values
			convert active input value into Percent (%)

      future : Menory fx
			future : "scientific" calculator fx
	*/
		sumValue: 0,
		allClear: function() {
			this.sumValue = 0;
			debug.log(this.sumValue);
			return this.sumValue;
		},
		divide: function(numValue1, numValue2) {
			// normal divide fx
			this.sumValue = numValue1 / numValue2;
			return this.sumValue;
		},
		multiply: function(numValue1, numValue2) {
			// normal mutliply fx
			this.sumValue = numValue1 * numValue2;
			return this.sumValue;
		},
		subtract: function(numValue1, numValue2) {
			// normal subtract fx
			this.sumValue = numValue1 - numValue2;
			return this.sumValue;
		},
		addition: function(numValue1, numValue2) {
			// normal addition fx
			this.sumValue = numValue1 + numValue2;
			return this.sumValue;
		},
		percent: function(numberOfValues, numValue1, numValue2){
			// % fx is just like other calculator %
			//
			// research shows that on calculators this function....
			// was designed for customer at a retail shop, asking...
			// what the discount, or percent, might be off of the regular price
			//
			// if only one number is entered, then %, most calculators will...
			//  simply divide only available number by 100, and return answer immedialty
			//
			// using a INT value: numberOfValues, 0 = only 1 value passed, 1 = 2 values passed
			// so, if only 1 value entered;
			//
			// so if 1 value passed...
			// for numValue1 = x
			// sumValue = (x/100);
			// return sumValue;
			//
			// if 2 values have been passed, then...
			// for numValue1 = x & numValue2 = y
			// sumValue = ( x * (y/100) );
			// return sumValue;

			if (numberOfValues == 0 ) {
				this.sumValue = numValue1 / 100;
				return this.sumValue;
			} else if ( numberOfValues == 1 ) {
				this.sumValue = numValue1 * ( numValue2 / 100 )
				return this.sumValue;
			}
		},
		posNeg: function(numValue1){
			// postive to negative value conversion
			// quick and  simple way to get oppsite value
			this.sumValue = numValue1 * -1;
			return this.sumValue;
		},
		equals: function() {
			debug.log(this.sumValue);
			return this.sumValue;
		}
} // end calculator object

const tape = {
	// add methods for showing history of calculations, a tape
	showTape: false,
}

const debug = {
	// add methods to use to help debug.log

	loggingOn: false,

	log: function (value) {
		if (this.loggingOn) {
			console.log(value);}
		},
}

const ux = {

	/* User Experience, UX
		any code needed to implement a working calculator user interface, UI,
		so UX is how a UI should work, look and feel
	*/

  acToogle: true,

  /*  acToogle to be used with toogleAllClear method ....

	toogleAllClear: function (value) {
        if (--- what condition to test ? ---- ) {
          	$('#ac').html('<a id="clear">C</a><a id="ac" style="display: none;">AC</a>');
        } else {
            $('#ac').html('<a id="ac" style="display: none;">AC</a><a id="clear">C</a>');
        }

		},
		// when a number is entered, change AC button to C
		// when then when the C button is clicked, then change it back to an AC button

	*/

	displayValue: function (value) {
			$('.display').html('<input type="text" id="inputNoBlink" value="' + value + '"></input>');
		}  // display input and for initial input stop blinking

} // end ux object

$(document).ready( function () {
// waiting for html document to load

		$('#ac').click(function(event){

				allClear = $(this).text();
				debug.log('AC clicked, reseting all values');

				calcSum = calc.allClear();
				ux.displayValue(calcSum);
				debug.log('calcSum:' + calcSum);
				calcStatus = 0;
				debug.log('calcStatus:' + calcStatus);
				numberValue = '';
				debug.log('numberValue:' + numberValue);
				opValue = '';
				debug.log('opValue:' + opValue);
				equals = '';
				debug.log('equals:' + equals);
				firstNumberValue = 0;
				debug.log('firstNumberValue:' + firstNumberValue);
				secondNumberValue = 0;
				debug.log('secondNumberValue:' + secondNumberValue);
		});

		$('#posNeg, #percent').click(function(event){

			if ( calcStatus == 0 ) {

				// entered something like, 3 % or 3 +/-
				// math op click event has not parseFloat numberValue string into firstNumberValue, yet

				// so need to make sure numberValue value parsed into firstNumberValue
				// there is no secondNumberValue, yet
				opValue = $(this).text();
				debug.log('opValue:', opValue);
				firstNumberValue = parseFloat(numberValue, 10);
				debug.log('firstNumberValue:' + firstNumberValue);
				numberOfValues = 0;  // or only 1 value that can be passed to object-method

					if ( opValue === '%' ) {

						firstNumberValue = calc.percent(numberOfValues, firstNumberValue);
						// for calc.perecent function: one number value passed,
								// simply divide firstNumberValue value by 100
								// return result
						ux.displayValue(firstNumberValue);
						debug.log('firstNumberValue:' + firstNumberValue);
						calcStatus += 1;
						// result not read into calcSum, since this is part of larger math op


					} else if ( opValue === '+/-' ) {

						firstNumberValue = calc.posNeg(firstNumberValue);
						ux.displayValue(firstNumberValue);
						debug.log('firstNumberValue:' + firstNumberValue);
						calcStatus += 1;
					  // result not read into calcSum, since this is part of larger math op
					}

			} else {

				// else then something like, + 3 % or 4 + 3 %
				// OR  + 3 +/- or 4 + 3 +/- has been entered
				// a math oeprator click event has already parseFloat first numberValue into firstNumberValue
				// firstNumberValue may be 0, but ussualy will be a number > 0
				// so current numberValue string is a second number value
				// '%' or '+/-' is opValue2
				opValue2 = $(this).text();
				debug.log('opValue2:', opValue2);
				secondNumberValue = parseFloat(numberValue, 10);
				debug.log('secondNumberValue:' + secondNumberValue);
				numberOfValues = 1; // 2 values sthat can be passed to object-method

					if ( opValue2 === '%' ) {

						secondNumberValue = calc.percent(numberOfValues, firstNumberValue, secondNumberValue);
						// for calc.perecent function: two number values passed
								// multiply first number by result of (divide second number by 100),
								// return result
						ux.displayValue(secondNumberValue);
						debug.log('secondNumberValue:' + secondNumberValue);
						calcStatus += 1;
						// result not read into calcSum, since this is part of larger math op

					} else if ( opValue2 === '+/-' ) {

						secondNumberValue = calc.posNeg(secondNumberValue);
						ux.displayValue(secondNumberValue);
						debug.log('secondNumberValue:' + secondNumberValue);
						calcStatus += 1;
						// result not read into calcSum, since this is part of larger math op

					} // end if (opValue ...)

			} // end if (calcStatus ...)

		}); // end posNeg, percent button click event handler

		$('#equals').click(function(event){

				equals = $(this).text();

				if ( calcStatus <= 1 ) {  // entered something like, + 3 = or 3 + 4 =

					// so need to make sure second numberValue value parsed into secondNumberValue
					secondNumberValue = parseFloat(numberValue, 10);
					debug.log('firstNumberValue: ' + firstNumberValue);
					debug.log('opValue: ' + opValue);
					debug.log('secondNumberValue: ' + secondNumberValue);
					// secondNumberValue may be 0
				}

				/* secondNumberValue = parseFloat(numberValue, 10);
				debug.log('firstNumberValue: ' + firstNumberValue);
				opValue1 = opValue2;
				opValue2 = "";
				debug.log('opValue: ' + opValue1);
				debug.log('secondNumberValue: ' + secondNumberValue);
				debug.log(equals); */

					// do math, get and save calcSum


					if ( opValue === '/' ) {

							calcSum = calc.divide(firstNumberValue, secondNumberValue);
							ux.displayValue(calcSum);
							debug.log(calcSum);

					} else if ( opValue === '*' ) {

							calcSum = calc.multiply(firstNumberValue, secondNumberValue);
							ux.displayValue(calcSum);
							debug.log(calcSum);

					} else if ( opValue === '-' ) {

							calcSum = calc.subtract(firstNumberValue, secondNumberValue);
							ux.displayValue(calcSum);
							debug.log(calcSum);

					} else if ( opValue === '+' ) {

							calcSum = calc.addition(firstNumberValue, secondNumberValue);
							ux.displayValue(calcSum);
							debug.log(calcSum);
					} // end if to match opValue

					calcSum = calc.equals();
					// get ready for more math
					numberValue = calcSum.toString(10);
					firstNumberValue = calcSum;
					secondNumberValue = 0;
					opValue = '';
					calcStatus = 1;
					debug.log("calcStatus: " + calcStatus);

		});   // end equals button click event handler

		$('#nine, #eight, #seven, #six, #five, #four, #three, #two, #one, #zero, #decimal').click(function(event) {

				// reading input stream into string, so that multiple digit value can be captured
				numberValue += $(this).text();
				ux.displayValue(numberValue);
				debug.log('input stream..' + numberValue);

		});

		$('#divide, #multiply, #subtract, #add').click(function(event) {

				inputValue = $(this).text();
				debug.log('input stream...' + inputValue);
				debug.log('calcStatus: ' + calcStatus);

				// calcSum (how many numbers do we have)
				// if 0 save numberValue to firstNumberValue
				// if 1 save numberValue to secondNumberValue
				// increment calcStatus, += 1
				if (calcStatus == 0) {
									firstNumberValue = parseFloat(numberValue, 10);
									numberValue = '';
									debug.log('firstNumberValue:' + firstNumberValue);
									opValue = inputValue;
									debug.log('opValue: ' + opValue);
									calcStatus += 1;
									debug.log('calcStatus: ' + calcStatus);
						} else if (calcStatus == 1) {
									secondNumberValue = parseFloat(numberValue, 10);
									debug.log('secondNumberValue:' + secondNumberValue);
									opValue2 = inputValue;
									debug.log('opValue2: ' + opValue2);
									numberValue = '';
									calcStatus += 1;
									debug.log('calcStatus: ' + calcStatus);
						}

			 // is calcStatus >= 1, do we have 2 number values,
			 // if true, do math
			 // for each math operation, save calcSum to firstNumberValue, as subtotal
			if ( calcStatus >= 2 && opValue === '/' ) {

					calcSum = calc.divide(firstNumberValue, secondNumberValue);
					ux.displayValue(calcSum);
					debug.log(calcSum);
					firstNumberValue = calcSum;
					calcStatus = 1;
					opValue = opValue2;

			} else if ( calcStatus >= 2 && opValue === '*' ) {

					calcSum = calc.multiply(firstNumberValue, secondNumberValue);
					ux.displayValue(calcSum);
					debug.log(calcSum);
					firstNumberValue = calcSum;
					calcStatus = 1;
					opValue = opValue2;

			} else if ( calcStatus >= 2 && opValue === '-' ) {

					calcSum = calc.subtract(firstNumberValue, secondNumberValue);
					ux.displayValue(calcSum);
					debug.log(calcSum);
					firstNumberValue = calcSum;
					calcStatus = 1;
					opValue = opValue2;

			} else if ( calcStatus >= 2 && opValue === '+' ) {

					calcSum = calc.addition(firstNumberValue, secondNumberValue);
					ux.displayValue(calcSum);
					debug.log(calcSum);
					firstNumberValue = calcSum;
					calcStatus = 1;
					opValue = opValue2;
			} // end if (calcStatus > 2)

		}); // end operators click event handler

}); // end ready function

// see CalcProject.txt for more developer notes
