// UI specific tasks
// conforms to module pattern


const ux = {
	acShow: true,  // whether to show AC

	acToogle: function () {

		debug.log('run acToogle:' + this.acShow);

		if ( this.acShow ) {
			// then toogle C button to AC
			$('#ac')[0].innerHTML = "AC";

		} else {
			// else toogle AC button to C
				$('#ac')[0].innerHTML = "C";

		}

	},

	displayValue: function (value) {

		$('#input').removeClass('inputBlink').text(value);

	},

	displayVersion: function (version) {
		$('#version').html('#Calc ' + version);
		$('title').html('#Calc ' + version)
	},

	handleOpPressed: function (event, calcValues) {
		
		// setup for various math, based on previous operator entered
		// TO DO: build a method for each operator

		ux.acShow = false;
		ux.acToogle();

		if ( calcValues.opValue === '+/-' ) {

			calcValues.firstNumberValue = calcValues.calcSum;
			calcValues.numberValue = '';
			// TO DO: move toggling of the positive/negative operation here or in separate method?
			return({ firstNumberValue: calcValues.firstNumberValue, numberValue: calcValues.numberValue });
	    } 

		if ( calcValues.opValue === '%') {

			calcValues.opValue2 = calcValues.opValue;
			calcValues.opValue = calcValues.inputValue;
			calcValues.numberValue = '';
			calcValues.firstNumberValue = calcValues.calcSum;

    	}
        
		// TO DO: set calcStatus to 0 after handling the equals button press?
		if ( calcValues.equals && calcValues.calcStatus == 3) {
			
			calcValues.firstNumberValue = calcValues.calcSum;
			calcValues.equals = false;
			ux.acShow = true;
			ux.acToogle();

        } 

		// if there are 2 values entered, which math operator
		if ( calcValues.numberPressed && calcValues.calcStatus > 1 && calcValues.opValue === '/' ) {

			calcValues.calcSum = calc.divide(calcValues.firstNumberValue, calcValues.secondNumberValue);

			ux.displayValue(calcValues.calcSum);

			ux.acShow = true;
			ux.acToogle();

			calcValues.numberValue = 0;
			calcValues.firstNumberValue = calcValues.calcSum;
			calcValues.secondNumberValue = 0;
			calcValues.calcStatus = 3;
			calcValues.opPressed = false;
			calcValues.numberPressed = false;

		} else if ( calcValues.numberPressed && calcValues.calcStatus > 1 && calcValues.opValue === '*' ) {

			calcValues.calcSum = calc.multiply(calcValues.firstNumberValue, calcValues.secondNumberValue);

			ux.displayValue(calcValues.calcSum);


			ux.acShow = true;
			ux.acToogle();

			calcValues.numberValue = 0;
			calcValues.firstNumberValue = calcValues.calcSum;
			calcValues.secondNumberValue = 0;
			calcValues.calcStatus = 3;
			calcValues.opPressed = false;
			calcValues.numberPressed = false;

		} else if ( calcValues.numberPressed && calcValues.calcStatus > 1 && calcValues.opValue === '-' ) {

			calcValues.calcSum = calc.subtract(calcValues.firstNumberValue, calcValues.secondNumberValue);

			ux.displayValue(calcValues.calcSum);

			ux.acShow = true;
			ux.acToogle();

			calcValues.numberValue = 0;
			calcValues.firstNumberValue = calcValues.calcSum;
			calcValues.secondNumberValue = 0;
			calcValues.calcStatus = 3;
			calcValues.opPressed = false;
			calcValues.numberPressed = false;

		} else if ( calcValues.numberPressed && calcValues.calcStatus > 1 && calcValues.opValue === '+' ) {

			calcValues.calcSum = calc.addition(calcValues.firstNumberValue, calcValues.secondNumberValue);

			ux.displayValue(calcValues.calcSum);

			calcValues.numberValue = 0;
			calcValues.firstNumberValue = calcValues.calcSum;
			calcValues.secondNumberValue = 0;
			calcValues.calcStatus = 3;
			calcValues.opPressed = false;
			calcValues.numberPressed = false;

		}
	},

}

export { ux };