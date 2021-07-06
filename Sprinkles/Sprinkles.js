"use strict";
var Sprinkles;
(function (Sprinkles) {
    class SprinkleDefinition {
        constructor(_amount, _speed1, _speed2, _speed3, _amountLevelChange1, _amountLevelChange2) {
            this.amount = _amount;
            this.speed1 = _speed1;
            this.speed2 = _speed2;
            this.speed3 = _speed3;
            this.amountLevelChange1 = _amountLevelChange1;
            this.amountLevelChange2 = _amountLevelChange2;
        }
    }
    Sprinkles.SprinkleDefinition = SprinkleDefinition;
})(Sprinkles || (Sprinkles = {}));
///<reference path="SprinkleDefinition.ts"/>
var Sprinkles;
///<reference path="SprinkleDefinition.ts"/>
(function (Sprinkles) {
    window.addEventListener("load", init);
    async function init() {
        //let sprinkleDef: SprinkleDefinition = new SprinkleDefinition(10, 1, 1.2, 1.5, 20, 50);  
        //let json: string = JSON.stringify(sprinkleDef, null, 2);
        const fetchPromise = fetch("data.json");
        let json = await fetchPromise.then(response => {
            return response.json();
        });
        let sprinkleDefFromFile = new Sprinkles.SprinkleDefinition(json.amount, json.speed1, json.speed2, json.speed3, json.amountLevelChange1, json.amountLevelChange2);
        console.log(json);
        console.log(sprinkleDefFromFile);
    }
})(Sprinkles || (Sprinkles = {}));
//# sourceMappingURL=Sprinkles.js.map