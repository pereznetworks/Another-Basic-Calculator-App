// declaring variables that may change

let opValue = '';
let calcSum = 0;
let inputValue = ''
let calcStatus = 0;
let firstNumberValue = 0;
let secondNumberValue = 0;

/* NOT USED let calcButtons = {
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

const calc = {
	/* Calc object with methods for basic calculations
			to do : decimal functions
			to do : Negitave/Positive (-/+)
			to do : Percent (%) functions
			future : Menory functions
			future : "scientific" calculator functions
	*/
		sumValue: 0,
		allClear: function() {
			this.sumValue = 0;
			console.log(this.sumValue);
			return this.sumValue;
		},
		divide: function(numValue1, numValue2) {
			this.sumValue = numValue1 / numValue2;
			return this.sumValue;
		},
		multiply: function(numValue1, numValue2) {
			this.sumValue = numValue1 * numValue2;
			return this.sumValue;
		},
		subtract: function(numValue1, numValue2) {
			this.sumValue = numValue1 - numValue2;
			return this.sumValue;
		},
		addition: function(numValue1, numValue2) {
			this.sumValue = numValue1 + numValue2;
			return this.sumValue;
		},
		equals: function() {
			console.log(this.sumValue);
			return this.sumValue;
		}
} // end calculator object

const mytest = {
	// add methods to use to help debug

	log: function (value) {
		console.log(value);
		}
}

const ux = {
	/* User Experience, UX
		any code needed to implement a working calculator user interface, UI,
		so UX is how a UI should work, look and feel
	*/

	displayValue: function (value) {
			$('.display').html('<input type="text" id="inputNoBlink" value="' + value + '"></input>');
		},

	noBlink: function () {
		$('#input').remove();
	}

} // end ux object

$(document).ready( function () {
// waiting for html document to load

	// the input/display field
	let $input = ("#input");

/* dont need to but selecting entire div #calculator with all calc elements at once
	let $allCalcButtons = $("#calculator");

	// operation buttons
	let $ac = $("#ac");
	let $posNeg = $("#posNeg");
	let $percent = $("#percent");
	let $decimal = $("#decimal")

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
*/


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

			}); // end #Calculator click event handler

}); // end ready function

// see CalcProject.txt for more developer notes
