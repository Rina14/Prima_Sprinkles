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
    Sprinkles.currentSpeed = 1;
    function init(_event) {
        const canvas = document.querySelector("canvas");
        // Cube zur Überprüfung, was außerhalb des Canvas liegt
        // branch.addComponent(new ƒ.ComponentTransform());
        // let mesh: ƒ.MeshCube = new ƒ.MeshCube("Cube");
        // branch.addComponent(new ƒ.ComponentMesh(mesh));
        // let material: ƒ.Material = new ƒ.Material("Cubey", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
        // let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
        // branch.addComponent(cmpMaterial);
        Sprinkles.branch.addChild(new Sprinkles.RoundSprinkle("Roundy1", 0, 0));
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(1.98);
        cmpCamera.mtxPivot.rotateY(180);
        cmpCamera.clrBackground.setHex("#22437d");
        // clrBackground: Color = new Color(0, 4, 1, 1);
        viewport.initialize("Viewport", Sprinkles.branch, cmpCamera, canvas);
        viewport.draw();
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 30);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
    }
    function update(_event) {
        viewport.draw();
    }
})(Sprinkles || (Sprinkles = {}));
var Sprinkles;
(function (Sprinkles) {
    var ƒ = FudgeCore;
    class Obstacle extends ƒ.Node {
        constructor(_name, _pos, _scale) {
            super(_name);
            this.obstacle = new ƒ.Rectangle(_pos.x, _pos.y, _scale.x, _scale.y, ƒ.ORIGIN2D.CENTER);
        }
    }
    // sprite anzeigen lassen -> show()? / Quad wird stattdessen genutzt, scheint einfacher
    Obstacle.mesh = new ƒ.MeshQuad("Column");
    Obstacle.material = new ƒ.Material("White", ƒ.ShaderUniColor, new ƒ.CoatColored());
    Sprinkles.Obstacle = Obstacle;
})(Sprinkles || (Sprinkles = {}));
var Sprinkles;
(function (Sprinkles) {
    var ƒ = FudgeCore;
    class Sprinkle extends ƒ.Node {
        constructor(_name, _x, _y) {
            super(_name);
            this.move = () => {
                let speed = this.speed * Sprinkles.currentSpeed * ƒ.Loop.timeFrameReal / 1000;
                //translation = translation + direction.scale(currentSpeed);
                this.mtxLocal.translate(new ƒ.Vector3(this.direction.x * speed, this.direction.y * speed, 0));
            };
            let direction = new ƒ.Vector2(Math.random() - 0.5, Math.random() - 0.5);
            direction.normalize();
            this.direction = direction;
            this.speed = Math.random() * 0.2 + 0.1;
            this.addComponent(new ƒ.ComponentTransform());
            // ƒ.MeshSprite
            let mesh = new ƒ.MeshQuad("Cube");
            let cmpMesh = new ƒ.ComponentMesh(mesh);
            cmpMesh.mtxPivot.scale(new ƒ.Vector3(0.2, 0.2, 0));
            this.addComponent(cmpMesh);
            let material = new ƒ.Material("Cubey", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
            let cmpMaterial = new ƒ.ComponentMaterial(material);
            this.addComponent(cmpMaterial);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.move);
        }
    }
    Sprinkles.Sprinkle = Sprinkle;
})(Sprinkles || (Sprinkles = {}));
/// <reference path="Sprinkle.ts" />
var Sprinkles;
/// <reference path="Sprinkle.ts" />
(function (Sprinkles) {
    class RoundSprinkle extends Sprinkles.Sprinkle {
        collideWith(obstacle) {
        }
        ;
    }
    Sprinkles.RoundSprinkle = RoundSprinkle;
})(Sprinkles || (Sprinkles = {}));
/// <reference path="Sprinkle.ts" />
var Sprinkles;
/// <reference path="Sprinkle.ts" />
(function (Sprinkles) {
    class SquareSprinkle extends Sprinkles.Sprinkle {
        collideWith(obstacle) {
        }
        ;
    }
    Sprinkles.SquareSprinkle = SquareSprinkle;
})(Sprinkles || (Sprinkles = {}));
//# sourceMappingURL=Sprinkles.js.map