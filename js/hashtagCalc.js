

let version = 'v2.0a'
let allClear = '';
let equals = false;
let percent = false;
let initialValue = 0;
let inputValue = '';
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

// evaluate current input, operators, numbers, complete math operation
const calcEval = {

	isValueANum: function (value) {
		let setToZero =0
		if (isNaN(value)){
			value = setToZero;
		}
		return value
	},

	ops: function () {
		if ( opValue === '' ) {  // this usually when very first number is entered
			firstNumberValue = parseFloat(numberValue, 10);
			debug.log('firstNumberValue: ' + firstNumberValue);
			calcSum = calc.addition(firstNumberValue, secondNumberValue);
			// in case someone, tries something like, 3 +
			ux.displayValue(calcSum);
			debug.log("calcSum:" + calcSum);
		} else if ( opValue === "+" || opValue === "-" || opValue === "*" || opValue === "/" ) {  // entered something like, + 3 = or 3 + 4 =
			secondNumberValue = parseFloat(numberValue, 10);
			debug.log('secondNumberValue: ' + secondNumberValue);
			debug.log('opValue: ' + opValue);
		} else if ( calcStatus >= 2 ) {  // entered something like, 3 + 3 = 6 + 4 =
			firstNumberValue = calcSum;
			debug.log('firstNumberValue: ' + firstNumberValue);
			secondNumberValue = parseFloat(numberValue, 10);
			debug.log('secondNumberValue: ' + secondNumberValue);
			debug.log('opValue: ' + opValue);
		}

	  // make sure value are numvers 
	  firstNumberValue = this.isValueANum(firstNumberValue);
	  debug.log('firstNumberValue: ' + firstNumberValue);
	  secondNumberValue = this.isValueANum(secondNumberValue);
	  debug.log('secondNumberValue: ' + secondNumberValue);

	  // do math, get and save calcSum
		if ( opValue === '/' ) {
				calcSum = calc.divide(firstNumberValue, secondNumberValue);
				this.afterMath(calcSum)
		} else if ( opValue === '*' ) {
				calcSum = calc.multiply(firstNumberValue, secondNumberValue);
				this.afterMath(calcSum)
		} else if ( opValue === '-' ) {
				calcSum = calc.subtract(firstNumberValue, secondNumberValue);
				this.afterMath(calcSum)
		} else if ( opValue === '+' ) {
				calcSum = calc.addition(firstNumberValue, secondNumberValue);
				this.afterMath(calcSum)
		}


	},

	afterMath : function (valueToFix ) {

		let fixedValue = mathSettings.setDecimals(valueToFix);
		ux.displayValue(fixedValue);
		debug.log("calcSum:" + fixedValue);

		// reset for new math operations
		numberValue = '';
		debug.log('numberValue:' + numberValue);
		opValue = '';
		debug.log('opValue:' + opValue);
		opValue2 = '';
		debug.log('opValue2:' + opValue2);
		calcStatus = 0;
		debug.log("reset calcStatus: " + calcStatus);	
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
		this.sumValue = numValue1 * -1;
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
			debug.log('calcStatus:' + opPressed);
			
			firstNumberValue = calcSum;
			debug.log('firstNumberValue:' + firstNumberValue);
			debug.log('calcStatus: ' + calcStatus);
			equals = false;

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
				debug.log('calcStatus:' + opPressed);
				
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
				debug.log('calcStatus:' + opPressed);
				

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
			firstNumberValue = calcSum;
			secondNumberValue = 0;
			calcStatus = 3;
			opPressed = false;

		} else if ( numberPressed && calcStatus > 1 && opValue === '*' ) {

			calcSum = calc.multiply(firstNumberValue, secondNumberValue);
			debug.log('secondNumberValue:' + secondNumberValue);
			debug.log('firstNumberValue:' + firstNumberValue);
			debug.log('opPressesd:' + opPressed);
			debug.log('calcStatus:' + opPressed);
			debug.log('calcSum:' + calcSum);

			debug.log('calcSum:' + calcSum);
			ux.displayValue(calcSum);
			debug.log('calcSum:' + calcSum);
			firstNumberValue = calcSum;
			secondNumberValue = 0;
			calcStatus = 3;
			opPressed = false;

		} else if ( numberPressed && calcStatus > 1 && opValue === '-' ) {

			calcSum = calc.subtract(firstNumberValue, secondNumberValue);

			debug.log('secondNumberValue:' + secondNumberValue);
			debug.log('firstNumberValue:' + firstNumberValue);
			debug.log('opPressesd:' + opPressed);
			debug.log('calcStatus:' + opPressed);
			debug.log('calcSum:' + calcSum);

			ux.displayValue(calcSum);
			debug.log('calcSum:' + calcSum);
			firstNumberValue = calcSum;
			secondNumberValue = 0;
			calcStatus = 3;
			opPressed = false;

		} else if ( numberPressed && calcStatus > 1 && opValue === '+' ) {

			calcSum = calc.addition(firstNumberValue, secondNumberValue);

			debug.log('secondNumberValue:' + secondNumberValue);
			debug.log('firstNumberValue:' + firstNumberValue);
			debug.log('opPressesd:' + opPressed);
			debug.log('calcStatus:' + opPressed);
			debug.log('calcSum:' + calcSum);

			ux.displayValue(calcSum);
			debug.log('calcSum:' + calcSum);
			firstNumberValue = calcSum;
			secondNumberValue = 0;
			calcStatus = 3;
			opPressed = false;

		}
	}

}

