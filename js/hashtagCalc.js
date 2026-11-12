

let version = 'v2.6.0';
let allClear = '';

let initialValue = 0;
let calcSum = 0;
let numberOfValues = 0;
let firstNumberValue = 0;
let secondNumberValue = 0;

let inputValue = null;
let numberValue = '';
let calcStatus = 0;
let firstentry = true;
let equals = false;
let equalsJustPressed = false;
let percent = false;
let numberPressed = false;
let opPressedOnce = false;
let opPressed = false;
let posNeg = false;
let posNegPercentPressed = false;
let opValue2 = '';
let opValue = '';



const mathSettings = { 
	
	maxNumDecimals: 14, // the max number of significant decimals with current calc display
	numDecimals: 4,
	trailingZeros: false,  // by default, don't display trailing zeros

	setDecimals: function(value) {
		console.log('value:' + value);
		return parseFloat(value.toPrecision(mathSettings.numDecimals));
		// toFixed allows for more decimals
		// for basic math, need to reduce number of digits 
		// other modes, like scientific or accounting, will reconsider 
	}
}

const tape = {
	// add methods for showing history of calculations, a tape
	showTape: false,
}

const debug = {
// dev use only 
// to be replaced by logging state of app and errors
	loggingOn: false,

	log: function (){
		if(this.loggingOn){
			this.log = console.log.bind(window.console);
		} else {
			this.log = function(){};
		}
	}
}

// math happens here
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
		if (numberOfValues == 0 ) {
			this.sumValue = numValue1 / 100;
			return this.sumValue;
		} else if ( numberOfValues == 1 ) {
			this.sumValue = numValue1 * ( numValue2 / 100 )
			return this.sumValue;
		}
	},
	posNeg: function(numValue1){

		let negNum = false;
		// console.log('numValue1..' + numValue1);

		if (negNum)  {
			this.sumValue = Math.abs(numValue1);
		} else {
			this.sumValue = -Math.abs(numValue1)
			negNum = true
		}
		
		// console.log('posNeg..' + this.sumValue)
		return this.sumValue;
	},
	equals: function() {				
		return this.sumValue;
	}
}

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
		// console.log('firstNumberValue: ' + firstNumberValue);
		secondNumberValue = this.isValueANum(secondNumberValue);
		// console.log('secondNumberValue: ' + secondNumberValue);

		// do math, get and save calcSum
		if ( opValue === '/' && secondNumberValue != 0 ) {
				calcSum = calc.divide(firstNumberValue, secondNumberValue);
				this.afterMath(calcSum)
				calcStatus = 2;
				// console.log("calcStatus: " + calcStatus);	
		} else if ( opValue === '*' && secondNumberValue != 0 ) {
				calcSum = calc.multiply(firstNumberValue, secondNumberValue);
				this.afterMath(calcSum)
				calcStatus = 2;
				// console.log("calcStatus: " + calcStatus);	
		} else if ( opValue === '-' && secondNumberValue != 0  ) {
				calcSum = calc.subtract(firstNumberValue, secondNumberValue);
				this.afterMath(calcSum)
				calcStatus = 2;
				// console.log("calcStatus: " + calcStatus);	
		} else if ( opValue === '+' && secondNumberValue != 0 ) {
				calcSum = calc.addition(firstNumberValue, secondNumberValue);
				this.afterMath(calcSum)
				calcStatus = 2; 
				// console.log("calcStatus: " + calcStatus);	
		}

		return { calcSum, calcStatus };
	},

	ops: function () {
		// entered : 3 = 
	    // or : + 3 = 
		// or starting running total like : 6 + 4 = 10 + 3 = 

		if ( opValue === '' ) {  // this usually when very first number is entered
			
			firstNumberValue = parseFloat(numberValue, 10);
			// console.log('firstNumberValue: ' + firstNumberValue);
			calcSum = calc.addition(firstNumberValue, secondNumberValue);
			// in case someone, tries something like, 3 +
			ux.displayValue(calcSum);
			// console.log("calcSum:" + calcSum);
			//so display value entered, no math actually happens

		} else if ( opValue === "+" || opValue === "-" || opValue === "*" || opValue === "/" ) {  
			// entered something like, + 3 = or 3 + 4 =
			
			firstNumberValue = calcSum;
			secondNumberValue = parseFloat(inputValue, 10);
			calcStatus = 3;
			// console.log('secondNumberValue: ' + secondNumberValue);
			// console.log('opValue: ' + opValue);
			// console.log('calcSum: ' + calcSum)
			this.runningTotalDoMath(firstNumberValue, secondNumberValue, opValue);

		} else if ( calcStatus >= 2 ) {  // entered something like, 3 + 3 = 6 + 4 =
			
			firstNumberValue = calcSum;
			// console.log('firstNumberValue: ' + firstNumberValue);
			secondNumberValue = parseFloat(numberValue, 10);
			// console.log('secondNumberValue: ' + secondNumberValue);
			// console.log('opValue: ' + opValue);
			this.runningTotalDoMath(firstNumberValue, secondNumberValue, opValue);

		}

		return { calcSum, calcStatus, firstNumberValue, secondNumberValue, opValue };
	},

	afterMath : function (valueToFix ) {

		let fixedValue = mathSettings.setDecimals(valueToFix);
		ux.displayValue(fixedValue);
		// console.log("calcSum:" + fixedValue);

		return fixedValue;

	},

}

