/* const debug = {

// deprecated; to be replaced by logging state of app and errors
// ideally, use framework that hides actual code and test cases for dev only debugging

// works by manually setting loggingOn to true and refreshing webpage
	loggingOn: false,
	
	log: function (value){
		if(this.loggingOn){
			this.log = console.log.bind(window.console);
		}
	}
}
*/

/* debugger idea to adapt for v3.0
 Source - https://stackoverflow.com/a/32928812
 Posted by Arctelix, modified by community. See post 'Timeline' for change history
 Retrieved 2026-11-09, License - CC BY-SA 4.0
 
 from stackoverflow discussion : 
 add all the console methods and wrap it up in a reusable function 
 that gives not only global control, but class level as well:
*/

/* var Debugger = function(gState, klass) {
  
   this.debug = {}

   if (gState && klass.isDebug) {
     for (var m in console)
       if (typeof console[m] == 'function')
         this.debug[m] = console[m].bind(window.console, klass.toString()+": ")
   } else {
     for (var m in console)
       if (typeof console[m] == 'function')
         this.debug[m] = function(){}
   }
   return this.debug
}

isDebug = true //global debug state

debug = Debugger(isDebug, this)

debug.log('Hello log!')
debug.trace('Hello trace!')

I think you had five dollars left.

*/ 
