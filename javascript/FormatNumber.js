//Version: 2011-11-17

//This script formats numbers (or strings of numbers) according to the calling program's
//specifications.

//The acceptable formatting codes are N, C, P, G.  These can be provided in either upper or lower case.
//		N:  Numbers.  Will include commas if appropriate
//      C:  Currency. Will include a $ and commas if appropriate
//      P:  Percent. Will include a % and commas if appropriate. If the original string doesn't include
//                   a %, the original value will be multiplied by 100 (.15 >> 15%,  10%>>10%)
//      G:  General. All special, non-numeric characters are removed and no formatting is applied.
//Additionally, the format code can include the number of decimal places, but this is optional.
//The number of decimal places value is ignored (if provided) for the G format.
//If the number of decimal places is not provided, 2 decimal places are used (except with "G").

//To include this script in your HTML, simply import it:
//    <script type="text/javascript" src="FormatNumber.js"></script>
//                                        (include path here)
//No other code need be included except a call to the FormatName. You shouldn't need to call AddCommas or
//RemoveSpecialCharacters directly, but you could.

//Sample calls:
//	el.Value = FormatNumber(value, "N");       //Formatted with commas and 2 decimal places
// el.innerHtml = FormatNumber(value, "p1");  //Formatted with a trailing % and 1 decimal place
//                                             //Note: formatting code is NOT case sensitive
//  value = FormatNumber("$1,234.25","G") * 1; //Removes the formatting from the first parameter ($ and commas)
//                                             //Note: multiplying by 1 converts the value to a number.

	function FormatNumber(orgNumber, format) {

		var orgString = "" + orgNumber;	    //Convert to a string if necessary
		var cleanString = "";		        //String with all but digits, -, . removed
		var formattedString = "";			//String formatted the way the user wants
		var value;							//Numeric version of the number
		
		var formatType;						//Type of format the user requested
		var digits;							//Number of digits

		//Determine format type
		formatType = format.charAt(0);
		formatType = formatType.toUpperCase();
		
		if(format.length==2)
			digits = format.charAt(1);
		else if (format.length==1)
			digits = 2;		//default digits
		else
			alert("Invalid format string");
		//endif
		
		cleanString = RemoveSpecialCharacters(orgString);
		value = parseFloat(cleanString);
		if (orgString.indexOf("%")!=-1) value= value / 100.0; //If %, convert % to decimal

		switch (formatType) {
			case "N":
			case "D":
			case "F": formattedString = AddCommas(value.toFixed(digits)); break;
			
			case "G": formattedString = cleanString; break;
			
			case "C": formattedString = "$" + AddCommas(value.toFixed(digits));  break;
			
			case "P": 
				value*=100;
				formattedString = AddCommas(value.toFixed(digits)) + "%";  
				break;
			
			default: alert("Invalid format character."); formattedString = orgString;
		}//end select
		
		return formattedString;
	}//end FormatNumber;
	
	//This function adds commas in the appropriate places of a number.
	function AddCommas(nStr)	{
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}//end while
		return x1 + x2;
	}//end AddCommas
   

	//This function removes any special characters ($ comma %) from a numeric string.
	function RemoveSpecialCharacters(org) {  //original string
		var removed = "";			//string with special characters removed
		var numericChars = "0123456789.";		//Numeric characters
		var oneChar;    						//One character removed from the string
		var start;                       //Where the for loop starts
      
      if (org.charAt(0)=="-") { //- only allowed at beginning of string
         removed = "-";
         start = 1;
      } else {
         start = 0;
      }//endif
		for(var c=start; c<org.length; c++) {
			oneChar = org.charAt(c);
			if (numericChars.indexOf(oneChar)>=0) removed=removed + oneChar;
		}//end for
		
		return removed;
	}//end RemoveSpecialCharacters 
   
   
   
   
   
   
   
   
   
   
	
	