var $ = function(id) {	return document.getElementById(id);	}//end $

var MINOZ = 0;			//Smallest number of ounces
var MAXOZ = 15;		//Maximum number of ounces

window.onload = function() {
	$("frmWeight").reset(); //Clear previous entries in FF
	
	//Set form object min/max values
	setInputMinMaxes();	
	
	//For testing purposes only
	initializeFieldValues();
	
	//Create event handlers
	$("txtItemName").addEventListener('blur', validateItemName);
    $("numItemWeightLb").addEventListener('blur', validatePounds);
    $("numItemWeightLb").addEventListener('keydown', IntegerKeyPress);
    $("numItemWeightOz").addEventListener('blur', validateOunces);
    $("numItemWeightOz").addEventListener('keydown', IntegerKeyPress);
    $("numNumberOfItems").addEventListener('blur', validateQuantity);
    $("numNumberOfItems").addEventListener('keydown', IntegerKeyPress);
    $("dtpSampleDate").addEventListener('blur', validateSampleDate);
    
    $("btnSubmit").onclick = validateForm;
    $("btnReset").onclick = resetForm;

    $("txtItemName").focus();
	



} //end onload

/*	This function sets the minimum and maximum ounce values.
*/
function setInputMinMaxes() {

	$("numItemWeightLb").min = 0;
	
	var ptr = $("numItemWeightOz");		//Pointer to the ounces input
	ptr.min = MINOZ;
	ptr.max = MAXOZ;
	
	$("numNumberOfItems").min = 0;
}//end setInputMinMaxes

/*	This function ensures the user has entered an item name.
	If an item name is entered it is appropriately capitalized.
*/
function validateItemName( ) {
	var ptr = $("txtItemName"); 			//Pointer to item name input field
	var err = $("errItemName");			//Pointer to error marker for item name
	
	err.style.visibility = "hidden";
	if (ptr.value == "") {
		err.style.visibility = "visible";
		err.title = "You must enter the item's name.";
	} else {
		ptr.value = ptr.value.toTitleCase();
	}//endif

	return err.style.visibility == "hidden";		
}//end validateItemName

/*	This function ensures the user has entered an amount for pounds.
	IntegerKeyPress ensures only digits are entered.
	Any amount is allowed.
*/
function validatePounds() {
	var ptr = $("numItemWeightLb"); 		//Pointer to pounds input field
	var err = $("errItemWeightLb");		//Pointer to error marker for pounds
	var input;									//Contents of the pounds text box
	
	err.style.visibility = "hidden";
	if(ptr.value == "") {
		err.style.visibility = "visible";
		err.title = "You must enter the number of pounds.";
	} else {
		input = FormatNumber(ptr.value, "G");  //Unformat it (remove commas
		input = parseInt(input);
		if(input<0) {  
			err.style.visibility = "visible";
			err.title = "Pounds must be at least 0";
		} else {
			ptr.value = FormatNumber(input, "N0");
		} //end if
	}//end if

	return err.style.visibility == "hidden";

}//end validatePounds

/*	This function ensures the user has entered a number of ounces.
	IntegerKeyPress ensures only digits are entered.
	The number of ounces must be between the designated min and max values.
*/
function validateOunces() {
	var ptr = $("numItemWeightOz"); 		//Pointer to ounces input field
	var err = $("errItemWeightOz");		//Pointer to error marker for ounces
	var input;									//Contents of the ounces text box
	
	err.style.visibility = "hidden";
	if(ptr.value == "") {
		err.style.visibility = "visible";
		err.title = "You must enter the number of ounces.";
	} else {
		input = FormatNumber(ptr.value, "G");  //Unformat it (remove commas
		input = parseInt(input);
		if(input<MINOZ || input>MAXOZ) {  
			err.style.visibility = "visible";
			err.title = "Ounces must be between " + MINOZ + " and " + MAXOZ;
		} //end if
	}//end if

	return err.style.visibility == "hidden";

}//end validateOunces

/*	This function ensure the user has entered a quantity.
	IntegerKeyPress ensures only digits are entered. Any value is allowed.
*/
function validateQuantity() {
	var ptr = $("numNumberOfItems"); 	//Pointer to number of items input field
	var err = $("errNumberOfItems");		//Pointer to error marker for number of items 
	var input;									//Contents of the number of items text box
	
	err.style.visibility = "hidden";
	if(ptr.value == "") {
		err.style.visibility = "visible";
		err.title = "You must enter the number of items";
	} else {
		input = FormatNumber(ptr.value, "G");  //Unformat it (remove commas
		input = parseInt(input);
		if(input<0) {  
			err.style.visibility = "visible";
			err.title = "Number of items must be at least 0.";
		} else {
			ptr.value = FormatNumber(input, "N0");
		} //end if
	}//end if

	return err.style.visibility == "hidden";

}//end validateQuantity

/*	This function ensures the date entered by the user is a valid date.
	If the date is valid, it is formatted in ISO-standard format.
*/
function validateSampleDate() {
		var patternForYyyyMmDd = /^\d{4}-\d{2}-\d{2}$/;   //Regular express for yyyy-mm-dd date format
		
		var ptr = $("dtpSampleDate");			//Pointer to the date input
		var err = $("errSampleDate");			//Pointer to the date error marker
		
		err.style.visibility = "hidden";
		if (ptr.value == "") {
			err.style.visibility = "visible";
			err.title = "Please enter a sample date.";
		} else {
			if (isDate(ptr.value)) {
				var enteredDate = ptr.value;
				//To simplify comparison, all dates should be strings in yyyy-mm-dd format
				if(!enteredDate.match(patternForYyyyMmDd)) {
					enteredDate = new Date(enteredDate).format("yyyy-mm-dd");
					ptr.value = enteredDate;  //reformat user entry
				}//end if
			} else {
				err.style.visibility = "visible";
				err.title = "That is not a recognizable date format.";
			
			}//end if
				
		}//else OK (date is option)
		
		return err.style.visibility == "hidden";
}//end validateSampleDate

/*	This function clears all the form error markers and resets the form fields.
*/
function resetForm() {
	
	//Hide all error markers
	var images = document.getElementsByTagName("img");
	for (var i=0; i<images.length; i++) {
	//for (var i in images) {
		if(images[i].id.indexOf("err")==0) 
			images[i].style.visibility = "hidden";	
	}//end for
	
	$("txtItemName").focus();
	
}//end resetForm

/*	This function accepts any number of parameters. Most are designated as conditions
	but they can also be flags. All parameters should evaluate to true/false. The
	function returns True if all the conditions are true, but does not short-circuit (quit when false is found)--
	all conditions are evaluated.
*/
function noShortCircuitAnd() {
  var result=true;

	for (var i=0; i<arguments.length; i++) 
		result = result && arguments[i];    //go through each argument and AND it with the previous
	
	return result;
}//noShortCircuitAnd
	 
/*	This function ensures all form fields are valid before submitting the form data.
*/
function validateForm() {
	if ( noShortCircuitAnd(
		validateItemName(), 
		validatePounds(), 
		validateOunces(), 
		validateQuantity(), 
		validateSampleDate()) ) {
		
		return true;   //Go ahead and submit form
	} else {
		alert("Please correct the designated errors and submit again.");
		return false;   //Cancel the form submit
	}//end if
}//end validateForm
	
/* This function places test values in all form fields.
*/
function initializeFieldValues() {
	$("txtItemName").value = "Ink Jet Printer";
	$("numItemWeightLb").value = 8;
	$("numItemWeightOz").value = 13;
	$("numNumberOfItems").value = 10;
	$("dtpSampleDate").value = "2012-01-23";
}//end initializeFieldValues