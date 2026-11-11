

let version = 'v2.6.0';
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
let numberValue = '';
let numberOfValues = 0;
let firstNumberValue = 0;
let secondNumberValue = 0;
let numberPressed = false;
let opPressed = false;
let posNegPercentPressed;

const mathSettings = { 
	
	maxNumDecimals: 14, // the max number of significant decimals with current calc display
	numDecimals: 4,
	trailingZeros: false,  // by default, don't display trailing zeros

	setDecimals: function(value) {
		debugTool.log('value:' + value);
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

const debugTool = {
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
		// debugTool.log('numValue1..' + numValue1);

		if (negNum)  {
			this.sumValue = Math.abs(numValue1);
		} else {
			this.sumValue = -Math.abs(numValue1)
			negNum = true
		}
		
		// debugTool.log('posNeg..' + this.sumValue)
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
		// debugTool.log('firstNumberValue: ' + firstNumberValue);
		secondNumberValue = this.isValueANum(secondNumberValue);
		// debugTool.log('secondNumberValue: ' + secondNumberValue);

		// do math, get and save calcSum
		if ( opValue === '/' && secondNumberValue != 0 ) {
				calcSum = calc.divide(firstNumberValue, secondNumberValue);
				this.afterMath(calcSum)
				calcStatus = 2;
				// debugTool.log("calcStatus: " + calcStatus);	
		} else if ( opValue === '*' && secondNumberValue != 0 ) {
				calcSum = calc.multiply(firstNumberValue, secondNumberValue);
				this.afterMath(calcSum)
				calcStatus = 2;
				// debugTool.log("calcStatus: " + calcStatus);	
		} else if ( opValue === '-' && secondNumberValue != 0  ) {
				calcSum = calc.subtract(firstNumberValue, secondNumberValue);
				this.afterMath(calcSum)
				calcStatus = 2;
				// debugTool.log("calcStatus: " + calcStatus);	
		} else if ( opValue === '+' && secondNumberValue != 0 ) {
				calcSum = calc.addition(firstNumberValue, secondNumberValue);
				this.afterMath(calcSum)
				calcStatus = 2; 
				// debugTool.log("calcStatus: " + calcStatus);	
		}

		return { calcSum, calcStatus };
	},

	ops: function () {
		// entered : 3 = 
	    // or : + 3 = 
		// or starting running total like : 6 + 4 = 10 + 3 = 

		if ( opValue === '' ) {  // this usually when very first number is entered
			
			firstNumberValue = parseFloat(numberValue, 10);
			// debugTool.log('firstNumberValue: ' + firstNumberValue);
			calcSum = calc.addition(firstNumberValue, secondNumberValue);
			// in case someone, tries something like, 3 +
			ux.displayValue(calcSum);
			// debugTool.log("calcSum:" + calcSum);
			//so display value entered, no math actually happens

		} else if ( opValue === "+" || opValue === "-" || opValue === "*" || opValue === "/" ) {  
			// entered something like, + 3 = or 3 + 4 =
			
			firstNumberValue = calcSum;
			secondNumberValue = parseFloat(inputValue, 10);
			calcStatus = 3;
			// debugTool.log('secondNumberValue: ' + secondNumberValue);
			// debugTool.log('opValue: ' + opValue);
			// debugTool.log('calcSum: ' + calcSum)
			this.runningTotalDoMath(firstNumberValue, secondNumberValue, opValue);

		} else if ( calcStatus >= 2 ) {  // entered something like, 3 + 3 = 6 + 4 =
			
			firstNumberValue = calcSum;
			// debugTool.log('firstNumberValue: ' + firstNumberValue);
			secondNumberValue = parseFloat(numberValue, 10);
			// debugTool.log('secondNumberValue: ' + secondNumberValue);
			// debugTool.log('opValue: ' + opValue);
			this.runningTotalDoMath(firstNumberValue, secondNumberValue, opValue);

		}

		return { calcSum, calcStatus, firstNumberValue, secondNumberValue, opValue };
	},

	afterMath : function (valueToFix ) {

		let fixedValue = mathSettings.setDecimals(valueToFix);
		ux.displayValue(fixedValue);
		// debugTool.log("calcSum:" + fixedValue);

		return fixedValue;

	},

}

// UI specific tasks
const ux = {
	acShow: true,  // whether to show AC

	acToogle: function () {

		// debugTool.log('run acToogle:' + this.acShow);

		if ( this.acShow ) {
			// then toogle C button to AC
			$('#ac')[0].innerHTML = "AC";
			// debugTool.log('C change to AC:' + this.acShow);

		} else {
			// else toogle AC button to C
				$('#ac')[0].innerHTML = "C";
			// debugTool.log('AC change to C:' + this.acShow);

		}

	},

	displayValue: function (value) {

		$('#input').removeClass('inputBlink').text(value);
		// debugTool.log('displaying value ' + value);

	},

	displayVersion: function (version) {
		$('#version').html('#Calc ' + version);
		$('title').html('#Calc ' + version)
	},

	handleOpPressed: function (event) {
		
		// setup for various math, based on previous operator entered
		
		ux.acShow = false;
		ux.acToogle();
		// debugTool.log('calcStatus: ' + calcStatus);

		if ( equals && calcStatus == 3) {

			// debugTool.log('secondNumberValue:' + secondNumberValue);
			// debugTool.log('firstNumberValue:' + firstNumberValue);

			// debugTool.log('opValue: ' + opValue);
			// debugTool.log('opPressesd:' + opPressed);
			// debugTool.log('calcStatus:' + calcStatus);
			
			firstNumberValue = calcSum;
			// debugTool.log('firstNumberValue:' + firstNumberValue);
			// debugTool.log('calcStatus: ' + calcStatus);
			equals = false;
			ux.acShow = true;
			ux.acToogle();

        } else if ( opValue === '+/-' ) {

			firstNumberValue = calcSum;
			// debugTool.log('firstNumberValue:' + firstNumberValue);
			numberValue = '';
			// debugTool.log('opValue: ' + opValue);
			// debugTool.log('calcStatus: ' + calcStatus);

	    } else if ( opValue === "+" || opValue === "-" || opValue === "*" || opValue === "/" ) {

			
			if (calcStatus == 1) {

				// debugTool.log('numberValue:' + numberValue);
				firstNumberValue = parseFloat(numberValue, 10);
				// debugTool.log('firstNumberValue:' + firstNumberValue);
				numberValue = '';

				// debugTool.log('secondNumberValue:' + secondNumberValue);
				// 	debugTool.log('firstNumberValue:' + firstNumberValue);
	
				// debugTool.log('opValue: ' + opValue);
				// debugTool.log('opPressesd:' + opPressed);
				// debugTool.log('calcStatus:' + calcStatus);
				
			} else if (calcStatus > 1) {
				
				// debugTool.log('input stream...' + inputValue);
				// debugTool.log('numberValue:' + numberValue)
				secondNumberValue = parseFloat(numberValue, 10);
				// debugTool.log('secondNumberValue:' + secondNumberValue);
				numberValue = '';

				// debugTool.log('secondNumberValue:' + secondNumberValue);
				// debugTool.log('firstNumberValue:' + firstNumberValue);


				// debugTool.log('opPressesd:' + opPressed);
				// debugTool.log('opValue: ' + opValue);
				// debugTool.log('opValue2: ' + opValue2);
				// debugTool.log('calcStatus:' + calcStatus);
				

			}

	    } else if ( opValue === '%') {

			opValue2 = opValue;
			opValue = inputValue;
			numberValue = '';
			firstNumberValue = calcSum;

			// debugTool.log('opValue: ' + opValue);
			// debugTool.log('opValue2: ' + opValue2);
			// debugTool.log('firstNumberValue = calcSum: ' + calcSum);
			// debugTool.log('calcStatus: ' + calcStatus);

    	}
        
		// if there are 2 values entered, which math operator
		if ( numberPressed && calcStatus > 1 && opValue === '/' ) {

			calcSum = calc.divide(firstNumberValue, secondNumberValue);

			// debugTool.log('secondNumberValue:' + secondNumberValue);
			// debugTool.log('firstNumberValue:' + firstNumberValue);
			// debugTool.log('opPressesd:' + opPressed);
			// debugTool.log('calcStatus:' + calcStatus);
			// debugTool.log('calcSum:' + calcSum);

			ux.displayValue(calcSum);
			// debugTool.log('calcSum:' + calcSum);

			ux.acShow = true;
			ux.acToogle();

			numberValue = 0;
			firstNumberValue = calcSum;
			secondNumberValue = 0;
			calcStatus = 3;
			opPressed = false;
			// debugTool.log('opPressesd:' + opPressed);
			numberPressed = false;
			// debugTool.log('numberPressesd:' + numberPressed);

		} else if ( numberPressed && calcStatus > 1 && opValue === '*' ) {

			calcSum = calc.multiply(firstNumberValue, secondNumberValue);
			// debugTool.log('secondNumberValue:' + secondNumberValue);
			// debugTool.log('firstNumberValue:' + firstNumberValue);
			// debugTool.log('opPressesd:' + opPressed);
			// debugTool.log('calcStatus:' + calcStatus);
			// debugTool.log('calcSum:' + calcSum);

			// debugTool.log('calcSum:' + calcSum);
			ux.displayValue(calcSum);
			// debugTool.log('calcSum:' + calcSum);


			ux.acShow = true;
			ux.acToogle();

			numberValue = 0;
			firstNumberValue = calcSum;
			secondNumberValue = 0;
			calcStatus = 3;
			opPressed = false;
			// debugTool.log('opPressesd:' + opPressed);
			numberPressed = false;
			// debugTool.log('numberPressesd:' + numberPressed);

		} else if ( numberPressed && calcStatus > 1 && opValue === '-' ) {

			calcSum = calc.subtract(firstNumberValue, secondNumberValue);

			// debugTool.log('secondNumberValue:' + secondNumberValue);
			// debugTool.log('firstNumberValue:' + firstNumberValue);
			// debugTool.log('opPressesd:' + opPressed);
			// debugTool.log('calcStatus:' + calcStatus);
			// debugTool.log('calcSum:' + calcSum);

			ux.displayValue(calcSum);
			// debugTool.log('calcSum:' + calcSum);


			ux.acShow = true;
			ux.acToogle();

			numberValue = 0;
			firstNumberValue = calcSum;
			secondNumberValue = 0;
			calcStatus = 3;
			opPressed = false;
			// debugTool.log('opPressesd:' + opPressed);
			numberPressed = false;
			// debugTool.log('numberPressesd:' + numberPressed);

		} else if ( numberPressed && calcStatus > 1 && opValue === '+' ) {

			calcSum = calc.addition(firstNumberValue, secondNumberValue);

			// debugTool.log('secondNumberValue:' + secondNumberValue);
			// debugTool.log('firstNumberValue:' + firstNumberValue);
			// debugTool.log('opPressesd:' + opPressed);
			// debugTool.log('calcStatus:' + calcStatus);
			// debugTool.log('calcSum:' + calcSum);

			ux.displayValue(calcSum);
			// debugTool.log('calcSum:' + calcSum);

			numberValue = 0;
			firstNumberValue = calcSum;
			secondNumberValue = 0;
			calcStatus = 3;
			opPressed = false;
			// debugTool.log('opPressesd:' + opPressed);
			numberPressed = false;
			// debugTool.log('numberPressesd:' + numberPressed);

		}
	},

}

$(document).ready( function () {

ux.displayVersion(version);

// event-listeners

	$('#ac, #lac').click(function(event){

	  
		
		// debugTool.log('AC pressed ...');
		allClear = $(this).text();

		if ( allClear == 'C' ) {

			// debugTool.log('C clicked, roll back to last entry');
			

			if ( opPressed ) {
				opValue = '';
				opPressed = false;
				calcStatus > 1 ? calcStatus -= 1 : calcStatus = 0;
				firstNumberValue == NaN ? inputValue = '' : inputValue = firstNumberValue;
				// debugTool.log('opValue:' + opValue);
				// debugTool.log('calcstatus:' + calcStatus);
				// debugTool.log('inputValue:' + inputValue);
				// debugTool.log('numberValue:' + numberValue);
				// debugTool.log('firstNumberValue:' + firstNumberValue);

			} else if ( numberPressed ){

				inputValue = '';
				firstNumberValue = initialValue;
				numberValue = firstNumberValue;
				secondNumberValue = 0;
				ux.displayValue(initialValue);
				// debugTool.log('firstNumberValue:' + firstNumberValue);
				// debugTool.log('secondNumberValue:' + secondNumberValue);

			} else { // if equals just pressed


				calcSum = 0;
				ux.displayValue(calcSum);
				// debugTool.log('calcSum:' + calcSum);
				calcStatus = 0;
				// debugTool.log('calcStatus:' + calcStatus);
				inputValue = initialValue;
				numberValue = '';
				// debugTool.log('numberValue:' + numberValue);
				opValue = '';
				// debugTool.log('opValue:' + opValue);
				opValue2 = '';
				// debugTool.log('opValue:' + opValue2);
				equals = false;
				// debugTool.log('equals:' + equals);
				numberPressed = false;
				// debugTool.log('numberPressed:' + numberPressed);
				opPressed = false;
				// debugTool.log('opPressed:' + opPressed);
				posNegPercentPressed = false;
				// debugTool.log('posNegPercentPressed: ' + posNegPercentPressed);
				percent = false;
				// debugTool.log('percent:' + percent);
				firstNumberValue = 0;
				// debugTool.log('firstNumberValue:' + firstNumberValue);
				secondNumberValue = 0;
				// debugTool.log('secondNumberValue:' + secondNumberValue);
				// TODO: storage of memory values cleared
				// debugTool.log("memory storage cleared ")
				
			}

			ux.acShow = true;
			ux.acToogle();

		} else if ( allClear === 'AC') {

			// debugTool.log('AC clicked, reseting all values');

			calcSum = 0;
			ux.displayValue(calcSum);
			// 	debugTool.log('calcSum:' + calcSum);
			calcStatus = 0;
			// debugTool.log('calcStatus:' + calcStatus);
			inputValue = '';
			numberValue = '';
			// debugTool.log('numberValue:' + numberValue);
			opValue = '';
			// debugTool.log('opValue:' + opValue);
			equals = false;
			// debugTool.log('equals:' + equals);
			numberPressed = false;
			// debugTool.log('numberPressed:' + numberPressed);
			opPressed = false;
			// debugTool.log('opPressed:' + opPressed);
			percent = false;
			// debugTool.log('percent:' + percent);
			firstNumberValue = 0;
			// debugTool.log('firstNumberValue:' + firstNumberValue);
			secondNumberValue = 0;
			// debugTool.log('secondNumberValue:' + secondNumberValue);
			// TODO: storage of memory values cleared
			// debugTool.log("memory storage cleared ")

		}
	}); // end all-clear button event handler

	$('#posNeg, #percent, #lposNeg, #lpercent').click(function(event){

			if (!posNegPercentPressed) {

				posNegPercentPressed = true;

				// // debugTool.log('inputValue: ' + inputValue);
				numberValue = parseFloat(inputValue);
				inputValue = '';
				numberPressed = false;
				opPressed = true;
				equalsJustPressed = false 
				opValue = $(this).text();
				// debugTool.log('opValue:', opValue);
				secondNumberValue = 0;

				// has a math operation has taken place or should, and what to do
				if ( opValue === '%' && equals == true ) {

					firstNumberValue = calcSum;
					// debugTool.log('calcSum = firstNumberValue:' + firstNumberValue);
					calcSum = calc.percent(numberOfValues, firstNumberValue);
					numberOfValues = 0;
					percent = true;
					numberValue = '';
					equals = false;

				} else if ( opValue === '%' ) {

					firstNumberValue = parseFloat(numberValue, 10);
					// debugTool.log('firstNumberValue:' + firstNumberValue);
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
					
				debugTool.log('calcSum:' + calcSum);
				firstNumberValue = calcSum;
				// debugTool.log('firstNumberValue: ' + firstNumberValue);

			}

	}); // end listener for +/-  %

	$('#equals, #lequals').click(function(event){

		if (!equalsJustPressed) {
			
			// debugTool.log('equals pressed');
			equals = true;
			equalsJustPressed = true;
			opPressedOnce = false;
			opValue2 = '=';
			calcStatus++

			numberValue = parseFloat(inputValue);
			// debugTool.log('input stream.. ' + inputValue);
			// debugTool.log('numberValue ' + numberValue);

			// eval all numeric entry and operators and do math
			if (calcStatus == 3) {
			calcEval.ops(firstNumberValue, secondNumberValue, opValue)	
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
		// debugTool.log('posNegPercentPressed: ' + posNegPercentPressed);

		if (firstentry) {
			inputValue = $(this).text();
			ux.displayValue(inputValue);
			firstentry = false;
		} else {
			inputValue += $(this).text();
			ux.displayValue(inputValue);
		}


		// debugTool.log('input stream..' + inputValue);
		// debugTool.log('this.text..' + $(this).text());			  

	}); // end listner for nums pressed
	
	$('#divide, #multiply, #subtract, #add, #ldivide, #lmultiply, #lsubtract, #ladd').click(function(event) {
		
		equalsJustPressed = false;
		// debugTool.log("equals just pressed: " + equalsJustPressed);

		if (!opPressedOnce) {
			opPressedOnce = true;
			// debugTool.log('opPressesOnce: ' + opPressedOnce);
			opPressed = true;
			opValue = $(this).text()
			// debugTool.log('opValue' + opValue);
			// debugTool.log('posNegPercentPressed: ' + posNegPercentPressed);
			calcStatus++;
			//debugTool.log('calcStatus' + calcStatus);
			firstentry = true;
			
			if (equals && numberPressed && calcSum != 0) {

				// debugTool.log('opValue' + opValue);
				calcStatus = 3;
				calcEval.ops(firstNumberValue, secondNumberValue, opValue);

			} else if ( !posNegPercentPressed ) {
					// debugTool.log('input stream...' + inputValue);
					if (inputValue == null) {
						numberValue = 0;
					} else {
						numberValue = parseFloat(inputValue);
					}
					//debugTool.log('numberValue...' + numberValue);
					inputValue = null;
					ux.handleOpPressed(event);
			} 
		}

	}); // end listner for basic math ops

}); // end $(document).ready
