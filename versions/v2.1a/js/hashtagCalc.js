//#Calc: calc.js v2.1a

let appStatus = 0;
let version = 'v2.1a'
let allClear = '';
let equals = false;
let percent = false;
let inputValue = '';
let opValue2 = '';
let opValue = '';
let calcSum = 0;
let calcStatus = 0; // number of entered math-operators
let numberValue = '';
let firstNumberValue = 0;
let secondNumberValue = 0;
let numberPressed = false;
let opPressed = false;

// evaluate current input, operators, numbers, complete math operation
const calcEval = {

	ops: function () {

		if ( opValue === '' ) {  // entered something like, 3 =

			// so need to make sure second numberValue value parsed into secondNumberValue
			firstNumberValue = parseFloat(numberValue, 10);
			debug.log('firstNumberValue: ' + firstNumberValue);
			calcSum = calc.addition(firstNumberValue, secondNumberValue);
			ux.displayValue(calcSum);
			debug.log("calcSum:" + calcSum);
			// secondNumberValue should be 0

		} else if ( opValue === "+" || opValue === "-" || opValue === "*" || opValue === "/" ) {  // entered something like, + 3 = or 3 + 4 =

			// so need to make sure second numberValue value parsed into secondNumberValue
			secondNumberValue = parseFloat(numberValue, 10);
			debug.log('secondNumberValue: ' + secondNumberValue);
			debug.log('opValue: ' + opValue);

		} else if ( calcStatus >= 2 ) {  // entered something like, 3 + 3 = 6 + 4 =

			// so need to make sure first and second numberValue value parsed into first and secondNumberValue

			firstNumberValue = calcSum;
			debug.log('firstNumberValue: ' + firstNumberValue);
			secondNumberValue = parseFloat(numberValue, 10);
			debug.log('secondNumberValue: ' + secondNumberValue);
			debug.log('opValue: ' + opValue);
			// secondNumberValue may be 0

		}

	  // do math, get and save calcSum

		if ( opValue === '/' ) {

				calcSum = calc.divide(firstNumberValue, secondNumberValue);
				ux.displayValue(calcSum);
				debug.log("calcSum:" + calcSum);

		} else if ( opValue === '*' ) {

				calcSum = calc.multiply(firstNumberValue, secondNumberValue);
				ux.displayValue(calcSum);
				debug.log("calcSum:" + calcSum);

		} else if ( opValue === '-' ) {

				calcSum = calc.subtract(firstNumberValue, secondNumberValue);
				ux.displayValue(calcSum);
				debug.log("calcSum:" + calcSum);

		} else if ( opValue === '+' ) {

				calcSum = calc.addition(firstNumberValue, secondNumberValue);
				ux.displayValue(calcSum);
				debug.log("calcSum:" + calcSum);

		} // end if to match opValue

	}
}

