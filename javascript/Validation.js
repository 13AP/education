function ValidationCheck(){
    var radio = RadioValidation();
    if (!radio) alert("Check Yes or No");

    var checkbox = CheckboxValidation();
    if (!checkbox) alert("Check one or more of the boxes");

    var comboBox = ComboboxValidation();
    if (!comboBox) alert("Select a country");
};

// Validation for the Radio Buttons
function RadioValidation(){

    var radios = document.getElementsByName("yesno");
    var formValid = false;

    var i = 0;
    while (!formValid && i < radios.length) {
    if (radios[i].checked) formValid = true;
    i++;        
    }

    return formValid;
};

// Validation for the checkboxes
function CheckboxValidation(){
    var boxes = document.getElementsByName("boxes");
    var formValid = false;

    var i = 0;
    while (!formValid && i < boxes.length) {
    if (boxes[i].checked) formValid = true;
    i++;        
    }

    return formValid;
};

// Validation for the combobox
function ComboboxValidation(){
    const comboBox = document.getElementById("country");
    const selectedValue = comboBox.options[comboBox.selectedIndex].value;
    var formValid = true;

    if (selectedValue === "empty") {
    formValid = false;
    }

    return formValid;
};