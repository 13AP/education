//Version: 2011-11-17

//This function checks to see if a string is a valid date.

//Sample call:
//    if(isDate(userInput))

//The table below the function lists which formats are recognized by the browsers.
function isDate(strDate) {
	aDate = new Date(strDate);   //Try to convert to Date class
	
	return aDate!="NaN" && aDate!="Invalid Date";
	//      errors that may occur
}
	
// Format					IE9*		FF8		Chrome15		Opera11    *(compatibility off)
// 2011-11-15				Yes		Yes		Yes			Yes
// ------------------------------------------------------
// 11-15-2011				Yes		No			Yes			No
// ------------------------------------------------------
// 11/15/2011				Yes		Yes		Yes			Yes
// ------------------------------------------------------
// 2011/11/15				Yes		Yes		Yes			Yes
// ------------------------------------------------------
// November 15, 2011		Yes		Yes		Yes			Yes
// ------------------------------------------------------
// Nov 15, 2011			Yes		Yes		Yes			Yes
// ------------------------------------------------------
// 15 Nov 2011				Yes		Yes		Yes			Yes
// ------------------------------------------------------
// 2011-1-1					No			No			Yes			No		(single digit day or month)
// ------------------------------------------------------
// 1-1-2011					Yes		No			Yes			No		(single digit day or month)
// ------------------------------------------------------
// 1/1/2011					Yes		Yes		Yes			Yes	(single digit day or month)
// ------------------------------------------------------
// 2011/1/1					Yes		Yes		Yes			Yes	(single digit day or month)
// ------------------------------------------------------

			