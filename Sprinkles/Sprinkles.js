"use strict";
var Sprinkles;
(function (Sprinkles) {
    class ExternalProperties {
    }
    Sprinkles.ExternalProperties = ExternalProperties;
})(Sprinkles || (Sprinkles = {}));
///<reference path="ExternalProperties.ts"/>
var Sprinkles;
///<reference path="ExternalProperties.ts"/>
(function (Sprinkles) {
    window.addEventListener("load", init);
    async function init() {
        //let sprinkleDef: SprinkleDefinition = new SprinkleDefinition(10, 1, 1.2, 1.5, 20, 50);  
        //let json: string = JSON.stringify(sprinkleDef, null, 2);
        const fetchPromise = fetch("SprinkleDefFromFile.json");
        Sprinkles.externalProperties = await fetchPromise.then(response => {
            return response.json();
        });
        // let sprinkleDefFromFile: SprinkleDefinition = new SprinkleDefinition(json.amount, json.speed1, json.speed2, json.speed3, json.amountLevelChange1, json.amountLevelChange2, json.amountLevelChange3);
        console.log(Sprinkles.externalProperties);
        // console.log(sprinkleDefFromFile);
    }
})(Sprinkles || (Sprinkles = {}));
var Sprinkles;
(function (Sprinkles) {
    var ƒ = FudgeCore;
    window.addEventListener("load", init);
    Sprinkles.branch = new ƒ.Node("Graph");
    let viewport = new ƒ.Viewport();
    function init(_event) {
        const canvas = document.querySelector("canvas");
        // Cube zur Überprüfung, was außerhalb des Canvas liegt
        // branch.addComponent(new ƒ.ComponentTransform());
        // let mesh: ƒ.MeshCube = new ƒ.MeshCube("Cube");
        // branch.addComponent(new ƒ.ComponentMesh(mesh));
        // let material: ƒ.Material = new ƒ.Material("Cubey", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
        // let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
        // branch.addComponent(cmpMaterial);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(1.98);
        cmpCamera.mtxPivot.rotateY(180);
        cmpCamera.clrBackground.setHex("#22437d");
        // clrBackground: Color = new Color(0, 4, 1, 1);
        viewport.initialize("Viewport", Sprinkles.branch, cmpCamera, canvas);
        viewport.draw();
    }
})(Sprinkles || (Sprinkles = {}));
// namespace Sprinkles {
//   import ƒ = FudgeCore;
//   export class RoundSprinkle extends Sprinkle {
//   }
// }
var Sprinkles;
(function (Sprinkles) {
    class Sprinkle {
    }
    Sprinkles.Sprinkle = Sprinkle;
})(Sprinkles || (Sprinkles = {}));
//# sourceMappingURL=Sprinkles.js.map