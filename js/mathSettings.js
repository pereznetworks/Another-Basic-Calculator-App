// app settings for the calculator
// conforms to module 

const mathSettings = { 
	
	maxNumDigits: 4, // the max number of significant digits and decimals values with current display
	numDecimals: 2,
	trailingZeros: false,  // by default, don't display trailing zeros

	setDecimals: function(value) {
		return parseFloat(value.toPrecision(mathSettings.numDecimals));

		// toFixed allows for more decimals and greater precision
		// for current display, need to reduce number of digits
		// current display can only handle 14 significant digits including decimals
		// other modes, like scientific or accounting with different UI, will reconsider
	}
}


export { mathSettings };
