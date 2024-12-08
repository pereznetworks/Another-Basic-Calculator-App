

let version = 'v2.0a'
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
let eventObject;
let posNegPercentPressed;
// evaluate current input, operators, numbers, complete math operation
const calcEval = {

	isValueANum: function (value) {
		let setToZero =0
		if (isNaN(value)){
			value = setToZero;
		}
		return value
	},

	runningTotalDoMath: function () {

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
			calcSum = 3;
			debug.log('secondNumberValue: ' + secondNumberValue);
			debug.log('opValue: ' + opValue);
			debug.log('calcSum: ' + calcSum)
			this.runningTotalDoMath();

		} else if ( calcStatus >= 2 ) {  // entered something like, 3 + 3 = 6 + 4 =
			
			firstNumberValue = calcSum;
			debug.log('firstNumberValue: ' + firstNumberValue);
			secondNumberValue = parseFloat(numberValue, 10);
			debug.log('secondNumberValue: ' + secondNumberValue);
			debug.log('opValue: ' + opValue);
			this.runningTotalDoMath();

		}

	},

	afterMath : function (valueToFix ) {

		let fixedValue = mathSettings.setDecimals(valueToFix);
		ux.displayValue(fixedValue);
		debug.log("calcSum:" + fixedValue);

		// reset for new math operations
		numberValue = '';
		// debug.log('numberValue:' + numberValue);
		// opValue = '';
		// debug.log('opValue:' + opValue);
		// opValue2 = '';
		// debug.log('opValue2:' + opValue2);

	},

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
		debug.log('numValue1..' + numValue1);

		if (negNum)  {
			this.sumValue = Math.abs(numValue1);
		} else {
			this.sumValue = -Math.abs(numValue1)
			negNum = true
		}
		
		debug.log('posNeg..' + this.sumValue)
		return this.sumValue;
	},
	equals: function() {				
		return this.sumValue;
	}
}

