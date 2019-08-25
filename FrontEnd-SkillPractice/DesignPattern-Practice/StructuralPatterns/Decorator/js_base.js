//装饰者模式

class MacBook {
    cost() {
        return 997;
    }
    screenSize() {
        return 11.6;
    }
}

// Decorator 1
// 加内存
function Memory(macbook) {

    let v = macbook.cost();
    macbook.cost = function () {
        return v + 75;
    };

}

// Decorator 2
// 加雕刻字画
function Engraving(macbook) {

    let v = macbook.cost();
    macbook.cost = function () {
        return v + 200;
    };

}

// Decorator 3
// 保险
function Insurance(macbook) {

    let v = macbook.cost();
    macbook.cost = function () {
        return v + 250;
    };

}

let mb = new MacBook();
Memory(mb);
Engraving(mb);
Insurance(mb);

// Outputs: 1522
console.log(mb.cost());
// Outputs: 11.6
console.log(mb.screenSize());


//=====================================================================


//装饰者模式

// A vehicle constructor
function vehicle(vehicleType) {

    // some sane defaults
    this.vehicleType = vehicleType || "car";
    this.model = "default";
    this.license = "00000‐000";

}

// Test instance for a basic vehicle
var testInstance = new vehicle("car");
console.log(testInstance);

// Outputs:
// vehicle: car, model:default, license: 00000‐000

// Lets create a new instance of vehicle, to be decorated
var truck = new vehicle("truck");

// New functionality we're decorating vehicle with
truck.setModel = function (modelName) {
    this.model = modelName;
};

truck.setColor = function (color) {
    this.color = color;
};

// Test the value setters and value assignment works correctly
truck.setModel("CAT");
truck.setColor("blue");

console.log(truck);

// Outputs:
// vehicle:truck, model:CAT, color: blue

// Demonstrate "vehicle" is still unaltered
var secondInstance = new vehicle("car");
console.log(secondInstance);

// Outputs:
// vehicle: car, model:default, license: 00000‐000
