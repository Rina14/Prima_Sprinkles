/// <reference path="Sprinkle.ts" />
namespace Sprinkles {
  import ƒ = FudgeCore;

  export class MeshSprinkle extends Sprinkle {

    constructor(_name: string, _x: number, _y: number) {
      super(_name, _x, _y);

      let mesh: ƒ.MeshQuad = new ƒ.MeshQuad("Cube");
      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
      cmpMesh.mtxPivot.scale(new ƒ.Vector3(0.05, 0.05, 0));
      this.addComponent(cmpMesh);

      let material: ƒ.Material = new ƒ.Material("Cubey", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
      this.addComponent(cmpMaterial);



    }








    protected collideWith(obstacle: Obstacle): void {
      throw new Error("Method not implemented.");
    }


    // Collider
    // protected abstract collideWith(obstacle: Obstacle): void;








  }
}