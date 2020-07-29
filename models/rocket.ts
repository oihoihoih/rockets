class Rocket{
    code:any;
    thrusters:Thruster[]=new Array();

    constructor(code:any){
        this.code=code;
    }

    addThruster(thruster:Thruster){
        this.thrusters.push(thruster);
    }
}

