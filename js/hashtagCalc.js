//#Calc: calc.js v2.0a

// Milestone: all basic calcs and running balance math works

// TODO: simplfy logic for tracking calculations

// TODO: some ready function and code probably should be moved to UX object functions

// TODO: make code more modular, object compmnent-oriented

// TOTO : finish built-in debug.log feature: log errors,
// want to preserve line number of code snippet
// also error handling


// TODO : built-in tape feature
// but need to build UI for it

// declaring variables that may change
// ... before ready function for console access
// for beta and release versions will move inside ready function

let allClear = '';
let equals = false;
let percent = false;
let inputValue = '';
let opValue2 = '';
let opValue = '';
let calcSum = 0;
let calcStatus = 0; // number of entered values parseInt by math-operations
let numberValue = '';
let firstNumberValue = 0;
let secondNumberValue = 0;
let numberOfValues = 0;  // number of values that are passed to a object-method


const runningCalc = {

	equals: function () {

		if ( opValue === '' ) {  // entered something like, 3 =

			// so need to make sure second numberValue value parsed into secondNumberValue
			firstNumberValue = parseFloat(numberValue, 10);
			console.log('firstNumberValue: ' + firstNumberValue);
			calcSum = calc.addition(firstNumberValue, secondNumberValue);
			ux.displayValue(calcSum);
			console.log("calcSum:" + calcSum);
			// secondNumberValue should be 0

		} else if ( opValue === "+" || opValue === "-" || opValue === "*" || opValue === "/" ) {  // entered something like, + 3 = or 3 + 4 =

			// so need to make sure second numberValue value parsed into secondNumberValue
			secondNumberValue = parseFloat(numberValue, 10);
			console.log('secondNumberValue: ' + secondNumberValue);
			console.log('opValue: ' + opValue);

		} else if ( calcStatus >= 2 ) {  // entered something like, 3 + 3 = 6 + 4 =

			// so need to make sure first and second numberValue value parsed into first and secondNumberValue

			firstNumberValue = calcSum;
			console.log('firstNumberValue: ' + firstNumberValue);
			secondNumberValue = parseFloat(numberValue, 10);
			console.log('secondNumberValue: ' + secondNumberValue);
			console.log('opValue: ' + opValue);
			// secondNumberValue may be 0

		}

	  // do math, get and save calcSum

		if ( opValue === '/' ) {

				calcSum = calc.divide(firstNumberValue, secondNumberValue);
				ux.displayValue(calcSum);
				console.log("calcSum:" + calcSum);

		} else if ( opValue === '*' ) {

				calcSum = calc.multiply(firstNumberValue, secondNumberValue);
				ux.displayValue(calcSum);
				console.log("calcSum:" + calcSum);

		} else if ( opValue === '-' ) {

				calcSum = calc.subtract(firstNumberValue, secondNumberValue);
				ux.displayValue(calcSum);
				console.log("calcSum:" + calcSum);

		} else if ( opValue === '+' ) {

				calcSum = calc.addition(firstNumberValue, secondNumberValue);
				ux.displayValue(calcSum);
				console.log("calcSum:" + calcSum);

		} // end if to match opValue

	}
}

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
				console.log('AC clicked, reseting all values');

				calcSum = calc.allClear();
				ux.displayValue(calcSum);
				console.log('calcSum:' + calcSum);
				calcStatus = 0;
				console.log('calcStatus:' + calcStatus);
				numberValue = '';
				console.log('numberValue:' + numberValue);
				opValue = '';
				console.log('opValue:' + opValue);
				equals = false;
				console.log('equals:' + equals);
				firstNumberValue = 0;
				console.log('firstNumberValue:' + firstNumberValue);
				secondNumberValue = 0;
				console.log('secondNumberValue:' + secondNumberValue);
		});

		$('#posNeg, #percent').click(function(event){

			// entered something like, 3 % or 3 +/-
			opValue = $(this).text();
			console.log('opValue:', opValue);

			// so need to make sure numberValue value parsed into firstNumberValue
			// there is no secondNumberValue, yet
			firstNumberValue = parseFloat(numberValue, 10);
			console.log('firstNumberValue:' + firstNumberValue);

			if ( opValue === '%' ) {

				calcSum = calc.percent(numberOfValues, firstNumberValue);
				// for calc.perecent function: one number value passed,
						// simply divide firstNumberValue value by 100
						// return result

				numberOfValues = 0;  // or only 1 value that can be passed to object-method
				percent = true;
				numberValue = '';
				// result not read into calcSum, since this is part of larger math op

			} else if ( opValue === '+/-' ) {

				calcSum = calc.posNeg(firstNumberValue);
				posNeg = true;
				numberValue = '';
			  // result not read into calcSum, since this is part of larger math op

			} // end if ( opValue..)

			ux.displayValue(calcSum);
			console.log('calcSum:' + calcSum);
			calcStatus += 1;
			firstNumberValue = calcSum;
			console.log('firstNumberValue: ' + firstNumberValue);

		}); // end posNeg, percent button click event handler

		$('#equals').click(function(event){

				console.log('opValue:' + opValue);

				runningCalc.equals();
				opValue = '';
				// calcSum = calc.equals();
				// get ready for more math
				numberValue = calcSum.toString(10);
				firstNumberValue = calcSum;
				// secondNumberValue = 0
				console.log("calcSum: " + calcSum)
				calcStatus = 0;
				console.log("calcStatus: " + calcStatus);

		});   // end equals button click event handler

		$('#nine, #eight, #seven, #six, #five, #four, #three, #two, #one, #zero, #decimal').click(function(event) {

				// reading input stream into string, so that multiple digit value can be captured
				numberValue += $(this).text();
				ux.displayValue(numberValue);
				console.log('input stream..' + numberValue);

		});

		$('#divide, #multiply, #subtract, #add').click(function(event) {

				inputValue = $(this).text();
				console.log('input stream...' + inputValue);

				// calcSum (how many numbers do we have)
				// if 0 save numberValue to firstNumberValue
				// if 1 save numberValue to secondNumberValue
				// increment calcStatus, += 1
				if (opValue === '' ) {
						firstNumberValue = parseFloat(numberValue, 10);
						console.log('firstNumberValue:' + firstNumberValue);
						numberValue = '';
						opValue = inputValue;
						console.log('opValue: ' + opValue);
						calcStatus += 1;
						console.log('calcStatus: ' + calcStatus);

				} else if ( opValue === "+" || opValue === "-" || opValue === "*" || opValue === "/" ) {

						// runningCalc.equals();
						// firstNumberValue = calcSum;
						secondNumberValue = parseFloat(numberValue, 10);
						numberValue = '';
						console.log('secondNumberValue:' + secondNumberValue);
						opValue2 = inputValue;
						console.log('opValue2: ' + opValue);
						calcStatus += 1;
						console.log('calcStatus: ' + calcStatus);

				} else if ( opValue === '%') {

					opValue2 = opValue;
					opValue = inputValue;
					numberValue = '';
					firstNumberValue = calcSum;
					// runningCalc.equals();
					console.log('firstNumberValue:' + firstNumberValue);
					console.log('opValue: ' + opValue);
					console.log('opValue2: ' + opValue2);
					console.log('calcStatus: ' + calcStatus);

				} else if ( opValue === '+/-') {

					opValue = inputValue;
					console.log('opValue: ' + inputValue);
				}

			 // is calcStatus >= 1, then a calc has already been performed
			 // if true, do math
			 // for each math operation, save calcSum to firstNumberValue, as subtotal
			if ( calcStatus >= 2 && opValue === '/' ) {

					calcSum = calc.divide(firstNumberValue, secondNumberValue);
					ux.displayValue(calcSum);
					console.log('calcSum:' + calcSum);
					firstNumberValue = calcSum;
					secondNumberValue = 0;
				  calcStatus = 0;

			} else if ( calcStatus >= 2 && opValue === '*' ) {

					calcSum = calc.multiply(firstNumberValue, secondNumberValue);
					ux.displayValue(calcSum);
					console.log('calcSum:' + calcSum);
					firstNumberValue = calcSum;
					secondNumberValue = 0;
				  calcStatus = 0;

			} else if ( calcStatus >= 2 && opValue === '-' ) {

					calcSum = calc.subtract(firstNumberValue, secondNumberValue);
					ux.displayValue(calcSum);
					console.log('calcSum:' + calcSum);
					firstNumberValue = calcSum;
					secondNumberValue = 0;
				  calcStatus = 0;

			} else if ( calcStatus >= 2 && opValue === '+' ) {

					calcSum = calc.addition(firstNumberValue, secondNumberValue);
					ux.displayValue(calcSum);
					console.log('calcSum:' + calcSum);
					firstNumberValue = calcSum;
					secondNumberValue = 0;
				  calcStatus = 0;

			} // end if (calcStatus > 2)

		}); // end operators click event handler

}); // end ready function

// see CalcProject.txt for more developer notes
