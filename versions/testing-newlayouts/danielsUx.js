// UX library

const values = {

  inputStreamAL: 0, // array length of danielsUx:values.inputStream array
  tapeAL: 0,  // array length of danielsUx:values.tape array

  inputStream: [0,], // first element 0 by default, for values entered by user
  tape: [0,], // first element 0 by default, history of each calc: values, math ops and sum

  readIntoArray : function (stringValue) {
    // read numberValue or opValue into inputStream & Tape object-array as last element
    values.inputStreamAL = values.inputStream.push( stringValue );
    values.tapeAL = values.tape.push( stringValue );
  },


  showArrayStatus : function () {
    console.log( "inputStream values are: ");
    console.log( ux.showArray(values.inputStream) );

    console.log( "Tape: ");
    console.log( ux.showArray(values.tape) );
  },

  tasksAfterCalc: function (opValue2, calcSum) {

    values.inputStreamAL = values.inputStream.push( calcSum );
    values.inputStreamAL = values.inputStream.push( opValue2 );
    values.tapeAL = values.tape.push( calcSum );

    console.log('calcSum: ' + calcSum);
    ux.displayValue(calcSum);
  },

  tasksAfterPercent: function (numberValues, firstNumberValue, opValue, secondNumberValue) {
    if ( numberValues == 2 ) {
      values.inputStreamAL = values.inputStream.push( secondNumberValue);
      values.tapeAL = values.tape.push( secondNumberValue );
      values.inputStreamAL = values.inputStream.push( opValue);
      values.inputStreamAL = values.inputStream.push( firstNumberValue);

      console.log('secondNumberValue: ' + secondNumberValue);
      ux.displayValue(secondNumberValue);
    } else {
      values.inputStreamAL = values.inputStream.push( firstNumberValue);
      values.tapeAL = values.tape.push( firstNumberValue );

      console.log('firstNumberValue: ' + firstNumberValue);
      ux.displayValue(firstNumberValue);
    }
  },

  tasksAfterEquals: function (value) {
    // used after equals, +/i math functions..
    values.inputStreamAL = values.inputStream.push( value);
    values.tapeAL = values.tape.push( value );

    console.log('calcSum: ' + value);
    ux.displayValue(value);
  },

  showArray: function (arrayName) {  // display contents of "arrayName" to console.log, with space and commas
    $.each( arrayName, function( index, element ){
       console.log( index + ": " + element + ", ");
      });
  }
} // end values obkect

const ux = {

	/* User Experience, UX
		any code needed to implement a working calculator user interface, UI,
		so UX is how a UI should work, look and feel
	*/

  acToogle: true,

  /*  acToogle to be used with toogleAllClear method ....

	toogleAllClear: function (value) {
        if (--- what condition to test ? ---- ) {
          	$('#ac').html('<a id="clear">C</a><a id="ac" style="display: none;">AC</a>');
        } else {
            $('#ac').html('<a id="ac" style="display: none;">AC</a><a id="clear">C</a>');
        }

		},
		// when a number is entered, change AC button to C
		// when then when the C button is clicked, then change it back to an AC button

	*/

	displayValue: function (value) {  // display value passed in HTML element with class, display, wrapped inside input tag
			$('.display').html('<input type="text" id="inputNoBlink" value="' + value + '"></input>');
		},

  removeBlink: function () {  // remove blinking input tag with id, input
  		$('#input').remove();
  	}
} // end ux object
