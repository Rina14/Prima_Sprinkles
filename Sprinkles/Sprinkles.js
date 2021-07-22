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
    Sprinkles.squareSprinkle = new ƒ.Node("MeshSprinkle");
    Sprinkles.sprinkles = new ƒ.Node("Sprinkle");
    // export let roundSprinkle: ƒ.Node = new ƒ.Node("RoundSprinkle");
    // let squareSprinkle: ƒ.Node[] = [];
    function init(_event) {
        const canvas = document.querySelector("canvas");
        // Cube zur Überprüfung, was außerhalb des Canvas liegt
        // branch.addComponent(new ƒ.ComponentTransform());
        // let mesh: ƒ.MeshCube = new ƒ.MeshCube("Cube");
        // branch.addComponent(new ƒ.ComponentMesh(mesh));
        // let material: ƒ.Material = new ƒ.Material("Cubey", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
        // let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
        // branch.addComponent(cmpMaterial);
        // für level 1 Geschwindigkeit beachten
        // branch.addChild(new SquareSprinkle("Squarey", 0, 0));
        Sprinkles.branch.addChild(new Sprinkles.MeshSprinkle("Squarey", 0, 0));
        // generate 25 MeshSprinkles at once
        for (let i = 0; i < 25; i++) {
            let squaries = new Sprinkles.MeshSprinkle("MeshSprinkle", 0, 0);
            Sprinkles.branch.addChild(squaries);
        }
        // generate X KaroSprinkles at once
        for (let i = 0; i < 20; i++) {
            let karos = new Sprinkles.SpriteSprinkle("SpriteSprinkle", 0, 0);
            Sprinkles.branch.addChild(karos);
        }
        // generate X StarSprinkles at once
        // for (let i: number = 0; i < 25; i++) {
        //   let stars: StarSprinkle = new StarSprinkle("StarSprinkle", 0, 0);
        //   branch.addChild(stars);
        // }
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
            // let mesh: ƒ.MeshQuad = new ƒ.MeshQuad("Cube");
            // let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
            // cmpMesh.mtxPivot.scale(new ƒ.Vector3(0.05, 0.05, 0));
            // this.addComponent(cmpMesh);
            // let material: ƒ.Material = new ƒ.Material("Cubey", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
            // let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
            // this.addComponent(cmpMaterial);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.move);
        }
        static generateTextureFromId(textureId) {
            let coatTextured = new ƒ.CoatTextured();
            let img = document.querySelector(textureId);
            let textureImage = new ƒ.TextureImage();
            textureImage.image = img;
            coatTextured.texture = textureImage;
            return coatTextured;
        }
    }
    Sprinkles.Sprinkle = Sprinkle;
})(Sprinkles || (Sprinkles = {}));
/// <reference path="Sprinkle.ts" />
var Sprinkles;
/// <reference path="Sprinkle.ts" />
(function (Sprinkles) {
    var ƒ = FudgeCore;
    class MeshSprinkle extends Sprinkles.Sprinkle {
        constructor(_name, _x, _y) {
            super(_name, _x, _y);
            let mesh = new ƒ.MeshQuad("Cube");
            let cmpMesh = new ƒ.ComponentMesh(mesh);
            cmpMesh.mtxPivot.scale(new ƒ.Vector3(0.05, 0.05, 0));
            this.addComponent(cmpMesh);
            let material = new ƒ.Material("Cubey", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
            let cmpMaterial = new ƒ.ComponentMaterial(material);
            this.addComponent(cmpMaterial);
        }
        collideWith(obstacle) {
            throw new Error("Method not implemented.");
        }
    }
    Sprinkles.MeshSprinkle = MeshSprinkle;
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
    var ƒ = FudgeCore;
    class SpriteSprinkle extends Sprinkles.Sprinkle {
        constructor(_name, _x, _y) {
            super(_name, _x, _y);
            // ƒ.MeshSprite for Karo Try
            let karo = new ƒ.MeshSprite("Karo");
            let textureKaro = new ƒ.ComponentMesh(karo);
            textureKaro.mtxPivot.scale(new ƒ.Vector3(0.05, 0.05, 0));
            this.addComponent(textureKaro);
            let coatTextured = SpriteSprinkle.generateTextureFromId("KaroBU");
            // let texture: ƒ.Texture = new ƒ.Texture("KaroBlueMaterial");
            let material = new ƒ.Material("KaroBlueMaterial", ƒ.ShaderTexture, coatTextured);
            let cmpMaterial = new ƒ.ComponentMaterial(material);
            this.addComponent(cmpMaterial);
        }
        collideWith(obstacle) {
            throw new Error("Method not implemented.");
        }
    }
    Sprinkles.SpriteSprinkle = SpriteSprinkle;
})(Sprinkles || (Sprinkles = {}));
//# sourceMappingURL=Sprinkles.js.map