/* Calc object with methods for basic math
		divide, multiply, subtract, add, use decimals
		input Negitave/Positive (-/+) values
		convert active input value into Percent (%)

		future : more math operations
*/
const calc = {

		sumValue: 0,
		allClear: function() {
			this.sumValue = 0;
			return this.sumValue;
		},
		divide: function(numValue1, numValue2) {
			// normal divide
			this.sumValue = numValue1 / numValue2;
			return this.sumValue;
		},
		multiply: function(numValue1, numValue2) {
			// normal mutliply
			this.sumValue = numValue1 * numValue2;
			return this.sumValue;
		},
		subtract: function(numValue1, numValue2) {
			// normal subtract
			this.sumValue = numValue1 - numValue2;
			return this.sumValue;
		},
		addition: function(numValue1, numValue2) {
			// normal addition
			this.sumValue = numValue1 + numValue2;
			return this.sumValue;
		},
		percent: function(numberOfValues, numValue1, numValue2){
			// % just like any other calculator %
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

// history of calculations, a tape
const tape = {
	// add methods for showing history of calculations, a tape
	showTape: false,
} // end tape (calc history) object

// custom debug tool
const debug = {

// custom debug tool
// at present, manually enable in js console
// preserves line number where debug.log is called

	loggingOn: false,

	log: function (value){
		if(this.loggingOn){
			this.log = console.log.bind(window.console);
		}
	}

// TODO: add more debug functtions

} // end debug object

// UI specific tasks
const ux = {

	/* User Experience, UX
		any code needed to implement a working calculator user interface, UI,
		so UX is how a UI should work, look and feel
	*/

	/* AC/Clear :
		when number or operator pressed
				number or operator now stored
				change AC to Clear
		when Clear pressed
				clear last entry
				change Clear to AC
		when AC pressed
				clear any stored entry, numbers or operators
	*/

	acShow: true,  // true until inital number or math op pressed, or when cleared all of current entry

	acToogle: function () {

	/*  shorthand method for getElementByID
	 		must refer to first object in array
			then normal html methods are accessible */

				debug.log('run acToogle:' + this.acShow);

				if ( this.acShow ) {
					// then toogle C button to AC
					$('#ac')[0].innerHTML = "AC";
					debug.log('C change to AC:' + this.acShow);
				} else {

					// else toogle AC button to C
						$('#ac')[0].innerHTML = "C";
					debug.log('AC change to C:' + this.acShow);
				}

	},

	displayValue: function (value) {

			$('.display').html(
				'<input type="text" id="input1" class="input" placeholder=""></input><input type="text" id="inputNoBlink" class="input" value="' + value + '"></input><input type="text" id="input2" class="input" placeholder=""></input>');

	},  // display input and for initial input stop blinking

	displayVersion: function (version) {
		$('#version').html(version);

	}

} // end ux object

// run code starts here
$(document).ready( function () {
// waiting for html document to load

// display the current version of the app
ux.displayVersion(version);

// turn on debugger or not
if (debug.loggingOn) {console.log.bind(window.console)}

// event-listeners
// listen for events, buttons pressed, and actions to performn

	$('#ac').click(function(event){

			allClear = $(this).text();


			if ( allClear == 'C' ) {

				debug.log('C clicked, roll back to last entry');

				if ( opPressed ) {

					 inputValue = '';
					 opValue = '';
					 debug.log('opValue:' + opValue);
					 debug.log('opValue:' + numberValue);

				} else if ( numberPressed ){

					 inputValue = '';
					 firstNumberValue = initialValue;
					 numberValue = firsrtNumberValue;
					 secondNumberValue = 0;
					 debug.log('firstNumberValue:' + firstNumberValue);
					 debug.log('secondNumberValue:' + secondNumberValue);

				} else { // if equals just pressed

					calcSum = 0;
					ux.displayValue(calcSum);
					debug.log('calcSum:' + calcSum);
					calcStatus = 0;
					debug.log('calcStatus:' + calcStatus);
					numberValue = '';
					debug.log('numberValue:' + numberValue);
					opValue = '';
					debug.log('opValue:' + opValue);
					equals = false;
					debug.log('equals:' + equals);
					numberPressed = false;
					debug.log('numberPressed:' + numberPressed);
					opPressed = false;
					debug.log('opPressed:' + opPressed);
					percent = false;
					debug.log('percent:' + percent);
					firstNumberValue = 0;
					debug.log('firstNumberValue:' + firstNumberValue);
					secondNumberValue = 0;
					debug.log('secondNumberValue:' + secondNumberValue);


				}

				ux.acShow = true;
				ux.acToogle();

			} else if ( allClear === 'AC') {

				 debug.log('AC clicked, reseting all values');

				 calcSum = 0;
				 ux.displayValue(calcSum);
				 debug.log('calcSum:' + calcSum);
				 calcStatus = 0;
				 debug.log('calcStatus:' + calcStatus);
				 numberValue = '';
				 debug.log('numberValue:' + numberValue);
				 opValue = '';
				 debug.log('opValue:' + opValue);
				 equals = false;
				 debug.log('equals:' + equals);
				 numberPressed = false;
				 debug.log('numberPressed:' + numberPressed);
				 opPressed = false;
				 debug.log('opPressed:' + opPressed);
				 percent = false;
				 debug.log('percent:' + percent);
				 firstNumberValue = 0;
				 debug.log('firstNumberValue:' + firstNumberValue);
				 secondNumberValue = 0;
				 debug.log('secondNumberValue:' + secondNumberValue);
				 // TODO: storage of memory values cleared
				 debug.log("memory storage cleared ")

			 }
	}); // end all-clear button event handler

	$('#posNeg, #percent').click(function(event){

		numberPressed = false;
		opPressed = true;

		// entered something like, 3 % or 3 +/-
		opValue = $(this).text();
		debug.log('opValue:', opValue);
		secondNumberValue = 0;


		// if posNeg, have to wait for a number to entered

		if ( opValue === '%' && equals == true ) {

			// so need to make sure numberValue value parsed into firstNumberValue
			// there is no secondNumberValue, yet
			firstNumberValue = calcSum;
			debug.log('calcSum = firstNumberValue:' + firstNumberValue);

			calcSum = calc.percent(numberOfValues, firstNumberValue);
			// for calc.perecent function: one number value passed,
					// simply divide firstNumberValue value by 100
					// return result

			numberOfValues = 0;  // or only 1 value that can be passed to object-method
			percent = true;
			numberValue = '';
			equals = false;

			// result not read into calcSum, since this is part of larger math op

		} else if ( opValue === '%' ) {

			// so need to make sure numberValue value parsed into firstNumberValue
			// there is no secondNumberValue, yet
			firstNumberValue = parseFloat(numberValue, 10);
			debug.log('firstNumberValue:' + firstNumberValue);

			calcSum = calc.percent(numberOfValues, firstNumberValue);
			// for calc.perecent function: one number value passed,
					// simply divide firstNumberValue value by 100
					// return result

			numberOfValues = 0;  // or only 1 value that can be passed to object-method
			percent = true;
			numberValue = '';
			// result not read into calcSum, since this is part of larger math op

		} else if ( opValue === '+/-' ) {

			// get numberValue entered
			firstNumberValue = parseFloat(numberValue, 10);
			// reset numberValue
			numberValue = '';

			// most calculators, require pressing +/- first then a number
		 	calcSum = calc.posNeg(firstNumberValue);
		 	posNeg = true;
		 	numberValue = '';

	 }

		ux.displayValue(calcSum);
		debug.log('calcSum:' + calcSum);
		calcStatus += 1;
		firstNumberValue = calcSum;
		debug.log('firstNumberValue: ' + firstNumberValue);

	}); // end posNeg, percent button click event handler

	$('#equals').click(function(event){

			// treating = special; when pressed, =, completes any ongoing math operation
			// so after math operation completed, equals is true until another math op or number is pressed
			equals = true;
		  // for debug purposes, what math op are we doing, show what the current opValue is
			debug.log('opValue:' + opValue);
			debug.log('opValue2:' + opValue2);

			// eval calcStatus, opValue and complete current math operation
			calcEval.ops();
			// reset for new math operations

			numberValue = '';
			debug.log('numberValue:' + numberValue);
			opValue = '';
			debug.log('opValue:' + opValue);
			opValue2 = '';
			debug.log('opValue2:' + opValue2);


			// reset calcStatus
			calcStatus = 0;
			debug.log("reset calcStatus: " + calcStatus);

	}); // end equals button click event handler

	$('#nine, #eight, #seven, #six, #five, #four, #three, #two, #one, #zero, #decimal').click(function(event) {

		numberPressed = true;
		opPressed = false;

		ux.acShow = false;
		ux.acToogle();


		if (equals) {

				// after equals calculation, reset numberValue entry
				numberValue = '';
				equals = false;

		 }// end if ( opValue..)

		 // reading input as a stream into string, so that multiple digits value can be captured
		 numberValue += $(this).text();

		 // displaying value in calc .display element
		 ux.displayValue(numberValue);
		 debug.log('input stream..' + numberValue);

	}); // end numbers pressed event  handler

	$('#divide, #multiply, #subtract, #add').click(function(event) {

			numberPressed = false;
			opPressed = true;

			ux.acShow = false;
			ux.acToogle();

			inputValue = $(this).text();
			debug.log('input stream...' + inputValue);

			// calcSum (how many numbers do we have)
			// if 0 save numberValue to firstNumberValue
			// if 1 save numberValue to secondNumberValue
			// increment calcStatus, += 1
			if ( equals == true && opValue === '' ) {

					opValue = inputValue;
					debug.log('opValue: ' + opValue);
					firstNumberValue = calcSum;
					debug.log('firstNumberValue:' + firstNumberValue);
					calcStatus += 1;
					debug.log('calcStatus: ' + calcStatus);
					equals = false;

			} else if (opValue === '' ) {

					opValue = inputValue;
					firstNumberValue = parseFloat(numberValue, 10);
					debug.log('firstNumberValue:' + firstNumberValue);
					numberValue = '';
					debug.log('opValue: ' + opValue);
					calcStatus += 1;
					debug.log('calcStatus: ' + calcStatus);

			} else if ( opValue === '+/-' ) {

					opValue = inputValue;
					firstNumberValue = calcSum;
					debug.log('firstNumberValue:' + firstNumberValue);
					numberValue = '';
					debug.log('opValue: ' + opValue);
					calcStatus += 1;
					debug.log('calcStatus: ' + calcStatus);

			} else if ( opValue === "+" || opValue === "-" || opValue === "*" || opValue === "/" ) {

					// if just summed using equals
					if (equals){
						firstNumberValue = calcSum;
					}

					secondNumberValue = parseFloat(numberValue, 10);
					numberValue = '';
					debug.log('secondNumberValue:' + secondNumberValue);
					opValue2 = inputValue;
					debug.log('opValue2: ' + opValue);
					calcStatus += 1;
					debug.log('calcStatus: ' + calcStatus);

			} else if ( opValue === '%') {

				opValue2 = opValue;
				opValue = inputValue;
				numberValue = '';
				firstNumberValue = calcSum;
				// calcStatus += 1;
				// calcEval.ops();
				debug.log('opValue: ' + opValue);
				debug.log('opValue2: ' + opValue2);
				debug.log('firstNumberValue = calcSum: ' + calcSum);
				debug.log('calcStatus: ' + calcStatus);

			}

		 // is calcStatus >= 1, then a calc has already been performed
		 // if true, do math
		 // for each math operation, save calcSum to firstNumberValue, as subtotal
		if ( calcStatus >= 2 && opValue === '/' ) {

				calcSum = calc.divide(firstNumberValue, secondNumberValue);
				ux.displayValue(calcSum);
				debug.log('calcSum:' + calcSum);
				firstNumberValue = calcSum;
				secondNumberValue = 0;
			  calcStatus -= 1;

		} else if ( calcStatus >= 2 && opValue === '*' ) {

				calcSum = calc.multiply(firstNumberValue, secondNumberValue);
				ux.displayValue(calcSum);
				debug.log('calcSum:' + calcSum);
				firstNumberValue = calcSum;
				secondNumberValue = 0;
			  calcStatus -= 1;

		} else if ( calcStatus >= 2 && opValue === '-' ) {

				calcSum = calc.subtract(firstNumberValue, secondNumberValue);
				ux.displayValue(calcSum);
				debug.log('calcSum:' + calcSum);
				firstNumberValue = calcSum;
				secondNumberValue = 0;
			  calcStatus -= 1;

		} else if ( calcStatus >= 2 && opValue === '+' ) {

				calcSum = calc.addition(firstNumberValue, secondNumberValue);
				ux.displayValue(calcSum);
				debug.log('calcSum:' + calcSum);
				firstNumberValue = calcSum;
				secondNumberValue = 0;
			  calcStatus -= 1;

		} // end if (calcStatus > 2)

	}); // end operators click event handler

}); // end ready function

// see CalcProject.txt for more developer notes
