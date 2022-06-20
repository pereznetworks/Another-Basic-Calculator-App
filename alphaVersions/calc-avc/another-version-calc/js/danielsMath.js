/* Daniel's Math Libray
  // a library of object methods to be used methods for/with math and numbers
  // uses javascript, jquery code
  // to be used with latest jquery<..>min.js
*/

/* usage of mathOp object methods.....
  // intValue = mathOp.<method-name>(values);
  //
  // intValue = mathOp.makeInt(stringValue);
  //        returns result of parstInt(stringValue, 10)
  //        if ( isNaN(parstInt(stringValue, 10) ) ) is true then ...
  //        0 assigned to intValue, with console.log explaining why..
  //        then returns an intValue
  //
  // intValue = mathOp.calc(intValue1, stringValue, intValue2);
  //         run mathOp.makeInt method on string Values to be used in mathOp.calc
  //         an if statement test matches (operator === "<string Value>")
  //          stringValue matched are "+", "-", "/", "*"
  //         runs sum = sum <opValue> (intValue1 + intValue2)
  //            operators "%" and other advanced math to be implemented in future versions
  //         returns sum as intValue
  //
  // intValue = mathOp.allClear()
  //        resets integer value, sum, to 0
  //        returns integer value sum;

*/
  const mathOp = {

        subtotal: 0,
        total: 0,

        resetValue: function (numValue) {
          numValue = 0;
          return numValue;
        },

        allClear: function() {
          this.subtotal = 0;
          this.total = 0;
          console.log("allClear'ed: subtotal: " + this.subtotal);
          console.log("allClear'ed: total: " + this.total);
        },

        makeInt: function (stringValue) {
            let numValue = parseInt(stringValue, 10);
            if ( isNaN(parseInt(stringValue, 10)) ) {
                numValue = 0;
                console.log(" numValue set to 0, stringValue, '" + stringValue + "', could not be converted to an integer")
                }
            return numValue;
        },

       calc: function (numValue1, operator, numValue2) {

          if (operator === "+") {

            this.subtotal = numValue1 + numValue2;
            console.log("subtotal is: " + this.subtotal);

           } else if ( operator === "-") {

            this.subtotal = numValue1 - numValue2;
            console.log("subtotal is: " + this.subtotal);

          } else if ( operator === "/") {

            this.subtotal =  numValue1 / numValue2;
            console.log("subtotal is: " + this.subtotal);

          } else if ( operator === "*") {

            this.subtotal =  numValue1 * numValue2;
            console.log("subtotal is: " + this.subtotal);

          }
        return this.subtotal;
       },

       eqauls: function (numValue1, operator, numValue2) {

              if (operator === "+") {

                 this.total = numValue1 + numValue2;
                 console.log("total is: " + this.total);

                } else if ( operator === "-") {

                 this.total = numValue1 - numValue2;
                 console.log("total is: " + this.total);

               } else if ( operator === "/") {

                 this.total = numValue1 / numValue2;
                 console.log("total is: " + this.total);

               } else if ( operator === "*") {

                 this.total = numValue1 * numValue2;
                 console.log("total is: " + this.total);

               }
               console.log("total is: " + this.total)
            this.subtotal = this.total;
            return this.total;
       }
    }
