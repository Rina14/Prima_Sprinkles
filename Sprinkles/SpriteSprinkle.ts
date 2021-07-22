/// <reference path="Sprinkle.ts" />
namespace Sprinkles {
  import ƒ = FudgeCore;

  export class SpriteSprinkle extends Sprinkle {

    constructor(_name: string, _x: number, _y: number) {
      super(_name, _x, _y);
 

      // ƒ.MeshSprite for Karo Try
      let karo: ƒ.MeshSprite = new ƒ.MeshSprite("Karo");
      let textureKaro: ƒ.ComponentMesh = new ƒ.ComponentMesh(karo);
      textureKaro.mtxPivot.scale(new ƒ.Vector3(0.05, 0.05, 0));
      this.addComponent(textureKaro);

      let coatTextured: ƒ.CoatTextured = SpriteSprinkle.generateTextureFromId("KaroBU");
      // let texture: ƒ.Texture = new ƒ.Texture("KaroBlueMaterial");
      let material: ƒ.Material = new ƒ.Material("KaroBlueMaterial", ƒ.ShaderTexture, coatTextured);
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