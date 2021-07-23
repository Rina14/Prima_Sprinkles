
/// <reference path="Sprinkle.ts" />
namespace Sprinkles {
  import ƒ = FudgeCore;

  export class Pillar extends ƒ.Node {
    public rectangle: ƒ.Rectangle;

    constructor(_name: string, _pos: ƒ.Vector2, _size: ƒ.Vector2) {
      super(_name);

      let mesh: ƒ.MeshQuad = new ƒ.MeshQuad("Cube");
      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
      cmpMesh.mtxPivot.scale(_size.toVector3());

      this.addComponent(cmpMesh);
      this.rectangle = new ƒ.Rectangle(_pos.x, _pos.y, _size.x, _size.y)

      let material: ƒ.Material = new ƒ.Material("Cubey", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0.5, 0.1, 1, 1)));
      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
      this.addComponent(cmpMaterial);

      this.addComponent(new ƒ.ComponentTransform());

      this.mtxLocal.translation = _pos.toVector3();

    }
  }
}