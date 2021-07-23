/// <reference path="Sprinkle.ts" />
namespace Sprinkles {
  import ƒ = FudgeCore;

  export class MeshSprinkle extends Sprinkle {

    constructor(_name: string) {
      super(_name);

      let mesh: ƒ.MeshQuad = new ƒ.MeshQuad("Cube");
      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
      cmpMesh.mtxPivot.scale(new ƒ.Vector3(0.03, 0.03, 0));
      this.addComponent(cmpMesh);

      let material: ƒ.Material = new ƒ.Material("Cubey", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 0.9, 0.7, 1)));
      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
      this.addComponent(cmpMaterial);

      this.type = TYPES.ORANGE;

    }


    protected respawn(): void {
      sprinkles.addChild(new MeshSprinkle("Cube"));
    }
  }
}