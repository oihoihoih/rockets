var rocketsArray:any = [];
var rocket:Rocket;

var thrusterNumber:any = [];
let formulario:any = document.getElementById('rocketForm');
let error:boolean;


// ADD OBJECTS
function createRocket(code:any,thrusterN:any){
    event?.preventDefault();

    validateForms(code, thrusterN);

    if (!error){

        rocket=new Rocket(code);
        rocketsArray.push(rocket);
        thrusterNumber.push(thrusterN);

        addRocketThrusters(thrusterN);

        printRocketList(code, thrusterN);
        formulario.reset();
    }
}

function addRocketThrusters(thrusterN:any){
    for (let i=1; i<=thrusterN; i++){
        let power:any = prompt("Please add the power of thrusters");
        validateThrustersPower(power);
        if(!error){
            let actualPower = 0;
            rocket.addThruster(new Thruster(power, actualPower));
        } else {
            i--;
        }
    }
}



// PRINT OBJECTS
function printRocketList(code:any, thrusterN:any){
    let textSpace:any = document.getElementById('infoArea');

    let codeArray:any = [];
    let thrusterQuantity:any = [];
    let maxPowerArray:any = [];
    let actualPowerArray:any = [];
    let powerSum:any = [];

    let codeNameUI:any = document.getElementById('codeName');
    let thrusterNumberUI:any = document.getElementById('thrusterNumber');
    let thrusterPowerUI:any = document.getElementById('thrusterPower');
    let thrusterActualPowerUI:any = document.getElementById('thrusterActualPower');
    let totalPowerUI:any = document.getElementById('totalPower');

    textSpace.classList.remove('d-none');

    for (let i=0;  i<rocketsArray.length;  i++){
        codeArray.push(rocketsArray[i].code);
        thrusterQuantity.push(rocketsArray[i].thrusters.length);
        let tempMaxPowerArray:any = [];
        let tempActualPowerArray:any = [];
        let tempPowerSum:any = 0;
        for(let j=0;  j<rocketsArray[i].thrusters.length;  j++){
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
function validateForms(code:any, thrusterN:any){
    let codeId:any = document.getElementById('formCode');
    let thrusterId:any = document.getElementById('formThruster');
    error = false;

    if (code == "" || !validateCode(code)){
        codeId.classList.add('is-invalid');
        error = true;
    } 
    if (thrusterN == ""){
        thrusterId.classList.add('is-invalid');
        error = true;
    }

    return error;
}

formulario.addEventListener('blur', (event:any) => {
    if(event.target.value != '') event.target.classList.remove('is-invalid');
}, true);

function validateCode(code:any){
    let codeRegEx:any = /^[0-9a-zA-Z]{8}$/;
    return codeRegEx.test(code) ? true : false;
}

function validateThrustersPower(power:number){
    error = false;

    if (power%10 != 0){
        error = true;
        alert('the power of thruster has to be multiple of 10');
    }
}



// METHODS
function accelerate(action:any){
    let index;
    let indice = searchIndex(index);
    let thrusters=rocketsArray[indice].thrusters;
    let maxPower= 0;

    if (action == 'accelerate'){
        for(let i=0; i<thrusters.length;  i++){
            if(thrusters[i].actualPower < thrusters[i].power){
            thrusters[i].actualPower += 10;
            } else {
                maxPower += 1;
            }
        }
        if (maxPower == thrusters.length){
            alert('Thrusters have reached maximum power');
        }
    }

    if (action == 'decelerate'){
        for(let i=0; i<thrusters.length;  i++){
            if(thrusters[i].actualPower > 0){
            thrusters[i].actualPower -= 10;
            } else {
                maxPower += 1;
            }
        }
        if (maxPower == thrusters.length){
            alert ('Thrusters have reached minimum power');
        }
    }
    printRocketList();
   
}

function searchIndex(index:any){
    let whichRocket = prompt('Insert de code of the rocket you want accelerate');

    let indice:any;
    for (let i=0;  i <rocketsArray.length; i++){
        if (whichRocket == rocketsArray[i].code) indice = i;
        else alert('There is no rocket with this code, please try again');
    } 
    return indice;
}