namespace Sprinkles {
  import ƒ = FudgeCore;
  window.addEventListener("load", init);
  export let branch: ƒ.Node = new ƒ.Node("Graph");
  export let viewport: ƒ.Viewport = new ƒ.Viewport();
  export let currentSpeed: number = 1;
  export let squareSprinkle: ƒ.Node = new ƒ.Node("MeshSprinkle");
  export let sprinkles: ƒ.Node = new ƒ.Node("Sprinkle");
  export let clientRectangle: ƒ.Rectangle;
  export let levels: [{ speed: number, amount: number, typesToCollect: string[], task: string }, { speed: number, amount: number, typesToCollect: string[], task: string }, { speed: number, amount: number, typesToCollect: string[], task: string }];
  export let currentLevel: number = 0;
  let score: number = 0;
  let timer: number = 300;
  let sounds: Map<string, ƒ.ComponentAudio> = new Map();




  async function init(_event: Event): Promise<void> {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");

    // for different levels
    levels = (await loadFromJson("SprinkleDefFromFile.json")).level;

    // for background theme
    let backgroundTheme: ƒ.Audio = new ƒ.Audio("Audio/MoarBGM.mp3");
    let backgroundThemeCmp: ƒ.ComponentAudio = new ƒ.ComponentAudio(backgroundTheme, true);
    backgroundThemeCmp.connect(true);
    sounds.set("BGM", backgroundThemeCmp);
    backgroundThemeCmp.play(true);
    backgroundThemeCmp.volume = 0.2;

    //  for sound
    let sprinkleSound: ƒ.Audio = new ƒ.Audio("Audio/cutie.mp3");
    let sprinkleSoundCmp: ƒ.ComponentAudio = new ƒ.ComponentAudio(sprinkleSound);
    sprinkleSoundCmp.connect(true);
    sounds.set("cutie", sprinkleSoundCmp);
    sprinkleSoundCmp.volume = 1;


    branch.addChild(new Balloon("Balloon"));


    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.mtxPivot.translateZ(1.98);
    cmpCamera.mtxPivot.rotateY(180);
    cmpCamera.clrBackground.setHex("#22437d");

    viewport.initialize("Viewport", branch, cmpCamera, canvas);
    viewport.draw();
    viewport.addEventListener(ƒ.EVENT_POINTER.DOWN, balloonOnClick);
    viewport.activatePointerEvent(ƒ.EVENT_POINTER.DOWN, true);

    clientRectangle = viewport.getClientRectangle();

    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 30);
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
  }

  function update(_event: Event): void {
    viewport.draw();
  }

  function balloonOnClick(_event: ƒ.EventPointer): void {
    let picks: ƒ.Pick[] = ƒ.Picker.pickViewport(viewport, new ƒ.Vector2(_event.canvasX, _event.canvasY));
    for (let pick of picks) {
      if (pick.node instanceof Balloon) {
        if (pick.node.clickedOn()) {
          initializeScene();
          viewport.removeEventListener(ƒ.EVENT_POINTER.DOWN, balloonOnClick);
        }
      }
    }
  }

  function onClick(_event: ƒ.EventPointer): void {
    let picks: ƒ.Pick[] = ƒ.Picker.pickViewport(viewport, new ƒ.Vector2(_event.canvasX, _event.canvasY));
    for (let pick of picks) {
      if (pick.node instanceof Sprinkle) {
        pick.node.remove();
        if (levels[currentLevel].typesToCollect.includes(pick.node.type)) {
          addScore(1);
        } else {
          addScore(-1);
        }
        sounds.get("cutie").play(true);
      }
    }
    let previousScore: number = 0;
    for (let i: number = 0; i < currentLevel; i++) {
      previousScore += levels[i].amount;
    }
    if (score - previousScore >= levels[currentLevel].amount) {
      if (currentLevel < levels.length - 1) {
        currentLevel++;
        showNewTaskMessage();
      } else {
        viewport.activatePointerEvent(ƒ.EVENT_POINTER.DOWN, false);
        let finalMessage: string;
        if (timer > 180) {
          finalMessage = "You've done great! Here's a flower *gives flower*";
        } else {
          finalMessage = "Well done but you can do better.";
        }
        showNewTaskMessage(finalMessage);
      }
    }
  }


  function showNewTaskMessage(_message: string = levels[currentLevel].task): void {
    let taskDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("task");
    taskDiv.innerHTML = _message;
  }


  function addScore(_amount: number): void {
    score += _amount;
    document.getElementById("score").innerHTML = "Score: " + score;
  }

  function decrementTime(_event: ƒ.EventTimer): void {
    timer--;
    let timerInSeconds: number = timer % 60;
    let timerInMinutes: number = Math.floor(timer / 60);
    document.getElementById("time").innerHTML = "Time: 0" + timerInMinutes + ":" + (timerInSeconds < 10 ? "0" + timerInSeconds : timerInSeconds);
    if (timer < 1) {
      viewport.activatePointerEvent(ƒ.EVENT_POINTER.DOWN, false);
    }
  }

  function initializeScene(): void {
    branch.addChild(sprinkles);
    new ƒ.Timer(new ƒ.Time(), 1000, timer, decrementTime);
    let taskDiv: HTMLDivElement = <HTMLDivElement>document.getElementById("task");
    taskDiv.style.display = "block";
    showNewTaskMessage();

    // generate 25 MeshSprinkles at once
    for (let i: number = 0; i < 15; i++) {
      let squaries: MeshSprinkle = new MeshSprinkle("MeshSprinkle");
      sprinkles.addChild(squaries);
    }

    // generate 20 random SpriteSprinkles at once
    for (let i: number = 0; i < 20; i++) {
      let spriteSprinkles: SpriteSprinkle = new SpriteSprinkle("SpriteSprinkle");
      sprinkles.addChild(spriteSprinkles);
    }

    let pillar: ƒ.Node = new ƒ.Node("Pillar");
    branch.addChild(pillar);


    // Säulen 
    pillar.addChild(new Pillar("PillarRight", new ƒ.Vector2(0.5, 0), new ƒ.Vector2(0.05, 0.1)));
    pillar.addChild(new Pillar("PillarLeft", new ƒ.Vector2(-0.5, 0), new ƒ.Vector2(0.05, 0.1)));
    pillar.addChild(new Pillar("PillarBottom", new ƒ.Vector2(0, -0.5), new ƒ.Vector2(0.1, 0.05)));
    pillar.addChild(new Pillar("PillarUp", new ƒ.Vector2(0, 0.5), new ƒ.Vector2(0.1, 0.05)));

    viewport.addEventListener(ƒ.EVENT_POINTER.DOWN, onClick);
  }


  async function loadFromJson(_file: string): Promise<any> {
    const fetchPromise = fetch(_file);
    let json = await fetchPromise.then(response => {
      return response.json();

    });
    return json;
  }

}

