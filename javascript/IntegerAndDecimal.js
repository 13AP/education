// usage
// <input id="MyTextBox1" onkeypress=' IntegerAndDecimal(event,this,true)' >

function IntegerAndDecimal(e,obj,isDecimal)
{
    if ([e.keyCode||e.which]==8) //this is to allow backspace
    return true;

    if ([e.keyCode||e.which]==46) //this is to allow decimal point
    {
      if(isDecimal=='true')
      {
        var val = obj.value;
        if(val.indexOf(".") > -1)
        {
            e.returnValue = false;
            return false;
        }
        return true;
      }
      else
      {
        e.returnValue = false;
        return false;
      }
    }

    if ([e.keyCode||e.which] < 48 || [e.keyCode||e.which] > 57)
    e.preventDefault? e.preventDefault() : e.returnValue = false; 
}

