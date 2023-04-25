//Version: 2011-11-17

//This function adds a toTitleCase method to the String class.

//To use this script in your page:
//	1. Include a reference to this file in the <head> tag
//     <script type="text/javascript" src="toTitleCase.js"></script>
//                                     (set the path as appropriate)
//
// Sample call:
//      document.writeln(txtName.toTitleCase());
var prepArray = ["and ",
                 "the ",
                 "for ",
                 "to ",
                 "in ",
                 "a ",
                 "at ",
                 "from ",
                 "by ",
                 "an ",
                 "or ",
                 "if ",
                 "of ",
                 "up "];

String.prototype.toTitleCase = function() {
   var str = this.toLowerCase();  //Convert original to lowercase
   var newStr = '';
   var l = str.length;
   
   for ( var i = 0; i < l; i++ ) {
      //  1st letter OR after a space, but not a preposition
      if( i == 0 || (str.charAt( i - 1 ) == ' ' && !IsPrep(str.substring(i))))
         newStr += str.charAt( i ).toUpperCase();
      else  
         newStr += str.charAt( i );
      //end if
   }
   return newStr;
} //toTitleCase

//This function determines if the string sent as parameter is in the array of prepositions.
function IsPrep(strP) {
   for(i=0;i<prepArray.length;i++){
      if(strP.indexOf(prepArray[i]) == 0){
         return true;
         break;
      }
   }//end for
   
   return false;
}//end IsPrep






