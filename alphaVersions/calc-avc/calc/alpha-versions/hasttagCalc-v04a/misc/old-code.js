/* NOT USED prototype calcButtons array = {
	 Array of all the possible Calc button values

	numbers: ['9', '8', '7', '6', '5', '4', '3', '2', '1', '0', '.' ],

	operations: [
		['clear', 'AC'],
		['divide','/'],
		['multiply','*'],
		['substract','-'],
		['add','+'],
		['equals','='],
		['posNeg','+/-'],
		['percent', '%'],
		['decimal','.']
	]

} */

/* NOT USED v.03 a #calculator event handler for both operators and numbers
	$('#calculator').click(function(event) {

		inputValue = event.target.textContent;

		if ( isNaN( parseInt(inputValue) ) )  {  // testing for click of operation button
			//runs if operation button clicked
			 opValue = inputValue;
			 console.log(opValue);

		} else if (calcStatus == 0) {
							firstNumberValue = parseInt(inputValue);
							console.log(firstNumberValue);
							ux.noBlink();
							ux.displayValue(firstNumberValue);
							calcStatus += 1;
		} else if (calcStatus == 1) {
							secondNumberValue = parseInt(inputValue);
							console.log(secondNumberValue);
							ux.noBlink();
							ux.displayValue(secondNumberValue);
							calcStatus += 1;
		}  // end if NaN

					 // now if we have more than 1 number value, do math
		 			 if ( calcStatus >= 2 && opValue === '/' ) {

		 					calcSum = calc.divide(firstNumberValue, secondNumberValue);
		 					ux.displayValue(calcSum);
		 					firstNumberValue = calcSum;

		 			} else if ( calcStatus >= 2 && opValue === '*' ) {

		 					calcSum = calc.multiply(firstNumberValue, secondNumberValue);
		 					ux.displayValue(calcSum);
		 					firstNumberValue = calcSum;

		 			} else if ( calcStatus >= 2 && opValue === '-' ) {

		 					calcSum = calc.subtract(firstNumberValue, secondNumberValue);
		 					ux.displayValue(calcSum);
		 					firstNumberValue = calcSum;

		 			} else if ( calcStatus >= 2 && opValue === '+' ) {

		 					calcSum = calc.addition(firstNumberValue, secondNumberValue);
		 					ux.displayValue(calcSum);
		 					firstNumberValue = calcSum;

		 			} else if ( calcStatus >= 1 && opValue === '=' ) {

		 					calcSum = calc.equals();
		 					console.log(calcSum);
		 					ux.displayValue(calcSum);
		 					firstNumberValue = calcSum;
		 					calcStatus = 1;

		 			} else if ( opValue === 'AC' ) {

		 					calcSum = calc.allClear();
		 					ux.displayValue(calcSum);
		 					opValue = '';
		 					calcStatus = 0;

		 			} // end if (calcStatus) else if (opValue ..)

			}); // end #Calculator click event handler  */

/* NEVER USED selecting entire div #calculator with all calc elements at once

				// the input/display field
				let $input = ("#input");
				let $allCalcButtons = $("#calculator");

				// operation buttons
				let $ac = $("#ac");
				let $posNeg = $("#posNeg");
				let $percent = $("#percent");

				// basic math functions
				let $divide = $("#divide");
				let $multiply = $("#multiply");
				let $subtract = $("#subtract");
				let $add = $("#add");
				let $equals = $("#equals");

				// number buttons
				let $nine = $("#nine");
				let $eight = $("#eight");
				let $seven = $("#seven");
				let $six = $("#six");
				let $five = $("#five");
				let $four = $("#four");
				let $three = $("#three");
				let $two = $("#two");
				let $one = $("#one");
				let $zero = $("#zero");
				let $decimal = $("#decimal")
				*/
