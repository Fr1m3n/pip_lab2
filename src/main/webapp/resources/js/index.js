let r_group = document.getElementsByClassName("form-radio");

function getRValue() {
    return getRField().value;
}

function getXValue() {
    return getXField().value;
}

function getYValue() {
    return getYField().value;
}

function getXField() {
    return document.getElementById("form:x");
}

function getYField() {
    return document.getElementById("form:y");
}

function getRField() {
    return document.getElementById("form:r_input");
}
