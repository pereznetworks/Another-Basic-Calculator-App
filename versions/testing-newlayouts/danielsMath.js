// Daniel's math library

const calc = {
	/* Calc object with methods for basic calculations
      basic math function (fx):
      divide, multiply, subtract, add, use decimals
		  input Negitave/Positive (-/+) values
			convert active input value into Percent (%)

      future : Menory fx
			future : "scientific" calculator fx
	*/
		sumValue: 0,
		allClear: function() {
			this.sumValue = 0;
			console.log(this.sumValue);
			return this.sumValue;
		},

		matchMathOp: function (opValue, numValue1, numValue2) {

			if ( opValue === '/' ) {

					calc.sumValue = calc.divide(numValue1, numValue2);

		  } else if ( opValue === '*' ) {

					calc.sumValue = calc.multiply(numValue1, numValue2);

			} else if ( opValue === '-' ) {

					calc.sumValue = calc.subtract(numValue1, numValue2);

			} else if ( opValue === '+' ) {

					calc.sumValue = calc.addition(numValue1, numValue2);

			} // end if (opValue ..
			return calc.sumValue;
		},

		divide: function(numValue1, numValue2) {
			// normal divide fx
			this.sumValue = numValue1 / numValue2;
			return this.sumValue;
		},

		multiply: function(numValue1, numValue2) {
			// normal mutliply fx
			this.sumValue = numValue1 * numValue2;
			return this.sumValue;
		},

		subtract: function(numValue1, numValue2) {
			// normal subtract fx
			this.sumValue = numValue1 - numValue2;
			return this.sumValue;
		},

		addition: function(numValue1, numValue2) {
			// normal addition fx
			this.sumValue = numValue1 + numValue2;
			return this.sumValue;
		},

		percent: function(numberOfValues, numValue1, numValue2){
			// % fx  is just like other calculator %
			//
			// research shows that on calculators this function....
			// was designed for customer at a retail shop, asking...
			// what the discount, or percent, might be off of the regular price
			//
			// if only one number is entered, most calculators will...
			//  simply divide only available number by 100, and return answer immedialty
			//
			// using a INT value: numberOfValues, 0 = only 1 value passed, 1 = 2 values passed
			// so, if only 1 value entered;
			//
			// sdo if 1 value passed...
			// for numValue1 = x
			// sumValue = (x/100);
			// return sumValue;
			//
			// if 2 values have been passed, then...
			// for numValue1 = x & numValue2 = y
			// sumValue = ( x * (y/100) );
			// return sumValue;

			if (numberOfValues == 0 ) {
				this.sumValue = numValue1 / 100;
				return this.sumValue;
			} else if ( numberOfValues == 1 ) {
				this.sumValue = numValue1 * ( numValue2 / 100 )
				return this.sumValue;
			}
		},

		posNeg: function(numValue1){
			// postive to negative value conversion
			// quick and  simple way to get oppsite value
			this.sumValue = numValue1 * -1;
			return this.sumValue;
		},

		equals: function() {
			console.log(this.sumValue);
			return this.sumValue;
		}
} // end calc object

const dConsole = {
	// add methods for logging and debugging

	log: function (value) {
		console.log(value);
		}   // improve method by preserving line of code that called method

 }
