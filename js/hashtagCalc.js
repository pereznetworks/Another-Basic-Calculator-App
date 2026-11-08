

let version = 'v2.5b'
let allClear = '';
let equals = false;
let equalsJustPressed = false;
let percent = false;
let initialValue = 0;
let firstentry = true;
let inputValue = null;
let opPressedOnce = false;
let opValue2 = '';
let opValue = '';
let calcSum = 0;
let calcStatus = 0;
let numberValue = 0;
let numberOfValues = 0;
let firstNumberValue = 0;
let secondNumberValue = 0;
let numberPressed = false;
let opPressed = false;
let posNegPercentPressed;

import { calc } from './doMath.js';
import { debug } from './calcSettings.js';
import { ux } from './workingDisplay.js';
import { calcEval } from './evalUtils.js';

// not using yet 
import { mathSettings } from './calcSettings.js';
import { tape } from './calcSettings.js';

$(document).ready( function () {

	ux.displayVersion(version);

	// turn on debugger or not
	if (debug.loggingOn) {console.log.bind(window.console)}

	$('#ac, #lac').click(function(event){
		
		debug.log('AC pressed ...');
		allClear = $(this).text();

		if ( allClear == 'C' ) {

			debug.log('C clicked, roll back to last entry');
			

			if ( opPressed ) {
				opValue = '';
				opPressed = false;
				calcStatus > 1 ? calcStatus -= 1 : calcStatus = 0;
				firstNumberValue == NaN ? inputValue = '' : inputValue = firstNumberValue;
				debug.log('opValue:' + opValue);
				debug.log('calcstatus:' + calcStatus);
				debug.log('inputValue:' + inputValue);
				debug.log('numberValue:' + numberValue);
				debug.log('firstNumberValue:' + firstNumberValue);

			} else if ( numberPressed ){

				inputValue = '';
				firstNumberValue = initialValue;
				numberValue = firstNumberValue;
				secondNumberValue = 0;
				ux.displayValue(initialValue);
				debug.log('firstNumberValue:' + firstNumberValue);
				debug.log('secondNumberValue:' + secondNumberValue);

			} else { // if equals just pressed


				calcSum = 0;
				ux.displayValue(calcSum);
				debug.log('calcSum:' + calcSum);
				calcStatus = 0;
				debug.log('calcStatus:' + calcStatus);
				inputValue = initialValue;
				numberValue = '';
				debug.log('numberValue:' + numberValue);
				opValue = '';
				debug.log('opValue:' + opValue);
				opValue2 = '';
				debug.log('opValue:' + opValue2);
				equals = false;
				debug.log('equals:' + equals);
				numberPressed = false;
				debug.log('numberPressed:' + numberPressed);
				opPressed = false;
				debug.log('opPressed:' + opPressed);
				posNegPercentPressed = false;
				debug.log('posNegPercentPressed: ' + posNegPercentPressed);
				percent = false;
				debug.log('percent:' + percent);
				firstNumberValue = 0;
				debug.log('firstNumberValue:' + firstNumberValue);
				secondNumberValue = 0;
				debug.log('secondNumberValue:' + secondNumberValue);
				// TODO: storage of memory values cleared
				debug.log("memory storage cleared ")
				
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
			inputValue = '';
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

	$('#posNeg, #percent, #lposNeg, #lpercent').click(function(event){

			if (!posNegPercentPressed) {

				posNegPercentPressed = true;

				debug.log('inputValue: ' + inputValue);
				numberValue = parseFloat(inputValue);
				inputValue = '';
				numberPressed = false;
				opPressed = true;
				equalsJustPressed = false 
				opValue = $(this).text();
				debug.log('opValue:', opValue);
				secondNumberValue = 0;

				// has a math operation has taken place or should, and what to do
				if ( opValue === '%' && equals == true ) {

					firstNumberValue = calcSum;
					debug.log('calcSum = firstNumberValue:' + firstNumberValue);
					calcSum = calc.percent(numberOfValues, firstNumberValue);
					numberOfValues = 0;
					percent = true;
					numberValue = '';
					equals = false;

				} else if ( opValue === '%' ) {

					firstNumberValue = parseFloat(numberValue, 10);
					debug.log('firstNumberValue:' + firstNumberValue);
					calcSum = calc.percent(numberOfValues, firstNumberValue);
					numberOfValues = 0;
					percent = true;
					numberValue = '';

				} else if ( opValue === '+/-' ) {

					firstNumberValue = parseFloat(numberValue, 10);
					numberValue = '';
					calcSum = calc.posNeg(firstNumberValue);
					posNeg = true;

			}

				if(isNaN(calcSum)) {
					let setToZero = 0
					ux.displayValue(setToZero);
					firstNumberValue = setToZero;
					secondNumberValue = setToZero;
					calcStatus = 0;
				} else {
					// calcSum = mathSettings.setDecimals(calcSum);
					ux.displayValue(calcSum);
				}
					
				debug.log('calcSum:' + calcSum);
				firstNumberValue = calcSum;
				debug.log('firstNumberValue: ' + firstNumberValue);

			}

	}); // end listener for +/-  %

	$('#equals, #lequals').click(function(event){

		if (!equalsJustPressed) {
			
			debug.log('equals pressed');
			equals = true;
			equalsJustPressed = true;
			opPressedOnce = false;
			opValue2 = '=';
			calcStatus++

			numberValue = parseFloat(inputValue);
			debug.log('input stream.. ' + inputValue);
			debug.log('numberValue ' + numberValue);

			// eval all numeric entry and operators and do math
			if (calcStatus == 3) {
			calcEval.ops()	
			} else {
				ux.handleOpPressed(event);	
			}
		}
		


	}); // end equals 

	$('#nine, #eight, #seven, #six, #five, #four, #three, #two, #one, #zero, #decimal, #lnine, #leight, #lseven, #lsix, #lfive, #lfour, #lthree, #ltwo, #lone, #lzero, #ldecimal').click(function(event) {

	  
		// read value 
		numberPressed = true;
		equalsJustPressed = false;
		opPressedOnce = false;
		ux.acShow = false;
		ux.acToogle();     
        

		posNegPercentPressed = false;
		debug.log('posNegPercentPressed: ' + posNegPercentPressed);

		if (firstentry) {
			inputValue = $(this).text();
			ux.displayValue(inputValue);
			firstentry = false;
		} else {
			inputValue += $(this).text();
			ux.displayValue(inputValue);
		}


		debug.log('input stream..' + inputValue);
		debug.log('this.text..' + $(this).text());			  

	}); // end listner for nums pressed
	
	$('#divide, #multiply, #subtract, #add, #ldivide, #lmultiply, #lsubtract, #ladd').click(function(event) {
		
		equalsJustPressed = false;
		debug.log("equals just pressed: " + equalsJustPressed);

		if (!opPressedOnce) {
			opPressedOnce = true;
			debug.log('opPressesOnce: ' + opPressedOnce);
			opPressed = true;
			opValue = $(this).text()
			debug.log('opValue' + opValue);
			debug.log('posNegPercentPressed: ' + posNegPercentPressed);
			calcStatus++;
			debug.log('calcStatus' + calcStatus);
			firstentry = true;
			
			if (equals && numberPressed && calcSum != 0) {

				debug.log('opValue' + opValue);
				calcStatus = 3;
				calcEval.ops();

			} else if ( !posNegPercentPressed ) {
					debug.log('input stream...' + inputValue);
					if (inputValue == null) {
						numberValue = 0;
					} else {
						numberValue = parseFloat(inputValue);
					}
					debug.log('numberValue...' + numberValue);
					inputValue = null;
					ux.handleOpPressed(event);
			} 
		}

	}); // end listner for basic math ops

}); // end $(document).ready
