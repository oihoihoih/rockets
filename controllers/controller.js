"use strict";
var rocketsArray = [];
var rocket;
var thrusterNumber = [];
var formulario = document.getElementById('rocketForm');
var error;
// ADD OBJECTS
function createRocket(code, thrusterN) {
    event === null || event === void 0 ? void 0 : event.preventDefault();
    validateForms(code, thrusterN);
    if (!error) {
        rocket = new Rocket(code);
        rocketsArray.push(rocket);
        thrusterNumber.push(thrusterN);
        addRocketThrusters(thrusterN);
        printRocketList(code, thrusterN);
        formulario.reset();
    }
}
function addRocketThrusters(thrusterN) {
    for (var i = 1; i <= thrusterN; i++) {
        var power = prompt("Please add the power of thrusters");
        validateThrustersPower(power);
        if (!error) {
            var actualPower = 0;
            rocket.addThruster(new Thruster(power, actualPower));
        }
        else {
            i--;
        }
    }
}
// PRINT OBJECTS
function printRocketList(code, thrusterN) {
    var textSpace = document.getElementById('infoArea');
    var codeArray = [];
    var thrusterQuantity = [];
    var maxPowerArray = [];
    var actualPowerArray = [];
    var powerSum = [];
    var codeNameUI = document.getElementById('codeName');
    var thrusterNumberUI = document.getElementById('thrusterNumber');
    var thrusterPowerUI = document.getElementById('thrusterPower');
    var thrusterActualPowerUI = document.getElementById('thrusterActualPower');
    var totalPowerUI = document.getElementById('totalPower');
    textSpace.classList.remove('d-none');
    for (var i = 0; i < rocketsArray.length; i++) {
        codeArray.push(rocketsArray[i].code);
        thrusterQuantity.push(rocketsArray[i].thrusters.length);
        var tempMaxPowerArray = [];
        var tempActualPowerArray = [];
        var tempPowerSum = 0;
        for (var j = 0; j < rocketsArray[i].thrusters.length; j++) {
            tempMaxPowerArray.push(rocketsArray[i].thrusters[j].power);
            tempActualPowerArray.push(rocketsArray[i].thrusters[j].actualPower);
            tempPowerSum += rocketsArray[i].thrusters[j].actualPower;
        }
        maxPowerArray.push(tempMaxPowerArray);
        actualPowerArray.push(tempActualPowerArray);
        powerSum.push(tempPowerSum);
    }
    //Imprimir
    codeNameUI.innerHTML = codeArray.join('<br>');
    thrusterNumberUI.innerHTML = thrusterQuantity.join('<br>');
    thrusterPowerUI.innerHTML = maxPowerArray.join('<br>');
    thrusterActualPowerUI.innerHTML = actualPowerArray.join('<br>');
    totalPowerUI.innerHTML = powerSum.join('<br>');
}
// VALIDATE OBJECTS
function validateForms(code, thrusterN) {
    var codeId = document.getElementById('formCode');
    var thrusterId = document.getElementById('formThruster');
    error = false;
    if (code == "" || !validateCode(code)) {
        codeId.classList.add('is-invalid');
        error = true;
    }
    if (thrusterN == "") {
        thrusterId.classList.add('is-invalid');
        error = true;
    }
    return error;
}
formulario.addEventListener('blur', function (event) {
    if (event.target.value != '')
        event.target.classList.remove('is-invalid');
}, true);
function validateCode(code) {
    var codeRegEx = /^[0-9a-zA-Z]{8}$/;
    return codeRegEx.test(code) ? true : false;
}
function validateThrustersPower(power) {
    error = false;
    if (power % 10 != 0) {
        error = true;
        alert('the power of thruster has to be multiple of 10');
    }
}
// METHODS
function accelerate(action) {
    var index;
    var indice = searchIndex(index);
    var thrusters = rocketsArray[indice].thrusters;
    var maxPower = 0;
    if (action == 'accelerate') {
        for (var i = 0; i < thrusters.length; i++) {
            if (thrusters[i].actualPower < thrusters[i].power) {
                thrusters[i].actualPower += 10;
            }
            else {
                maxPower += 1;
            }
        }
        if (maxPower == thrusters.length) {
            alert('Thrusters have reached maximum power');
        }
    }
    if (action == 'decelerate') {
        for (var i = 0; i < thrusters.length; i++) {
            if (thrusters[i].actualPower > 0) {
                thrusters[i].actualPower -= 10;
            }
            else {
                maxPower += 1;
            }
        }
        if (maxPower == thrusters.length) {
            alert('Thrusters have reached minimum power');
        }
    }
    printRocketList();
}
function searchIndex(index) {
    var whichRocket = prompt('Insert de code of the rocket you want accelerate');
    var indice;
    for (var i = 0; i < rocketsArray.length; i++) {
        if (whichRocket == rocketsArray[i].code)
            indice = i;
        else
            alert('There is no rocket with this code, please try again');
    }
    return indice;
}
