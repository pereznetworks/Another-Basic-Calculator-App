import { ux } from './ux.js';
import { calcEval } from './calcEval.js';
import { mathSettings } from './mathSettings.js';


let version = 'v2.6'
let allClear = '';
let percent = false;
let initialValue = 0;
let posNegPercentPressed;

const calcValues = {
	firstNumberValue: 0,
	secondNumberValue: 0,
	calcSum: 0,
	calcStatus: 0,
	numberValue: '',
	opValue: '',
	opValue2: '',
	inputValue: null,
	equals: false,
	numberPressed: false,
	opPressed: false
}

$(document).ready( function () {

ux.displayVersion(version);

// event-listeners

	$('#ac, #lac').click(function(event){

	  console.log('All clear button pressed');
		
		allClear = $(this).text();

		if ( allClear == 'C' ) {
			

			if ( calcValues.opPressed ) {
				calcValues.opValue = '';
				calcValues.opPressed = false;
				calcValues.calcStatus > 1 ? calcValues.calcStatus -= 1 : calcValues.calcStatus = 0;
				calcValues.firstNumberValue == NaN ? calcValues.inputValue = '' : calcValues.inputValue = calcValues.firstNumberValue;

			} else if ( calcValues.numberPressed ){

				calcValues.inputValue = '';
				calcValues.firstNumberValue = initialValue;
				calcValues.numberValue = calcValues.firstNumberValue;
				calcValues.secondNumberValue = 0;
				ux.displayValue(initialValue);

			} else { // if equals just pressed


				calcValues.calcSum = 0;
				ux.displayValue(calcValues.calcSum);
				calcValues.calcStatus = 0;
				calcValues.inputValue = initialValue;
				calcValues.numberValue = '';
				calcValues.opValue = '';
				calcValues.opValue2 = '';
				calcValues.equals = false;
				calcValues.numberPressed = false;
				calcValues.opPressed = false;
				posNegPercentPressed = false;
				percent = false;
				calcValues.firstNumberValue = 0;
				calcValues.secondNumberValue = 0;
				
			}

			ux.acShow = true;
			ux.acToogle();

		} else if ( allClear === 'AC') {

			calcValues.calcSum = 0;
			ux.displayValue(calcValues.calcSum);
			calcValues.calcStatus = 0;
			calcValues.inputValue = '';
			calcValues.numberValue = '';
			calcValues.opValue = '';
			calcValues.equals = false;
			calcValues.numberPressed = false;
			calcValues.opPressed = false;
			percent = false;
			calcValues.firstNumberValue = 0;
			calcValues.secondNumberValue = 0;
		}
	}); // end all-clear button event handler

	$('#posNeg, #percent, #lposNeg, #lpercent').click(function(event){

			if (!posNegPercentPressed) {

				posNegPercentPressed = true;

				calcValues.numberPressed = false;
				calcValues.opPressed = true;
				calcValues.equalsJustPressed = false 
				calcValues.numberValue = parseFloat(calcValues.inputValue);
				calcValues.inputValue = '';
				calcValues.opValue = $(this).text();
				calcValues.secondNumberValue = 0;

				// has a math operation has taken place or should, and what to do
				if ( calcValues.opValue === '%' && calcValues.equals == true ) {

					percent = true;
					calcValues.firstNumberValue = calcValues.calcSum;
					calcValues.calcSum = calc.percent(calcValues.numberOfValues, calcValues.firstNumberValue);
					calcValues.numberOfValues = 0;
					calcValues.numberValue = '';
					calcValues.equals = false;

				} else if ( calcValues.opValue === '%' ) {

					calcValues.firstNumberValue = parseFloat(calcValues.numberValue, 10);
					calcValues.calcSum = calcEval.percent(calcValues.numberOfValues, calcValues.firstNumberValue);
					calcValues.numberOfValues = 0;
					calcValues.percent = true;
					calcValues.numberValue = '';

				} else if ( calcValues.opValue === '+/-' ) {

					calcValues.firstNumberValue = parseFloat(calcValues.numberValue, 10);
					calcValues.numberValue = '';
					calcValues.calcSum = calcEval.posNeg(calcValues.firstNumberValue);
					calcValues.posNegPressed = true;

			}

				if(isNaN(calcValues.calcSum)) {
					let setToZero = 0
					ux.displayValue(setToZero);
					calcValues.firstNumberValue = setToZero;
					calcValues.secondNumberValue = setToZero;
					calcStatus = 0;
				} else {
					calcSum = mathSettings.setDecimals(calcSum);
					ux.displayValue(calcValues.calcSum);
				}
					
				calcValues.firstNumberValue = calcValues.calcSum;

			}

	}); // end listener for +/-  %

	$('#equals, #lequals').click(function(event){

		if (!calcValues.equalsJustPressed) {
			
			calcValues.equals = true;
			calcValues.equalsJustPressed = true;
			calcValues.opPressedOnce = false;
			calcValues.opValue2 = '=';
			calcValues.calcStatus++

			calcValues.numberValue = parseFloat(calcValues.inputValue);

			// eval all numeric entry and operators and do math
			if (calcValues.calcStatus == 3) {
			calcEval.ops(calcValues.firstNumberValue, calcValues.secondNumberValue, calcValues.opValue)
			} else {
				ux.handleOpPressed(calcValues, event);
			}
		}
		


	}); // end equals 

	$('#nine, #eight, #seven, #six, #five, #four, #three, #two, #one, #zero, #decimal, #lnine, #leight, #lseven, #lsix, #lfive, #lfour, #lthree, #ltwo, #lone, #lzero, #ldecimal').click(function(event) {

	  
		// read value 
		calcValues.numberPressed = true;
		calcValues.equalsJustPressed = false;
		calcValues.opPressedOnce = false;
		ux.acShow = false;
		ux.acToogle();     
        

		calcValues.posNegPercentPressed = false;

		if (calcValues.firstentry) {
			calcValues.inputValue = $(this).text();
			ux.displayValue(calcValues.inputValue);
			calcValues.firstentry = false;
		} else {
			calcValues.inputValue += $(this).text();
			ux.displayValue(calcValues.inputValue);
		}


	}); // end listner for nums pressed
	
	$('#divide, #multiply, #subtract, #add, #ldivide, #lmultiply, #lsubtract, #ladd').click(function(event) {
		
		calcValues.equalsJustPressed = false;

		if (!calcValues.opPressedOnce) {
			calcValues.opPressedOnce = true;
			calcValues.opPressed = true;
			calcValues.opValue = $(this).text()
			calcValues.calcStatus++;
			calcValues.firstentry = true;
			
			if (calcValues.equals && calcValues.numberPressed && calcValues.calcSum != 0) {

				calcValues.calcStatus = 3;
				calcEval.ops(calcValues.firstNumberValue, calcValues.secondNumberValue, calcValues.opValue);

			} else if ( !calcValues.posNegPercentPressed ) {
					if (calcValues.inputValue == null) {
						calcValues.numberValue = 0;
					} else {
						calcValues.numberValue = parseFloat(calcValues.inputValue);
					}
					calcValues.inputValue = null;
					ux.handleOpPressed(calcValues, event);
			} 
		}

	}); // end listner for basic math ops

}); // end $(document).ready
