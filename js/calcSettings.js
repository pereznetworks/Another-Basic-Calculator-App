const mathSettings = { 
	
	maxNumDecimals: 14, // the max number of significant decimals with current calc display
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

export { mathSettings, tape, debug };
