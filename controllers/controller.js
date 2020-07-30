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
    var accelerateButton = [];
    var decelerateButton = [];
    var codeNameUI = document.getElementById('codeName');
    var thrusterNumberUI = document.getElementById('thrusterNumber');
    var thrusterPowerUI = document.getElementById('thrusterPower');
    var thrusterActualPowerUI = document.getElementById('thrusterActualPower');
    var totalPowerUI = document.getElementById('totalPower');
    var accelerateButtonUI = document.getElementById('accelerateButton');
    var decelerateButtonUI = document.getElementById('decelerateButton');
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
        var accelerate = "<button class=\"btn btn-success btn-sm btn-block\n        \" id=\"btn" + i + "\" onClick=\"toAccelerate('accelerate', " + i + ")\">Accelerate</button>";
        accelerateButton.push(accelerate);
        var decelerate = "<button class=\"btn btn-danger btn-sm btn-block\" id=\"btnDc" + i + "\" onClick=\"toAccelerate('decelerate', " + i + ")\">Decelerate</button>";
        decelerateButton.push(decelerate);
    }
    //Imprimir
    codeNameUI.innerHTML = codeArray.join('<br>');
    thrusterNumberUI.innerHTML = thrusterQuantity.join('<br>');
    thrusterPowerUI.innerHTML = maxPowerArray.join('<br>');
    thrusterActualPowerUI.innerHTML = actualPowerArray.join('<br>');
    totalPowerUI.innerHTML = powerSum.join('<br>');
    accelerateButtonUI.innerHTML = accelerateButton.join('');
    decelerateButtonUI.innerHTML = decelerateButton.join('');
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
function toAccelerate(action, index) {
    var thrusters = rocketsArray[index].thrusters;
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