const mathSettings = {
	
	maxNumDecimals: 14, // the max number of significant decimals to display
	numDecimals: 4,
	trailingZeros: false,  // by default, don't display trailing zeros

	setDecimals: function(value) {
		debug.log('value:' + value);
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
// to be replaced by logging state of app and errors
	loggingOn: false,
	
	log: function (value){
		if(this.loggingOn){
			this.log = console.log.bind(window.console);
		}
	}
}

// UI specific tasks
const ux = {
	acShow: true,  // whether to show AC

	acToogle: function () {

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

		$('#input').removeClass('inputBlink').text(value);
		debug.log('displaying value ' + value);

	},

	displayVersion: function (version) {
		$('#version').html('#Calc ' + version);
		$('title').html('#Calc ' + version)
	},

	handleOpPressed: function (event) {
		
		// setup for various math, based on previous operator entered
		
		ux.acShow = false;
		ux.acToogle();
		debug.log('calcStatus: ' + calcStatus);

		if ( equals && calcStatus == 3) {

			debug.log('secondNumberValue:' + secondNumberValue);
			debug.log('firstNumberValue:' + firstNumberValue);

			debug.log('opValue: ' + opValue);
			debug.log('opPressesd:' + opPressed);
			debug.log('calcStatus:' + calcStatus);
			
			firstNumberValue = calcSum;
			debug.log('firstNumberValue:' + firstNumberValue);
			debug.log('calcStatus: ' + calcStatus);
			equals = false;
			ux.acShow = true;
			ux.acToogle();

        } else if ( opValue === '+/-' ) {

			firstNumberValue = calcSum;
			debug.log('firstNumberValue:' + firstNumberValue);
			numberValue = '';
			debug.log('opValue: ' + opValue);
			debug.log('calcStatus: ' + calcStatus);

	    } else if ( opValue === "+" || opValue === "-" || opValue === "*" || opValue === "/" ) {

			
			if (calcStatus == 1) {

				debug.log('numberValue:' + numberValue);
				firstNumberValue = parseFloat(numberValue, 10);
				debug.log('firstNumberValue:' + firstNumberValue);
				numberValue = '';

				debug.log('secondNumberValue:' + secondNumberValue);
				debug.log('firstNumberValue:' + firstNumberValue);
	
				debug.log('opValue: ' + opValue);
				debug.log('opPressesd:' + opPressed);
				debug.log('calcStatus:' + calcStatus);
				
			} else if (calcStatus > 1) {
				
				debug.log('input stream...' + inputValue);
				debug.log('numberValue:' + numberValue)
				secondNumberValue = parseFloat(numberValue, 10);
				debug.log('secondNumberValue:' + secondNumberValue);
				numberValue = '';

				debug.log('secondNumberValue:' + secondNumberValue);
				debug.log('firstNumberValue:' + firstNumberValue);
	

				debug.log('opPressesd:' + opPressed);
				debug.log('opValue: ' + opValue);
				debug.log('opValue2: ' + opValue2);
				debug.log('calcStatus:' + calcStatus);
				

			}

	    } else if ( opValue === '%') {

			opValue2 = opValue;
			opValue = inputValue;
			numberValue = '';
			firstNumberValue = calcSum;

			debug.log('opValue: ' + opValue);
			debug.log('opValue2: ' + opValue2);
			debug.log('firstNumberValue = calcSum: ' + calcSum);
			debug.log('calcStatus: ' + calcStatus);

    	}
        
		// if there are 2 values entered, which math operator
		if ( numberPressed && calcStatus > 1 && opValue === '/' ) {

			calcSum = calc.divide(firstNumberValue, secondNumberValue);

			debug.log('secondNumberValue:' + secondNumberValue);
			debug.log('firstNumberValue:' + firstNumberValue);
			debug.log('opPressesd:' + opPressed);
			debug.log('calcStatus:' + calcStatus);
			debug.log('calcSum:' + calcSum);

			ux.displayValue(calcSum);
			debug.log('calcSum:' + calcSum);

			ux.acShow = true;
			ux.acToogle();

			numberValue = 0;
			firstNumberValue = calcSum;
			secondNumberValue = 0;
			calcStatus = 3;
			opPressed = false;
			debug.log('opPressesd:' + opPressed);
			numberPressed = false;
			debug.log('numberPressesd:' + numberPressed);

		} else if ( numberPressed && calcStatus > 1 && opValue === '*' ) {

			calcSum = calc.multiply(firstNumberValue, secondNumberValue);
			debug.log('secondNumberValue:' + secondNumberValue);
			debug.log('firstNumberValue:' + firstNumberValue);
			debug.log('opPressesd:' + opPressed);
			debug.log('calcStatus:' + calcStatus);
			debug.log('calcSum:' + calcSum);

			debug.log('calcSum:' + calcSum);
			ux.displayValue(calcSum);
			debug.log('calcSum:' + calcSum);


			ux.acShow = true;
			ux.acToogle();

			numberValue = 0;
			firstNumberValue = calcSum;
			secondNumberValue = 0;
			calcStatus = 3;
			opPressed = false;
			debug.log('opPressesd:' + opPressed);
			numberPressed = false;
			debug.log('numberPressesd:' + numberPressed);

		} else if ( numberPressed && calcStatus > 1 && opValue === '-' ) {

			calcSum = calc.subtract(firstNumberValue, secondNumberValue);

			debug.log('secondNumberValue:' + secondNumberValue);
			debug.log('firstNumberValue:' + firstNumberValue);
			debug.log('opPressesd:' + opPressed);
			debug.log('calcStatus:' + calcStatus);
			debug.log('calcSum:' + calcSum);

			ux.displayValue(calcSum);
			debug.log('calcSum:' + calcSum);


			ux.acShow = true;
			ux.acToogle();

			numberValue = 0;
			firstNumberValue = calcSum;
			secondNumberValue = 0;
			calcStatus = 3;
			opPressed = false;
			debug.log('opPressesd:' + opPressed);
			numberPressed = false;
			debug.log('numberPressesd:' + numberPressed);

		} else if ( numberPressed && calcStatus > 1 && opValue === '+' ) {

			calcSum = calc.addition(firstNumberValue, secondNumberValue);

			debug.log('secondNumberValue:' + secondNumberValue);
			debug.log('firstNumberValue:' + firstNumberValue);
			debug.log('opPressesd:' + opPressed);
			debug.log('calcStatus:' + calcStatus);
			debug.log('calcSum:' + calcSum);

			ux.displayValue(calcSum);
			debug.log('calcSum:' + calcSum);

			numberValue = 0;
			firstNumberValue = calcSum;
			secondNumberValue = 0;
			calcStatus = 3;
			opPressed = false;
			debug.log('opPressesd:' + opPressed);
			numberPressed = false;
			debug.log('numberPressesd:' + numberPressed);

		}
	},

}


$(document).ready( function () {

ux.displayVersion(version);

// turn on debugger or not
if (debug.loggingOn) {console.log.bind(window.console)}

// event-listeners

	$('#ac').click(function(event){

	  
		
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

	$('#posNeg, #percent').click(function(event){

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

	$('#equals').click(function(event){

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

	$('#nine, #eight, #seven, #six, #five, #four, #three, #two, #one, #zero, #decimal').click(function(event) {

	  
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
		} else if ( equals ) {
			inputValue = $(this).text();
			ux.displayValue(inputValue);
		} else {
			inputValue += $(this).text();
			ux.displayValue(inputValue);
		}


		debug.log('input stream..' + inputValue);
		debug.log('this.text..' + $(this).text());			  

	}); // end listner for nums pressed
	
	$('#divide, #multiply, #subtract, #add').click(function(event) {
		
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