// UI specific tasks
const ux = {
	acShow: true,  // whether to show AC

	acToogle: function () {

		// console.log('run acToogle:' + this.acShow);

		if ( this.acShow ) {
			// then toogle C button to AC
			document.getElementById('ac').textContent = "AC";
			// console.log('C change to AC:' + this.acShow);

		} else {
			// else toogle AC button to C
				document.getElementById('ac').textContent = "C";
			// console.log('AC change to C:' + this.acShow);

		}

	},

	displayValue: function (value) {

		const input = document.getElementById('input');
		input.classList.remove('inputBlink');
		input.textContent = value;
		// console.log('displaying value ' + value);

	},

	displayVersion: function (version) {
		document.getElementById('version').textContent = '#Calc ' + version;
		document.querySelector('title').textContent = '#Calc ' + version;
	},

	handleOpPressed: function (event) {
		
		// setup for various math, based on previous operator entered
		
		ux.acShow = false;
		ux.acToogle();
		// console.log('calcStatus: ' + calcStatus);

		if ( equals && calcStatus == 3) {

			// console.log('secondNumberValue:' + secondNumberValue);
			// console.log('firstNumberValue:' + firstNumberValue);

			// console.log('opValue: ' + opValue);
			// console.log('opPressesd:' + opPressed);
			// console.log('calcStatus:' + calcStatus);
			
			firstNumberValue = calcSum;
			// console.log('firstNumberValue:' + firstNumberValue);
			// console.log('calcStatus: ' + calcStatus);
			equals = false;
			ux.acShow = true;
			ux.acToogle();

        } else if ( opValue === '+/-' ) {

			firstNumberValue = calcSum;
			// console.log('firstNumberValue:' + firstNumberValue);
			numberValue = '';
			// console.log('opValue: ' + opValue);
			// console.log('calcStatus: ' + calcStatus);

	    } else if ( opValue === "+" || opValue === "-" || opValue === "*" || opValue === "/" ) {

			
			if (calcStatus == 1) {

				// console.log('numberValue:' + numberValue);
				firstNumberValue = parseFloat(numberValue, 10);
				// console.log('firstNumberValue:' + firstNumberValue);
				numberValue = '';

				// console.log('secondNumberValue:' + secondNumberValue);
				// 	console.log('firstNumberValue:' + firstNumberValue);
	
				// console.log('opValue: ' + opValue);
				// console.log('opPressesd:' + opPressed);
				// console.log('calcStatus:' + calcStatus);
				
			} else if (calcStatus > 1) {
				
				// console.log('input stream...' + inputValue);
				// console.log('numberValue:' + numberValue)
				secondNumberValue = parseFloat(numberValue, 10);
				// console.log('secondNumberValue:' + secondNumberValue);
				numberValue = '';

				// console.log('secondNumberValue:' + secondNumberValue);
				// console.log('firstNumberValue:' + firstNumberValue);


				// console.log('opPressesd:' + opPressed);
				// console.log('opValue: ' + opValue);
				// console.log('opValue2: ' + opValue2);
				// console.log('calcStatus:' + calcStatus);
				

			}

	    } else if ( opValue === '%') {

			opValue2 = opValue;
			opValue = inputValue;
			numberValue = '';
			firstNumberValue = calcSum;

			// console.log('opValue: ' + opValue);
			// console.log('opValue2: ' + opValue2);
			// console.log('firstNumberValue = calcSum: ' + calcSum);
			// console.log('calcStatus: ' + calcStatus);

    	}
        
		// if there are 2 values entered, which math operator
		if ( numberPressed && calcStatus > 1 && opValue === '/' ) {

			calcSum = calc.divide(firstNumberValue, secondNumberValue);

			// console.log('secondNumberValue:' + secondNumberValue);
			// console.log('firstNumberValue:' + firstNumberValue);
			// console.log('opPressesd:' + opPressed);
			// console.log('calcStatus:' + calcStatus);
			// console.log('calcSum:' + calcSum);

			ux.displayValue(calcSum);
			// console.log('calcSum:' + calcSum);

			ux.acShow = true;
			ux.acToogle();

			numberValue = 0;
			firstNumberValue = calcSum;
			secondNumberValue = 0;
			calcStatus = 3;
			opPressed = false;
			// console.log('opPressesd:' + opPressed);
			numberPressed = false;
			// console.log('numberPressesd:' + numberPressed);

		} else if ( numberPressed && calcStatus > 1 && opValue === '*' ) {

			calcSum = calc.multiply(firstNumberValue, secondNumberValue);
			// console.log('secondNumberValue:' + secondNumberValue);
			// console.log('firstNumberValue:' + firstNumberValue);
			// console.log('opPressesd:' + opPressed);
			// console.log('calcStatus:' + calcStatus);
			// console.log('calcSum:' + calcSum);

			// console.log('calcSum:' + calcSum);
			ux.displayValue(calcSum);
			// console.log('calcSum:' + calcSum);


			ux.acShow = true;
			ux.acToogle();

			numberValue = 0;
			firstNumberValue = calcSum;
			secondNumberValue = 0;
			calcStatus = 3;
			opPressed = false;
			// console.log('opPressesd:' + opPressed);
			numberPressed = false;
			// console.log('numberPressesd:' + numberPressed);

		} else if ( numberPressed && calcStatus > 1 && opValue === '-' ) {

			calcSum = calc.subtract(firstNumberValue, secondNumberValue);

			// console.log('secondNumberValue:' + secondNumberValue);
			// console.log('firstNumberValue:' + firstNumberValue);
			// console.log('opPressesd:' + opPressed);
			// console.log('calcStatus:' + calcStatus);
			// console.log('calcSum:' + calcSum);

			ux.displayValue(calcSum);
			// console.log('calcSum:' + calcSum);


			ux.acShow = true;
			ux.acToogle();

			numberValue = 0;
			firstNumberValue = calcSum;
			secondNumberValue = 0;
			calcStatus = 3;
			opPressed = false;
			// console.log('opPressesd:' + opPressed);
			numberPressed = false;
			// console.log('numberPressesd:' + numberPressed);

		} else if ( numberPressed && calcStatus > 1 && opValue === '+' ) {

			calcSum = calc.addition(firstNumberValue, secondNumberValue);

			// console.log('secondNumberValue:' + secondNumberValue);
			// console.log('firstNumberValue:' + firstNumberValue);
			// console.log('opPressesd:' + opPressed);
			// console.log('calcStatus:' + calcStatus);
			// console.log('calcSum:' + calcSum);

			ux.displayValue(calcSum);
			// console.log('calcSum:' + calcSum);

			numberValue = 0;
			firstNumberValue = calcSum;
			secondNumberValue = 0;
			calcStatus = 3;
			opPressed = false;
			// console.log('opPressesd:' + opPressed);
			numberPressed = false;
			// console.log('numberPressesd:' + numberPressed);

		}
	},

}

