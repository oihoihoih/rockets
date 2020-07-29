"use strict";
var Rocket = /** @class */ (function () {
    function Rocket(code) {
        this.thrusters = new Array();
        this.code = code;
    }
    Rocket.prototype.addThruster = function (thruster) {
        this.thrusters.push(thruster);
    };
    return Rocket;
}());
