//#Calc: calc.js v1.1a

// required js libraries: danielsUx, danielsMath.js

// declaring variables before ready function for console access
// for beta and release versions will move inside ready function
// future debug feature: log errors, error handling

// declaring variables with default values

let numberValue = ''; // string value incremented by $(this).text() when number value clicked
let inputValue = '';  // no longer used

let allClear = ''; // string value, assigned $(this).text() when 'AC' buuton is clicked
let equals = '';  // string value, assigned $(this).text() when '=' value clicked

let opValue = ''; // string value, assigned to the first opValue stored in inputStream object array
let opValue2 = ''; // string value, assigned, when present, to second opValue stored in inputStream object array
let firstNumberValue = 0;  // assigned parseFloat(10) assigned to first number value stored in inputStream object array
let secondNumberValue = 0; // assigned parseFloat(10) assigned to second number value stored in inputStream object array

let inputStreamAL = 0; // array length of danielsUx:values.inputStream array
let tapeAL = 0  // array length of danielsUx:values.tape array

let calcSum = 0;  // is assigned return value of calc math op and equals methods

let calcStatus = 0; // number of entered values parseInt by math-operations
let numberOfValues = 0;  // number of values that are ready to be passed to an object-method

// logging to console every chance I get, for debug purposes

$(document).ready( function () {
// waiting for html document to load

		$('#ac').click(function(event){

		});

		$('#posNeg, #percent').click(function(event){

			// entered something like, 3 % or 3 +/-
			// need to verify which value to convert
			// and
			// either convert firstNumberValue into percentage or positve/negative value
			// or
			// need to convert secondNumberValue and ...
			// find what percentage of firstNumberValue, secondNumberValue is
			// either way need to return a converted value immedialty...

			opValue = $(this).text();

			if ( inputStreamAL = 2 ) {

				console.log('opValue:', opValue);
				// not reading opValue into array, just to pop() it off again
				tapeAL = values.tape.push(opValue);
				firstNumberValue = values.inputStream.pop();
				numberValues = 1;

					if ( opValue === '%' ) {

						firstNumberValue = calc.percent(numberOfValues, firstNumberValue);
						values.tasksAfterEquals(numberValues, firstNumberValue);
						// for calc.perecent function: one number value passed,
								// simply divide firstNumberValue value by 100
								// return result
						// result not read into calcSum, since this is part of larger math op

					} else if ( opValue === '+/-' ) {

						firstNumberValue = calc.posNeg(firstNumberValue);
						values.tasksAfterEquals(firstNumberValue);
					  // result not assginged to calcSum, since this is part of larger math op
					}

			} else {

				// else then something like, + 3 % or 4 + 3 %
				// OR  + 3 +/- or 4 + 3 +/- has been entered
				// a math oeprator click event has already parseFloat firstNumberValue
				// firstNumberValue may be 0, but ussualy will be a number > 0
				// '%' or '+/-' is opValue2
				opValue2 = opValue;
				console.log('opValue2:', opValue);
				// not reading opValue into array, just to pop() it off again
				tapeAL = values.tape.push(opValue);

					if ( opValue2 === '%' ) {

						secondNumberValue = values.inputStream.pop();
						opValue = values.inputStream.pop();
						firstNumberValue = values.inputStream.pop();
						numberValues = 2;
						secondNumberValue = calc.percent(numberOfValues, firstNumberValue, secondNumberValue);
						// for calc.perecent function: two number values passed
								// multiply first number by result of (divide second number by 100),
								// return result
						values.tasksAfterPercent(numberOfValues, firstNumberValue, opValue, secondNumberValue);;
						// result not read into calcSum, since this is part of larger math op

					} else if ( opValue2 === '+/-' ) {

						secondNumberValue = values.inputStream.pop();
						numberValues = 1;
						secondNumberValue = calc.posNeg(secondNumberValue);
						values.tasksAfterEquals(secondNumberValue);
						// result not read into calcSum, since this is part of larger math op

					} // end if (opValue ...)

			} // end if (calcStatus ...) */


		}); // end posNeg, percent button click event handler

		$('#equals').click(function(event){

			console.log('equals clicked... ');
			equals = $(this).text();
			values.readIntoArray(equals);

			/* working with calc math mathods and inputStream array elements....
					//
					// if no opValue, just numberValue entered first, then equals, like 3 then = :
					// read into array : default value first: 0:0, 1:3, 2:=
					// array.length = 3
					//
					// then no math calc, nothing to calc sum of
					// until more numnberValues and opValues entered...
					// but can still take "sum",
					// by popping off tbhe equals and reading only numberValue back into array
					// read into array : default value first: 0:0, 1:3
					//
					// so as more vaules read into array, like: 0:0, 1:3, 2:-, 3:2, 4:=
					// by then array.length = 5
					// last opValue, array element 4 kept in place, but elements, 3, 2 and 1 popped off
					// then can do calc and get sum : 3-2 = 1
					// calcSum = 1
					// calcSum = 1, read into array as last element
					// so after math calc with equals, array contents: 0:0, 1:1
					//
					// if opValue entered first, like - then 3 then = :
					// then array contents : default value first:  0:0, 1:-, 2:3, 4:=
					// array.length = 4
					// then most calculators will calc as if the first value is a 0..
					// then will need to do math to get calcSum and display it, like..
					// like : 0 / 3 = 0
					// like : 0 * 3 = 0
					// like : 0 - 3 = -3
					//
					// so if : 0 + 3 = 3
					// read into array: 0:0, 1:3
					// since using pop() to get values for math then need to ..
					// first, read, push(), default element of 0 back into array
					// then read, push(), calcSum into array
					//
					// if numberValue entered first, then opValue, then equals, like 3, +, then = :
					// read into array : default value first: 0:0, 1:3, 2:+, 3:=
					// array.length = 4
					//
					// most calculators would to divide by, multiply by, add by, subtract from itself
					// like : 3 / (3) = 1
					// like : 3 * (3) = 9
					// like : 3 - (3) = 0
					// in case of : 3 + (3) = 6
					// popping off =, +, then 3
					// read calcSum of above into array as : 0:0, 1:3
			 */

			 // the matchMathOp, method matches the opValue to it's respecitve calc.. math method, call it and returns the sumValue
			 // but first have to make sure, which values are numberValues or opValues

			if ( values.inputStreamAL == 4 ) {

					equals = parseFloat(values.inputStream.pop() );

					if ( isNaN( parseFloat(values.inputStream.pop() ) ) ) { 		// if inputlike 0:0, 1:3, 2:-, 3:=
						opValue = values.inputStream.pop();
						secondNumberValue = parseFloat( values.inputStream.pop() );
						firstNumberValue = secondNumberValue;
					} else {																										// if inputlike 0:0, 1:-, 2:3, 3:=
						secondNumberValue = parseFloat( values.inputStream.pop() );
						opValue = parseFloat( values.inputStream.pop() );
						firstNumberValue = parseFloat( values.inputStream.pop() );
						inputStreamAL = values.inputStream.push(0); // have to read default 0 back into array...
					}

					calcSum = calc.matchMathOp(opValue, firstNumberValue, secondNumberValue);

				} else if ( values.inputStreamAL == 5 ) {

						// if inputlike 0:0, 1:3, 2:-, 3:3, 4:=
						secondNumberValue = parseFloat( values.inputStream.pop() );
						opValue = parseFloat( values.inputStream.pop() );
						firstNumberValue = parseFloat( values.inputStream.pop() );

						calcSum = calc.matchMathOp(opValue, firstNumberValue, secondNumberValue);
				}// end if (inputStreamAL .. )

		  // after equals, only default 0 value and calcSum left in array
		  values.tasksAfterEquals(calcSum);
			values.showArrayStatus();


		});   // end equals button click event handler

		$('#nine, #eight, #seven, #six, #five, #four, #three, #two, #one, #zero, #decimal').click(function(event) {

				// reading input stream into a string, numberValue
				numberValue += $(this).text();
				console.log('input stream...' + numberValue);

		});

		$('#divide, #multiply, #subtract, #add').click(function(event) {

				// can't know what the numberValue input of it is stopped by entering an opValue ...
				// then take what is already in numberValue string read into inputStream object-array
				values.readIntoArray(numberValue);
				values.displayValue(values.inputStream[inputStreamAL-1]);
				values.showArrayStatus();


			  // then read the operation value just entered into string then into end of inputStream object-array
				opValue = $(this).text();
				console.log('opValue...' + opValue);
				values.readIntoArray(opValue);
				values.handleOpValue(opValue);
				values.showArrayStatus();

				// now figuring whether to do math yet or not...
				/* working with calc math mathods and inputStream array elements....
						//
						// if numberValue entered first, then an opValue, like 3 then - :
						// read into array : default value first: 0:0, 1:3, 2:-
						// array.length = 3
						//
						// then no math calc, nothing to divide by, multiply by, subtract from, or add to ..
						// until another numberValue entered then another opValue ...
						//
						// so as more vaules read into array, like: 0:0, 1:3, 2:-, 3:2, 4:+
						// by then array.length = 5
						// now can do math,
						// last opValue, array element 4 kept in place, but elements, 3, 2 and 1 popped off
						//
						// then can do math as ussual : 3-2 = 1
						// calcSum = 1
						// calcSum = 1, read into array BEFORE last opValue
						// so after math calc, array contents: 0:0, 1:1, 2:+
						//
						// if opValue entered first, like - then 3 then + :
						// then array contents : default value first:  0:0, 1:-, 2:3, 4:+
						// array.length = 4
						// then most calculators will calc as if the first value is a 0..
						// then will need to display result of calc, like..
						// like : 0 / 3 = 0
						// like : 0 * 3 = 0
						// like : 0 - 3 = -3
						// like : 0 + 3 = 3
				 */

			 if ( values.inputStreamAL >= 5 ) {  // if we do have enough values to run math calc..

				   //get opValues and numberValues...
					 opValue2 = values.inputStream.pop();
					 secondNumberValue = parseFloat( values.inputStream.pop());
					 opValue1 = values.inputStream.pop();
					 firstNumberValue = parseFloat( values.inputStream.pop() );

					 // the matchMathOp method matches the opValue to it's respecitve calc.. math method, call it and returns the sumValue

					 calcSum = calc.matchMathOp(opValue1, firstNumberValue, secondNumberValue);

					// read calcSum then opValue2 back into array, to get ready for math ....
					values.tasksAfterCalc(opValue2, calcSum);
					values.showArrayStatus();

				} // end of (inputStreamAL ...

		}); // end operators click event handler

}); // end ready function

// see CalcProject.txt for more developer notes
