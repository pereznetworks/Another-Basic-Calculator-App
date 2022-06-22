$(document).ready(function(){

  var numValue1 = 0;
  var prevNumber = "";

  var operator = "";
  var opStatus = 0;

  var newNumber = "";
  var numValue2 = 0;

  var subtotal = 0;
  var total = 0;
  var answer = "";

  var totaldiv = $("#total");
  totaldiv.text("0");

  	var testNumLength = function(number) {
          if (number.length > 9) {
              totaldiv.text(number.substr(number.length-9,9));
              if (number.length > 15) {
                  number = "";
                  totaldiv.text("Err");
              }
          }
      };

    $('#clear').click(function(){
        prevNumber = '';
        numValue1 = mathOp.resetValue(numValue1);
        console.log("numValue1 cleared = " + numValue1);
        newNumber = '';
        numValue2 = mathOp.resetValue(numValue2);
        console.log("numValue2 cleared = " + numValue2);
        opStatus = 0;
        console.log("Operator Status: " + opStatus);
        totaldiv.text('0');
        });

    $('#clearall').click(function(){
        prevNumber = '';
        numValue1 = mathOp.resetValue(numValue1);
        console.log("numValue1 cleared = " + numValue1);
        newNumber = '';
        numValue2 = mathOp.resetValue(numValue2);
        console.log("numValue2 cleared = " + numValue2);
        opStatus = 0;
        console.log("Operator Status: " + opStatus);
        mathOp.allClear();
        totaldiv.text('0');
        });

    $("#numbers > a").not("#clear,#clearall").click(function(){
        newNumber += $(this).text();
    		totaldiv.text(newNumber);
    		testNumLength(newNumber);
        console.log("newNumber = " + newNumber);

    });

    $("#operators > a").not("#equals").click(function(){
        if (opStatus == 0) {
          prevNumber = newNumber;
          newNumber = '';
          console.log('prevNumber: ' + prevNumber);
        }

    		operator = $(this).text();
        opStatus += 1;
        console.log("math operator: "  + operator);
        console.log("Operator Status:", + opStatus);

        if ( opStatus >= 2 ) {
            console.log("prevNumber: " + prevNumber);
            console.log("math operator: "  + operator);
            console.log("newNumber: " + newNumber);
            console.log("converting number strings into integers...")

            numValue2 = mathOp.makeInt(newNumber);
            numValue1 = mathOp.makeInt(prevNumber);

            console.log("running calculation... .");
            console.log(numValue2);
            console.log(operator);
            console.log(numValue1);

            subtotal = mathOp.calc(numValue1, operator, numValue2);

            numValue1 = subtotal;
            numValue2 = mathOp.resetValue(numValue2);

            answer = subtotal.toString(10);
            console.log(answer);
            totaldiv.text( answer );
            testNumLength( answer );

            newNumber = '';
            prevNumber = subtotal.toString(10);

        }
    });

    $('#equals').click(function () {

        opStatus += 1;

        if (opStatus >= 1) {

              console.log("running equals..");

              console.log("prevNumber: " + prevNumber);
              console.log("math operator: "  + operator);
              console.log("newNumber: " + newNumber);
              console.log("converting number strings into integers...")

              numValue2 = mathOp.makeInt(newNumber);
              numValue1 = mathOp.makeInt(prevNumber);

              console.log(numValue2);
              console.log(operator);
              console.log(numValue1);

              total = mathOp.calc(numValue1, operator, numValue2);

              numValue1 = mathOp.resetValue(numValue1);
              numValue2 = mathOp.resetValue(numValue2);

              answer = total.toString(10);
              console.log(answer);
              totaldiv.text( answer );
              testNumLength( answer );

              newNumber = "";
              prevNumber = total.toString(10);
              opStatus = 1;
          }

    });
});
