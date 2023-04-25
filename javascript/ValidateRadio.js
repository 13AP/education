function validateRadio() {
    var radios = document.getElementsByName("yesno");
    var formValid = false;

    var i = 0;
    while (!formValid && i < radios.length) {
        if (radios[i].checked) formValid = true;
        i++;        
    }

    if (!formValid) alert("Must check some option!");
    return formValid;
}​