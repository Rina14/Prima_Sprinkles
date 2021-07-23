"use strict";
var Sprinkles;
(function (Sprinkles) {
    var ƒ = FudgeCore;
    class Sprinkle extends ƒ.Node {
        constructor(_name) {
            super(_name);
            this.move = () => {
                let speed = this.speed * Sprinkles.levels[Sprinkles.currentLevel].speed * ƒ.Loop.timeFrameReal / 1000;
                this.mtxLocal.translate(new ƒ.Vector3(this.direction.x * speed, this.direction.y * speed, 0));
                let clientCoordinates = Sprinkles.viewport.pointWorldToClient(this.mtxLocal.translation);
                if (!Sprinkles.clientRectangle.isInside(clientCoordinates)) {
                    this.remove();
                }
                for (let pillar of Sprinkles.branch.getChildrenByName("Pillar")[0].getChildren()) {
                    this.collideWith(pillar);
                }
            };
            let direction = new ƒ.Vector2(Math.random() - 0.5, Math.random() - 0.5);
            //  für zufällige Spawnposition
            let x = (Math.random() - 0.5) / 4;
            let y = (Math.random() - 0.5) / 4;
            direction.normalize();
            this.direction = direction;
            this.speed = Math.random() * 0.2 + 0.1;
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateX(x);
            this.mtxLocal.translateY(y);
            ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.move);
        }
        remove() {
            Sprinkles.sprinkles.removeChild(this);
            ƒ.Loop.removeEventListener("loopFrame" /* LOOP_FRAME */, this.move);
            this.respawn();
        }
        // Collider
        collideWith(pillar) {
            let rectangle = new ƒ.Rectangle(this.mtxLocal.translation.x, this.mtxLocal.translation.y, this.getComponent(ƒ.ComponentMesh).mtxPivot.scaling.x, this.getComponent(ƒ.ComponentMesh).mtxPivot.scaling.y);
            if (pillar.rectangle.collides(rectangle)) {
                let pillarOrientation;
                if (Math.abs(this.direction.x) > Math.abs(this.direction.y)) {
                    if (this.direction.y > 0) {
                        pillarOrientation = new ƒ.Vector3(1, 0, 0);
                    }
                    else {
                        pillarOrientation = new ƒ.Vector3(-1, 0, 0);
                    }
                }
                else {
                    if (this.direction.x > 0) {
                        pillarOrientation = new ƒ.Vector3(0, 1, 0);
                    }
                    else {
                        pillarOrientation = new ƒ.Vector3(0, -1, 0);
                    }
                }
                // Winkelberechnung zwischen zwei Vektoren
                let newDirection = this.direction.toVector3();
                newDirection.reflect(pillarOrientation);
                this.direction = new ƒ.Vector2(newDirection.x, newDirection.y);
            }
        }
    }
    Sprinkles.Sprinkle = Sprinkle;
})(Sprinkles || (Sprinkles = {}));
/// <reference path="Sprinkle.ts" />
var Sprinkles;
/// <reference path="Sprinkle.ts" />
(function (Sprinkles) {
    var ƒ = FudgeCore;
    class Balloon extends ƒ.Node {
        constructor(_name) {
            super(_name);
            this.counter = 0;
            let balloon = new ƒ.MeshSprite("Balloon");
            let textureBalloon = new ƒ.ComponentMesh(balloon);
            // textureBalloon.mtxPivot.scale(new ƒ.Vector3(1, 1, 0));
            this.addComponent(textureBalloon);
            let coatTextured = Sprinkles.Stuff.generateTextureFromId("BalloonSmall");
            let material = new ƒ.Material("BalloonMaterial", ƒ.ShaderTexture, coatTextured);
            let cmpMaterial = new ƒ.ComponentMaterial(material);
            this.addComponent(cmpMaterial);
            this.addComponent(new ƒ.ComponentTransform());
        }
        // Wenn Zeit ist, jeden neuen Zustand in einen Array und ausgeben lassen, je nach Counter, Element holen, Counter/2 als Index benutzen
        clickedOn() {
            this.counter++;
            switch (this.counter) {
                case 2:
                    this.getComponent(ƒ.ComponentMesh).mtxPivot.scale(new ƒ.Vector3(1.2, 1.2, 0));
                    let coatTexturedBalloonMedium = Sprinkles.Stuff.generateTextureFromId("BalloonMedium");
                    let materialBalloonMedium = new ƒ.Material("BalloonMediumMaterial", ƒ.ShaderTexture, coatTexturedBalloonMedium);
                    this.getComponent(ƒ.ComponentMaterial).material = materialBalloonMedium;
                    break;
                case 4:
                    this.getComponent(ƒ.ComponentMesh).mtxPivot.scale(new ƒ.Vector3(1.2, 1.2, 0));
                    let coatTexturedBalloonBig = Sprinkles.Stuff.generateTextureFromId("BalloonBig");
                    let materialBalloonBig = new ƒ.Material("BalloonBigMaterial", ƒ.ShaderTexture, coatTexturedBalloonBig);
                    this.getComponent(ƒ.ComponentMaterial).material = materialBalloonBig;
                    break;
                case 6:
                    Sprinkles.branch.removeChild(this);
                    return true;
            }
            return false;
        }
    }
    Sprinkles.Balloon = Balloon;
})(Sprinkles || (Sprinkles = {}));
var Sprinkles;
(function (Sprinkles) {
    var ƒ = FudgeCore;
    window.addEventListener("load", init);
    Sprinkles.branch = new ƒ.Node("Graph");
    Sprinkles.viewport = new ƒ.Viewport();
    Sprinkles.currentSpeed = 1;
    Sprinkles.squareSprinkle = new ƒ.Node("MeshSprinkle");
    Sprinkles.sprinkles = new ƒ.Node("Sprinkle");
    Sprinkles.currentLevel = 0;
    let score = 0;
    let timer = 300;
    let sounds = new Map();
    async function init(_event) {
        const canvas = document.querySelector("canvas");
        // for different levels
        Sprinkles.levels = (await loadFromJson("SprinkleDefFromFile.json")).level;
        // for background theme
        let backgroundTheme = new ƒ.Audio("Audio/MoarBGM.mp3");
        let backgroundThemeCmp = new ƒ.ComponentAudio(backgroundTheme, true);
        backgroundThemeCmp.connect(true);
        sounds.set("BGM", backgroundThemeCmp);
        backgroundThemeCmp.play(true);
        backgroundThemeCmp.volume = 0.2;
        //  for sound
        let sprinkleSound = new ƒ.Audio("Audio/cutie.mp3");
        let sprinkleSoundCmp = new ƒ.ComponentAudio(sprinkleSound);
        sprinkleSoundCmp.connect(true);
        sounds.set("cutie", sprinkleSoundCmp);
        sprinkleSoundCmp.volume = 1;
        Sprinkles.branch.addChild(new Sprinkles.Balloon("Balloon"));
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(1.98);
        cmpCamera.mtxPivot.rotateY(180);
        cmpCamera.clrBackground.setHex("#22437d");
        Sprinkles.viewport.initialize("Viewport", Sprinkles.branch, cmpCamera, canvas);
        Sprinkles.viewport.draw();
        Sprinkles.viewport.addEventListener("\u0192pointerdown" /* DOWN */, balloonOnClick);
        Sprinkles.viewport.activatePointerEvent("\u0192pointerdown" /* DOWN */, true);
        Sprinkles.clientRectangle = Sprinkles.viewport.getClientRectangle();
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 30);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
    }
    function update(_event) {
        Sprinkles.viewport.draw();
    }
    function balloonOnClick(_event) {
        let picks = ƒ.Picker.pickViewport(Sprinkles.viewport, new ƒ.Vector2(_event.canvasX, _event.canvasY));
        for (let pick of picks) {
            if (pick.node instanceof Sprinkles.Balloon) {
                if (pick.node.clickedOn()) {
                    initializeScene();
                    Sprinkles.viewport.removeEventListener("\u0192pointerdown" /* DOWN */, balloonOnClick);
                }
            }
        }
    }
    function onClick(_event) {
        let picks = ƒ.Picker.pickViewport(Sprinkles.viewport, new ƒ.Vector2(_event.canvasX, _event.canvasY));
        for (let pick of picks) {
            if (pick.node instanceof Sprinkles.Sprinkle) {
                pick.node.remove();
                if (Sprinkles.levels[Sprinkles.currentLevel].typesToCollect.includes(pick.node.type)) {
                    addScore(1);
                }
                else {
                    addScore(-1);
                }
                sounds.get("cutie").play(true);
            }
        }
        let previousScore = 0;
        for (let i = 0; i < Sprinkles.currentLevel; i++) {
            previousScore += Sprinkles.levels[i].amount;
        }
        if (score - previousScore >= Sprinkles.levels[Sprinkles.currentLevel].amount) {
            if (Sprinkles.currentLevel < Sprinkles.levels.length - 1) {
                Sprinkles.currentLevel++;
                showNewTaskMessage();
            }
            else {
                Sprinkles.viewport.activatePointerEvent("\u0192pointerdown" /* DOWN */, false);
                let finalMessage;
                if (timer > 180) {
                    finalMessage = "You've done great! Here's a flower *gives flower*";
                }
                else {
                    finalMessage = "Well done but you can do better.";
                }
                showNewTaskMessage(finalMessage);
            }
        }
    }
    function showNewTaskMessage(_message = Sprinkles.levels[Sprinkles.currentLevel].task) {
        let taskDiv = document.getElementById("task");
        taskDiv.innerHTML = _message;
    }
    function addScore(_amount) {
        score += _amount;
        document.getElementById("score").innerHTML = "Score: " + score;
    }
    function decrementTime(_event) {
        timer--;
        let timerInSeconds = timer % 60;
        let timerInMinutes = Math.floor(timer / 60);
        document.getElementById("time").innerHTML = "Time: 0" + timerInMinutes + ":" + (timerInSeconds < 10 ? "0" + timerInSeconds : timerInSeconds);
        if (timer < 1) {
            Sprinkles.viewport.activatePointerEvent("\u0192pointerdown" /* DOWN */, false);
        }
    }
    function initializeScene() {
        Sprinkles.branch.addChild(Sprinkles.sprinkles);
        new ƒ.Timer(new ƒ.Time(), 1000, timer, decrementTime);
        let taskDiv = document.getElementById("task");
        taskDiv.style.display = "block";
        showNewTaskMessage();
        // generate 25 MeshSprinkles at once
        for (let i = 0; i < 15; i++) {
            let squaries = new Sprinkles.MeshSprinkle("MeshSprinkle");
            Sprinkles.sprinkles.addChild(squaries);
        }
        // generate 20 random SpriteSprinkles at once
        for (let i = 0; i < 20; i++) {
            let spriteSprinkles = new Sprinkles.SpriteSprinkle("SpriteSprinkle");
            Sprinkles.sprinkles.addChild(spriteSprinkles);
        }
        let pillar = new ƒ.Node("Pillar");
        Sprinkles.branch.addChild(pillar);
        // Säulen 
        pillar.addChild(new Sprinkles.Pillar("PillarRight", new ƒ.Vector2(0.5, 0), new ƒ.Vector2(0.05, 0.1)));
        pillar.addChild(new Sprinkles.Pillar("PillarLeft", new ƒ.Vector2(-0.5, 0), new ƒ.Vector2(0.05, 0.1)));
        pillar.addChild(new Sprinkles.Pillar("PillarBottom", new ƒ.Vector2(0, -0.5), new ƒ.Vector2(0.1, 0.05)));
        pillar.addChild(new Sprinkles.Pillar("PillarUp", new ƒ.Vector2(0, 0.5), new ƒ.Vector2(0.1, 0.05)));
        Sprinkles.viewport.addEventListener("\u0192pointerdown" /* DOWN */, onClick);
    }
    async function loadFromJson(_file) {
        const fetchPromise = fetch(_file);
        let json = await fetchPromise.then(response => {
            return response.json();
        });
        return json;
    }
})(Sprinkles || (Sprinkles = {}));
/// <reference path="Sprinkle.ts" />
var Sprinkles;
/// <reference path="Sprinkle.ts" />
(function (Sprinkles) {
    var ƒ = FudgeCore;
    class MeshSprinkle extends Sprinkles.Sprinkle {
        constructor(_name) {
            super(_name);
            let mesh = new ƒ.MeshQuad("Cube");
            let cmpMesh = new ƒ.ComponentMesh(mesh);
            cmpMesh.mtxPivot.scale(new ƒ.Vector3(0.03, 0.03, 0));
            this.addComponent(cmpMesh);
            let material = new ƒ.Material("Cubey", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 0.9, 0.7, 1)));
            let cmpMaterial = new ƒ.ComponentMaterial(material);
            this.addComponent(cmpMaterial);
            this.type = Sprinkles.TYPES.ORANGE;
        }
        respawn() {
            Sprinkles.sprinkles.addChild(new MeshSprinkle("Cube"));
        }
    }
    Sprinkles.MeshSprinkle = MeshSprinkle;
})(Sprinkles || (Sprinkles = {}));
/// <reference path="Sprinkle.ts" />
var Sprinkles;
/// <reference path="Sprinkle.ts" />
(function (Sprinkles) {
    var ƒ = FudgeCore;
    class Pillar extends ƒ.Node {
        constructor(_name, _pos, _size) {
            super(_name);
            let mesh = new ƒ.MeshQuad("Cube");
            let cmpMesh = new ƒ.ComponentMesh(mesh);
            cmpMesh.mtxPivot.scale(_size.toVector3());
            this.addComponent(cmpMesh);
            this.rectangle = new ƒ.Rectangle(_pos.x, _pos.y, _size.x, _size.y);
            let material = new ƒ.Material("Cubey", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0.5, 0.1, 1, 1)));
            let cmpMaterial = new ƒ.ComponentMaterial(material);
            this.addComponent(cmpMaterial);
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translation = _pos.toVector3();
        }
    }
    Sprinkles.Pillar = Pillar;
})(Sprinkles || (Sprinkles = {}));
var Sprinkles;
(function (Sprinkles) {
    let TYPES;
    (function (TYPES) {
        TYPES["ORANGE"] = "orange";
        TYPES["RED"] = "red";
        TYPES["BLUE"] = "blue";
        TYPES["GREEN"] = "green";
    })(TYPES = Sprinkles.TYPES || (Sprinkles.TYPES = {}));
})(Sprinkles || (Sprinkles = {}));
/// <reference path="Sprinkle.ts" />
/// <reference path="Types.ts" />
var Sprinkles;
/// <reference path="Sprinkle.ts" />
/// <reference path="Types.ts" />
(function (Sprinkles) {
    var ƒ = FudgeCore;
    class SpriteSprinkle extends Sprinkles.Sprinkle {
        constructor(_name, _textureId = null) {
            super(_name);
            let textureId = _textureId;
            if (!textureId) {
                // for random generation
                let index = Math.floor(Math.random() * SpriteSprinkle.textureIds.length);
                textureId = SpriteSprinkle.textureIds[index];
                //  for mapping
                this.type = SpriteSprinkle.textureToType.get(textureId);
            }
            let meshSprite = new ƒ.MeshSprite("SpriteSprinkle");
            let textureSprinkles = new ƒ.ComponentMesh(meshSprite);
            textureSprinkles.mtxPivot.scale(new ƒ.Vector3(0.05, 0.05, 0));
            this.addComponent(textureSprinkles);
            let coatTextured = Sprinkles.Stuff.generateTextureFromId(textureId);
            let material = new ƒ.Material("SpriteSprinkleMaterial", ƒ.ShaderTexture, coatTextured);
            let cmpMaterial = new ƒ.ComponentMaterial(material);
            this.addComponent(cmpMaterial);
        }
        respawn() {
            Sprinkles.sprinkles.addChild(new SpriteSprinkle("SpriteSprinkles"));
        }
    }
    SpriteSprinkle.textureIds = ["KaroBU", "KaroGN", "KaroRD", "BallBU", "BallGN", "BallRD", "StarBU", "StarGN", "StarRD"];
    SpriteSprinkle.textureToType = new Map([["KaroBU", Sprinkles.TYPES.BLUE], ["KaroGN", Sprinkles.TYPES.GREEN], ["KaroRD", Sprinkles.TYPES.RED], ["BallBU", Sprinkles.TYPES.BLUE], ["BallGN", Sprinkles.TYPES.GREEN], ["BallRD", Sprinkles.TYPES.RED], ["StarBU", Sprinkles.TYPES.BLUE], ["StarGN", Sprinkles.TYPES.GREEN], ["StarRD", Sprinkles.TYPES.RED]]);
    Sprinkles.SpriteSprinkle = SpriteSprinkle;
})(Sprinkles || (Sprinkles = {}));
var Sprinkles;
(function (Sprinkles) {
    var ƒ = FudgeCore;
    class Stuff {
        // Texture ID wird Mesh zugewiesen
        static generateTextureFromId(textureId) {
            let coatTextured = new ƒ.CoatTextured();
            let img = document.querySelector("#" + textureId);
            let textureImage = new ƒ.TextureImage();
            textureImage.image = img;
            coatTextured.texture = textureImage;
            return coatTextured;
        }
    }
    Sprinkles.Stuff = Stuff;
})(Sprinkles || (Sprinkles = {}));
//# sourceMappingURL=Sprinkles.js.map