$(document).ready( function () {

ux.displayVersion(version);

// turn on debugger or not
if (debug.loggingOn) {console.log.bind(window.console)}

// event-listeners

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
				numberValue = firstNumberValue;
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

			numberValue = parseFloat(inputValue);
			inputValue = '';
			numberPressed = false;
			opPressed = true;
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

	}); // end listener for +/-  %

	$('#equals').click(function(event){

		debug.log('equals pressed');
		equals = true;
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
		


	}); // end equals 

	$('#nine, #eight, #seven, #six, #five, #four, #three, #two, #one, #zero, #decimal').click(function(event) {

            // read value 
			numberPressed = true;
			ux.acShow = false;
			ux.acToogle();     

			inputValue += $(this).text();
			ux.displayValue(inputValue);

			debug.log('input stream..' + inputValue);
			debug.log('this.text..' + $(this).text());			  

	}); // end listner for nums pressed
	
	$('#divide').click(function(event) {

		debug.log('input stream...' + inputValue);

		numberValue = parseFloat(inputValue);

        if (equals) {
			calcStatus = 3;
		} else {
			calcStatus++;
		}
        opPressed = true;
		numberPressed = false;
		opValue = '/'
		inputValue = '';
		debug.log('input stream...' + inputValue);

		ux.handleOpPressed(event);

	}); // end listner for divide 

	$('#multiply').click(function(event) {

		
		debug.log('input stream...' + inputValue);
		numberValue = parseFloat(inputValue);
	
		if (equals) {
			calcStatus = 3;
		} else {
			calcStatus++;
		}
        opPressed = true;
		opValue = '*'
		inputValue = '';
		debug.log('input stream...' + inputValue);

		ux.handleOpPressed(event);

	}); // end listner for mulitply

	$('#subtract').click(function(event) {

		
		debug.log('input stream...' + inputValue);
		numberValue = parseFloat(inputValue);
		
		if (equals) {
			calcStatus = 3;
		} else {
			calcStatus++;
		}
        opPressed = true;
		opValue = '-'
		inputValue = '';
		debug.log('input stream...' + inputValue);

		ux.handleOpPressed(event);

	}); // end listner for subtract

	$('#add').click(function(event) {

		
		debug.log('input stream...' + inputValue);
		numberValue = parseFloat(inputValue);
		
		if (equals) {
			calcStatus = 3;
		} else {
			calcStatus++;
		}
        opPressed = true;
		opValue = '+'
		inputValue = '';
		debug.log('input stream...' + opValue);

		ux.handleOpPressed(event);

	}); // end listner for add
});
