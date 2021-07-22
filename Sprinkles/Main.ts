namespace Sprinkles {
  import ƒ = FudgeCore;
  window.addEventListener("load", init);
  export let branch: ƒ.Node = new ƒ.Node("Graph");
  let viewport: ƒ.Viewport = new ƒ.Viewport();
  export let currentSpeed: number = 1;
  export let squareSprinkle: ƒ.Node = new ƒ.Node("MeshSprinkle");
  export let sprinkles: ƒ.Node = new ƒ.Node("Sprinkle");
  // export let roundSprinkle: ƒ.Node = new ƒ.Node("RoundSprinkle");
  // let squareSprinkle: ƒ.Node[] = [];




  function init(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");

    // Cube zur Überprüfung, was außerhalb des Canvas liegt
    // branch.addComponent(new ƒ.ComponentTransform());

    // let mesh: ƒ.MeshCube = new ƒ.MeshCube("Cube");
    // branch.addComponent(new ƒ.ComponentMesh(mesh));

    // let material: ƒ.Material = new ƒ.Material("Cubey", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
    // let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
    // branch.addComponent(cmpMaterial);

    // für level 1 Geschwindigkeit beachten
    // branch.addChild(new SquareSprinkle("Squarey", 0, 0));
    branch.addChild(new MeshSprinkle("Squarey", 0, 0));


    // generate 25 MeshSprinkles at once
    for (let i: number = 0; i < 25; i++) {
      let squaries: MeshSprinkle = new MeshSprinkle("MeshSprinkle", 0, 0);
      branch.addChild(squaries);
    }

    // generate X KaroSprinkles at once
    for (let i: number = 0; i < 20; i++) {
      let karos: SpriteSprinkle = new SpriteSprinkle("SpriteSprinkle", 0, 0);
      branch.addChild(karos);
    }

    // generate X StarSprinkles at once
    // for (let i: number = 0; i < 25; i++) {
    //   let stars: StarSprinkle = new StarSprinkle("StarSprinkle", 0, 0);
    //   branch.addChild(stars);
    // }


    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.mtxPivot.translateZ(1.98);
    cmpCamera.mtxPivot.rotateY(180);
    cmpCamera.clrBackground.setHex("#22437d");
    // clrBackground: Color = new Color(0, 4, 1, 1);

    viewport.initialize("Viewport", branch, cmpCamera, canvas);
    viewport.draw();

    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 30);
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);


  }

  function update(_event: Event): void {
    viewport.draw();
  }


}