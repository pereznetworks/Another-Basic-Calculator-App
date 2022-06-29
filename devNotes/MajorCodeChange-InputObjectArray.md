/* Major Code change:  implement input-object-array ....

    to fix some bugs and to enable more functionality
      use an object array to store and process all input, both number and operator values
          other object arrays can be then implemented to enable other features
*/

/* also, refactor for JS ES6 or newer if available ...

    already const and let instead of var
    already using function expression in object-methods
    need to re-check for best practice
*/

/*     1: logic, prototype, usage of Input-object-array...

       values in array would be string values

       prototype object array
         with values demo'ed per case, read into, from array

         inputObject = {
           values: []  // .. this.values array starts off empty
         }

        inputs read into array last first;
        so if buttons [5], then [+], then [3] are clicked,
        would be read into input-object-array as;
        [0:5]
        [0:+], [1:5]
        [0:3], [1:+], [2:5]

        object array would be:
          inputObject = {
            values: ['3', '+', '5']
          }

          length of array: indexValue:
              inputObject.values.length

          reading into end of array:  push()

              arrayLength = inputObject.values.push(stringValue):

          reading from and removing from end of array: pop()
              will then need to test stringValue,

              stringValue = inputObject.values.pop()
               will know if (isNaN ) depending on click event handler

          reading into beginning of array: unshift()

            arrayLength = inputObject.values.unshift(newInputStringValue)

              for new number input, read into beginning of array
                newNumber += $(this).text();
                arrayLength = inputObject.values.unshift(newNumber);

              for new operator input, read into beginning of array
                operator = $(this).text();
                arrayLength = inputObject.values.unshift(operator);
                opStatus += 1;

        .. once 2nd math operator entered, such as
            ....  [0:/], [1:3], [2:+], [3:5]

        object array would be:
          inputObject = {
            values: ['/', '3', '+', '5']
          }
        .. because of click event handlers, can be 99.9% sure what type of value
        .. for a calc, end of array processed, one at a time
        assigning last value of array and popping off end;  remaining in array would be ...
         <5> numValue1 = makeInt(inputObject.values.pop()); [0:/], [1:3], [2:+]
        <'+'> operator = inputObject.values.pop(); [0:/], [1:3]
         <3> numValue2 = makeInt(inputObject.values.pop()); [0:/]

        .. calculating as .....                     5 + 3 = 8
             if (operator == '+') {
                total = numValue1 + numValue2;
             }
             answer = total.toString(10);

        total would be read into end of array;
              arrayLength = inputObject.values.push(answer):  [0:/], [1:8]

        object array would be:
          inputObject = {
            values: ['/', '8']
          }

        then more values entered;              [0:=], [1:2], [2:/], [3:8]

        object array would be:
          inputObject = {
            values: ['=', '2', '/', '8']
          }

        ..then with equals, as with any other math-op
        .. end of array processed,
        assigning last value of array and popping off end;  remaining in array would be ...
         <8> numValue1 = makeInt(inputObject.values.pop()); [0:=], [1:2], [2:/], [3:8]
        <'/'> operator = inputObject.values.pop(); [0:=], [1:2],
         <2> numValue2 = makeInt(inputObject.values.pop()); [0:=],
         <=> clearedValue = inputObject.values.shift();
                  or wait until after calc to replace with answer value...

        .. and calc  as...     8 / 2 = 4
        if (operator == '+/') {
           total = numValue1 / numValue2;
        }
        answer = total.toString(10);

        total would be only value in input-object-array;
          inputObject.values.[0] = answer:       [0:4]

        object array would be:
          inputObject = {
            values: ['4']
          }

        .. user could do allClear or Clear..

        clearing just last entered value: shift()

            clearedValue = inputObject.values.shift();
               previous cleared value being erased each time

        object array would be:
          inputObject = {
            values: []
          }

        .. or keep entering values,
        answer value read into end of array,
        new input values read into beginning of array
*/

/*     2: so input and calc process flow ....

        new values read into beginning of array

            as proActive step: test arrayLength == array.length
              if array processed correctly, and arrayLength updated properly
                arrayLength == array.length will always evaluate to TRUE
              else ... do some error handling

            if number, read into beginning of array, shifting existing values over
            get new arrayLength

            if operator, read into beginning of array, shifting existing values over
            get new arrayLength
             opStatus += 1
              if opStatus >= 2, do math (opStatus == 1, so no math),

            if number, read into beginning of array, shifting existing values over
            get new arrayLength

            if operator, read into beginning of array, shifting existing values over
            get new arrayLength
            if opStatus >= 2, do math (opStatus == 2, so do math)
              pop off values from end of array, assigning to respective vars
              subtotal or total converted, using toString
                and read in place of only value in array[0],
                after a calc with equals, opStatus reset to 1
                after a calc with other math-Ops, opStatus keeps incrementing
                for either, get new arrayLength
*/

/*      3: adjustment to event click handlers...

          each click event handler will need to access array

            for each of the following, will need to test arrayLength == array.length

            allClear: will reset entire array, (still need a method for this )

            clear: will only most remove recent value entered from array

            numbers: read input stream into array instead of simple string var, like numberValue,
                      will unshift() into array,
                      opStatus, += 1, is incremented
                      get new arrayLength


            operators: read input stream into array instead of simple string var, like opValue,
                      will read, unshift(), math-Op value into array at index [0], most recent most first
                      opStatus += 1, get new arrayLength
                      then ...
                      if opStatus == 1, not ready for math, calc is NOT performed
                      if opStatus == 2, then ready for math, calc IS performed
                      removing last three values from array, one at a time (num, op, num)
                       after calc, subtotal will read into end of array
                       after a calc with math-Op, opStatus allowed to keep incrementing

            equals: will do calc only,
                    if opStatus >= 1, then ready for math, calc IS performed
                    removing last FOUR values from array, one at a time (num, op, num, equals)
                     after calc, subtotal will read into end of array
                    removing last four values from array,
                    after calc,
                        total will be only value in array,
                        opStatus reset to 1
                        get new arrayLength

           simple var that NOT needed:
                    string newNumber
                    string opValue2

          simple var that MAY be needed:
                   string opValue
                   int numValue1
                   int numValue2
                   int total
                   string answer
*/