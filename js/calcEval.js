// evaluate and return the evaluated result of the current input, operators, and numbers

// redesign data flow, so display changes happen at top level only 
// need to handle changes to display, using ux.display, in workingDisplay
// move mathSettings functions here ?

import { ux } from './ux.js';
import { calc } from './calc.js';

const calcEval = {

	isValueANum: function (value) {
		let setToZero =0
		if (isNaN(value)){
			value = setToZero;
		}
		return value
	},

	runningTotalDoMath: function (firstNumberValue, secondNumberValue, opValue, calcSum) {

		// make sure value are numbers 
		firstNumberValue = this.isValueANum(firstNumberValue);
		secondNumberValue = this.isValueANum(secondNumberValue);

		// do math, get and save calcSum
		if ( opValue === '/' && secondNumberValue != 0 ) {
				calcSum = calc.divide(firstNumberValue, secondNumberValue);
				this.afterMath(calcSum)
				calcStatus = 2;
		} else if ( opValue === '*' && secondNumberValue != 0 ) {
				calcSum = calc.multiply(firstNumberValue, secondNumberValue);
				this.afterMath(calcSum)
				calcStatus = 2;
		} else if ( opValue === '-' && secondNumberValue != 0  ) {
				calcSum = calc.subtract(firstNumberValue, secondNumberValue);
				this.afterMath(calcSum)
				calcStatus = 2;
		} else if ( opValue === '+' && secondNumberValue != 0 ) {
				calcSum = calc.addition(firstNumberValue, secondNumberValue);
				this.afterMath(calcSum)
				calcStatus = 2; 
		}

		return { firstNumberValue, secondNumberValue, opValue, calcSum, calcStatus };
	},

	ops: function (firstNumberValue, secondNumberValue, opValue, calcStatus, calcSum) {
		// entered : 3 = 
	    // or : + 3 = 
		// or starting running total like : 6 + 4 = 10 + 3 = 

		if ( opValue === '' ) {  // this usually when very first number is entered
			
			firstNumberValue = parseFloat(numberValue, 10);
			calcSum = calc.addition(firstNumberValue, secondNumberValue);
			// in case someone, tries something like, 3 +
			//ux.displayValue(calcSum);
			//so only a number pressed entered, no math actually happens

		} else if ( opValue === "+" || opValue === "-" || opValue === "*" || opValue === "/" ) {  
			// entered something like, + 3 = or 3 + 4 =
			
			firstNumberValue = calcSum;
			secondNumberValue = parseFloat(inputValue, 10);
			calcStatus = 3;

		} else if ( calcStatus >= 2 ) {  // entered something like, 3 + 3 = 6 + 4 =
			
			firstNumberValue = calcSum;
			secondNumberValue = parseFloat(numberValue, 10);

		}

		return { calcSum, calcStatus, firstNumberValue, secondNumberValue, opValue };
	},

	afterMath : function (valueToFix ) {

		ux.displayValue(fixedValue);

		return valueToFix;

	},

}
export { calcEval };	