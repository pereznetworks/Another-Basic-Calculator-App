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

export { ux };
