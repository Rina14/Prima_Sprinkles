namespace Sprinkles {
  import ƒ = FudgeCore;
  window.addEventListener("load", init);
  export let branch: ƒ.Node = new ƒ.Node("Graph");
  let viewport: ƒ.Viewport = new ƒ.Viewport();


  function init(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");

    // Cube zur Überprüfung, was außerhalb des Canvas liegt
    // branch.addComponent(new ƒ.ComponentTransform());

    // let mesh: ƒ.MeshCube = new ƒ.MeshCube("Cube");
    // branch.addComponent(new ƒ.ComponentMesh(mesh));

    // let material: ƒ.Material = new ƒ.Material("Cubey", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
    // let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
    // branch.addComponent(cmpMaterial);


    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    cmpCamera.mtxPivot.translateZ(1.98);
    cmpCamera.mtxPivot.rotateY(180);
    cmpCamera.clrBackground.setHex("#22437d");
    // clrBackground: Color = new Color(0, 4, 1, 1);

    viewport.initialize("Viewport", branch, cmpCamera, canvas);
    viewport.draw();
  }
}