document.addEventListener('DOMContentLoaded', function() {

	ux.displayVersion(version);

	// event-listeners

	document.addEventListener('click', function(event) {
		const button = event.target.closest('#ac, #lac');
		if (!button) return;

	  
		allClear = button.textContent;

		if ( allClear === 'C' ) {

			if ( opPressed ) {
				opValue = '';
				opPressed = false;
				calcStatus > 1 ? calcStatus -= 1 : calcStatus = 0;
				firstNumberValue == NaN ? inputValue = '' : inputValue = firstNumberValue;
	

			} else if ( numberPressed && opPressed ) {

				inputValue = '';
				numberValue = firstNumberValue;
				ux.displayValue(firstNumberValue );

			} else if ( numberPressed && !opPressed ) {

				inputValue = '';
				firstNumberValue = 0;
				numberValue = '';
				secondNumberValue = 0;
				ux.displayValue(initialValue );
			} else { // if equals just pressed


				calcSum = 0;
				ux.displayValue(calcSum);
				// console.log('calcSum:' + calcSum);
				calcStatus = 0;
				// console.log('calcStatus:' + calcStatus);
				inputValue = initialValue;
				numberValue = '';
				// console.log('numberValue:' + numberValue);
				opValue = '';
				// console.log('opValue:' + opValue);
				opValue2 = '';
				// console.log('opValue:' + opValue2);
				equals = false;
				// console.log('equals:' + equals);
				numberPressed = false;
				// console.log('numberPressed:' + numberPressed);
				opPressed = false;
				// console.log('opPressed:' + opPressed);
				posNegPercentPressed = false;
				// console.log('posNegPercentPressed: ' + posNegPercentPressed);
				percent = false;
				// console.log('percent:' + percent);
				firstNumberValue = 0;
				// console.log('firstNumberValue:' + firstNumberValue);
				secondNumberValue = 0;
				// console.log('secondNumberValue:' + secondNumberValue);
				// TODO: storage of memory values cleared
				// console.log("memory storage cleared ")
				
			}

			ux.acShow = true;
			ux.acToogle();

		} else if ( allClear === 'AC') {

			// console.log('AC clicked, reseting all values');

			calcSum = 0;
			ux.displayValue(calcSum);
			// 	console.log('calcSum:' + calcSum);
			calcStatus = 0;
			// console.log('calcStatus:' + calcStatus);
			inputValue = '';
			numberValue = '';
			// console.log('numberValue:' + numberValue);
			opValue = '';
			// console.log('opValue:' + opValue);
			equals = false;
			// console.log('equals:' + equals);
			numberPressed = false;
			// console.log('numberPressed:' + numberPressed);
			opPressed = false;
			// console.log('opPressed:' + opPressed);
			percent = false;
			// console.log('percent:' + percent);
			firstNumberValue = 0;
			// console.log('firstNumberValue:' + firstNumberValue);
			secondNumberValue = 0;
			// console.log('secondNumberValue:' + secondNumberValue);
			// TODO: storage of memory values cleared
			// console.log("memory storage cleared ")

		}
	}); // end all-clear button event handler

	document.addEventListener('click', function(event) {
		const button = event.target.closest('#posNeg, #percent, #lposNeg, #lpercent');
		if (!button) return;

			if (!posNegPercentPressed) {

				posNegPercentPressed = true;

				// // console.log('inputValue: ' + inputValue);
				numberValue = parseFloat(inputValue);
				inputValue = '';
				numberPressed = false;
				opPressed = true;
				equalsJustPressed = false 
				opValue = button.textContent;
				// console.log('opValue:', opValue);
				secondNumberValue = 0;

				// has a math operation has taken place or should, and what to do
				if ( opValue === '%' && equals == true ) {

					firstNumberValue = calcSum;
					// console.log('calcSum = firstNumberValue:' + firstNumberValue);
					calcSum = calc.percent(numberOfValues, firstNumberValue);
					numberOfValues = 0;
					percent = true;
					numberValue = '';
					equals = false;

				} else if ( opValue === '%' ) {

					firstNumberValue = parseFloat(numberValue, 10);
					// console.log('firstNumberValue:' + firstNumberValue);
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
				
			console.log('calcSum:' + calcSum);
			firstNumberValue = calcSum;
			// console.log('firstNumberValue: ' + firstNumberValue);

			}

	}); // end listener for +/-  %

	document.addEventListener('click', function(event) {
		if (!event.target.closest('#equals, #lequals')) return;

		if (!equalsJustPressed) {
			
			// console.log('equals pressed');
			equals = true;
			equalsJustPressed = true;
			opPressedOnce = false;
			opValue2 = '=';
			calcStatus++

			numberValue = parseFloat(inputValue);
			// console.log('input stream.. ' + inputValue);
			// console.log('numberValue ' + numberValue);

			// eval all numeric entry and operators and do math
			if (calcStatus == 3) {
			calcEval.ops(firstNumberValue, secondNumberValue, opValue)	
			} else {
				ux.handleOpPressed(event);	
			}
		}
		


	}); // end equals 

	document.addEventListener('click', function(event) {
		const button = event.target.closest('#nine, #eight, #seven, #six, #five, #four, #three, #two, #one, #zero, #decimal, #lnine, #leight, #lseven, #lsix, #lfive, #lfour, #lthree, #ltwo, #lone, #lzero, #ldecimal');
		if (!button) return;

	  
		// read value 
		numberPressed = true;
		equalsJustPressed = false;
		opPressedOnce = false;
		ux.acShow = false;
		ux.acToogle();     
        

		posNegPercentPressed = false;
		// console.log('posNegPercentPressed: ' + posNegPercentPressed);

		if (firstentry) {
			inputValue = button.textContent;
			ux.displayValue(inputValue);
			firstentry = false;
		} else {
			inputValue += button.textContent;
			ux.displayValue(inputValue);
		}


		// console.log('input stream..' + inputValue);
		// console.log('button.textContent..' + button.textContent);

	}); // end listner for nums pressed
	
	document.addEventListener('click', function(event) {
		const button = event.target.closest('#divide, #multiply, #subtract, #add, #ldivide, #lmultiply, #lsubtract, #ladd');
		if (!button) return;
		
		// equalsJustPressed = false;
		// console.log("equals just pressed: " + equalsJustPressed);

		if (!opPressedOnce) {
			opPressedOnce = true;
			// console.log('opPressesOnce: ' + opPressedOnce);
			opPressed = true;
			opValue = button.textContent;
			// console.log('opValue' + opValue);
			// console.log('posNegPercentPressed: ' + posNegPercentPressed);
			calcStatus++;
			//console.log('calcStatus' + calcStatus);
			firstentry = true;
			
			if (equals && numberPressed && calcSum != 0) {

				// console.log('opValue' + opValue);
				calcStatus = 3;
				calcEval.ops(firstNumberValue, secondNumberValue, opValue);

			} else if ( !posNegPercentPressed ) {
					// console.log('input stream...' + inputValue);
					if (inputValue == null) {
						numberValue = 0;
					} else {
						numberValue = parseFloat(inputValue);
					}
					//console.log('numberValue...' + numberValue);
					inputValue = null;
					ux.handleOpPressed(event);
			} 
		}

	}); // end listner for basic math ops

});
