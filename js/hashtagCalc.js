import { ux } from './ux.js';
import { calcEval } from './calcEval.js';
import { mathSettings } from './mathSettings.js';
import { calc } from './calc.js';


let version = 'v2.6'
let allClear = '';
let initialValue = 0;
let numberValue = '';

const calcValues = {
	firstNumberValue: 0,
	secondNumberValue: 0,
	calcSum: 0,
	opValue: '',
	opValue2: '',
	inputValue: ''
}
const status = {
	numberOfValues: 0,
	equals: false,
	calcStatus: 0,
	numberPressed: false,
	opPressed: false,
	opPressedOnce: false,
	posNegPercentPressed: false,
	equalsJustPressed: false
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

				calcValues.inputValue = null;
				calcValues.firstNumberValue = initialValue;
				numberValue = calcValues.firstNumberValue;
				calcValues.secondNumberValue = 0;
				ux.displayValue(initialValue);

			} else { // if equals just pressed


				calcValues.calcSum = 0;
				ux.displayValue(calcValues.calcSum);
				calcValues.calcStatus = 0;
				calcValues.inputValue = initialValue;
				numberValue = '';
				calcValues.opValue = '';
				calcValues.opValue2 = '';
				calcValues.equals = false;
				calcValues.numberPressed = false;
				calcValues.opPressed = false;
				calcValues.posNegPercentPressed = false;
				calcValues.percent = false;
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
			numberValue = '';
			calcValues.opValue = '';
			calcValues.equals = false;
			calcValues.numberPressed = false;
			calcValues.opPressed = false;
			calcValues.percent = false;
			calcValues.firstNumberValue = 0;
			calcValues.secondNumberValue = 0;
		}
	}); // end all-clear button event handler

	$('#posNeg, #percent, #lposNeg, #lpercent').click(function(event){

			if (!calcValues.posNegPercentPressed) {

				calcValues.posNegPercentPressed = true;

				calcValues.numberPressed = false;
				calcValues.opPressed = true;
				calcValues.equalsJustPressed = false 
				numberValue = parseFloat(calcValues.inputValue);
				calcValues.inputValue = '';
				calcValues.opValue = $(this).text();
				calcValues.secondNumberValue = 0;

				// has a math operation has taken place or should, and what to do
				if ( calcValues.opValue === '%' && calcValues.equals == true ) {

					calcValues.percent = true;
					calcValues.firstNumberValue = calcValues.calcSum;
					calcValues.calcSum = calc.percent(calcValues.numberOfValues, calcValues.firstNumberValue);
					calcValues.numberOfValues = 0;
					numberValue = '';
					calcValues.equals = false;

				} else if ( calcValues.opValue === '%' ) {

					calcValues.firstNumberValue = parseFloat(numberValue, 10);
					calcValues.calcSum = calc.percent(calcValues.numberOfValues, calcValues.firstNumberValue);
					numberOfValues = 0;
					calcValues.percent = true;
					numberValue = '';

				} else if ( calcValues.opValue === '+/-' ) {

					calcValues.firstNumberValue = parseFloat(numberValue, 10);
					numberValue = '';
					calcValues.calcSum = calc.posNeg(calcValues.firstNumberValue);
					calcValues.posNegPercentPressed = true;

			}

			if(isNaN(calcValues.calcSum)) {
				let setToZero = 0
				ux.displayValue(setToZero);
				calcValues.firstNumberValue = setToZero;
				calcValues.secondNumberValue = setToZero;
				calcValues.calcStatus = 0;
			} else {
				calcValues.calcSum = mathSettings.setDecimals(calcValues.calcSum);
				ux.displayValue(calcValues.calcSum);
			}
			}
				
			calcValues.firstNumberValue = calcValues.calcSum;

			

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
			calcEval.ops([calcValues, calcStatus]);
			} else {
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
				calcEval.ops([calcValues, calcStatus]);

			} else if ( !calcValues.posNegPercentPressed ) {
					if (calcValues.inputValue == null) {
						numberValue = 0;
					} else {
						numberValue = parseFloat(calcValues.inputValue);
					}
					calcValues.inputValue = null;
					ux.handleOpPressed(calcValues, event);
			} 
		}

	}); // end listner for basic math ops

}); // end $(document).ready
