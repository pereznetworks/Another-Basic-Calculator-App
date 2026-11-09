// evaluate current input, operators, numbers, complete math operation
const calcEval = {

	isValueANum: function (value) {
		let setToZero =0
		if (isNaN(value)){
			value = setToZero;
		}
		return value
	},

	runningTotalDoMath: function (firstNumberValue, secondNumberValue, opValue) {

		// make sure value are numbers 
		firstNumberValue = this.isValueANum(firstNumberValue);
		debug.log('firstNumberValue: ' + firstNumberValue);
		secondNumberValue = this.isValueANum(secondNumberValue);
		debug.log('secondNumberValue: ' + secondNumberValue);

		// do math, get and save calcSum
		if ( opValue === '/' && secondNumberValue != 0 ) {
				calcSum = calc.divide(firstNumberValue, secondNumberValue);
				this.afterMath(calcSum)
				calcStatus = 2;
				debug.log("calcStatus: " + calcStatus);	
		} else if ( opValue === '*' && secondNumberValue != 0 ) {
				calcSum = calc.multiply(firstNumberValue, secondNumberValue);
				this.afterMath(calcSum)
				calcStatus = 2;
				debug.log("calcStatus: " + calcStatus);	
		} else if ( opValue === '-' && secondNumberValue != 0  ) {
				calcSum = calc.subtract(firstNumberValue, secondNumberValue);
				this.afterMath(calcSum)
				calcStatus = 2;
				debug.log("calcStatus: " + calcStatus);	
		} else if ( opValue === '+' && secondNumberValue != 0 ) {
				calcSum = calc.addition(firstNumberValue, secondNumberValue);
				this.afterMath(calcSum)
				calcStatus = 2; 
				debug.log("calcStatus: " + calcStatus);	
		}

		return { calcSum, calcStatus };
	},

	ops: function () {
		// entered : 3 = 
	    // or : + 3 = 
		// or starting running total like : 6 + 4 = 10 + 3 = 

		if ( opValue === '' ) {  // this usually when very first number is entered
			
			firstNumberValue = parseFloat(numberValue, 10);
			debug.log('firstNumberValue: ' + firstNumberValue);
			calcSum = calc.addition(firstNumberValue, secondNumberValue);
			// in case someone, tries something like, 3 +
			ux.displayValue(calcSum);
			debug.log("calcSum:" + calcSum);
			//so display value entered, no math actually happens

		} else if ( opValue === "+" || opValue === "-" || opValue === "*" || opValue === "/" ) {  
			// entered something like, + 3 = or 3 + 4 =
			
			firstNumberValue = calcSum;
			secondNumberValue = parseFloat(inputValue, 10);
			calcStatus = 3;
			debug.log('secondNumberValue: ' + secondNumberValue);
			debug.log('opValue: ' + opValue);
			debug.log('calcSum: ' + calcSum)
			this.runningTotalDoMath(firstNumberValue, secondNumberValue, opValue);

		} else if ( calcStatus >= 2 ) {  // entered something like, 3 + 3 = 6 + 4 =
			
			firstNumberValue = calcSum;
			debug.log('firstNumberValue: ' + firstNumberValue);
			secondNumberValue = parseFloat(numberValue, 10);
			debug.log('secondNumberValue: ' + secondNumberValue);
			debug.log('opValue: ' + opValue);
			this.runningTotalDoMath(firstNumberValue, secondNumberValue, opValue);

		}

		return { calcSum, calcStatus, firstNumberValue, secondNumberValue, opValue };
	},

	afterMath : function (valueToFix ) {

		let fixedValue = mathSettings.setDecimals(valueToFix);
		ux.displayValue(fixedValue);
		debug.log("calcSum:" + fixedValue);

		return fixedValue;

	},

}
export { calcEval };