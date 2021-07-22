/// <reference path="Sprinkle.ts" />
namespace Sprinkles {
  import ƒ = FudgeCore;

  export class KaroSprinkle extends ƒ.Node {
    private direction: ƒ.Vector2;
    private speed: number;

    constructor(_name: string, _x: number, _y: number) {
      super(_name);
      let direction: ƒ.Vector2 = new ƒ.Vector2(Math.random() - 0.5, Math.random() - 0.5);
      direction.normalize();
      this.direction = direction;

      this.speed = Math.random() * 0.2 + 0.1;


      this.addComponent(new ƒ.ComponentTransform());

      // ƒ.MeshSprite for Karo Try
      let karo: ƒ.MeshSprite = new ƒ.MeshSprite("Karo");
      let textureKaro: ƒ.ComponentMesh = new ƒ.ComponentMesh(karo);
      textureKaro.mtxPivot.scale(new ƒ.Vector3(0.05, 0.05, 0));
      this.addComponent(textureKaro);

      let coatTextured: ƒ.CoatTextured = KaroSprinkle.generateTextureFromId("KaroBU");
      // let texture: ƒ.Texture = new ƒ.Texture("KaroBlueMaterial");
      let material: ƒ.Material = new ƒ.Material("KaroBlueMaterial", ƒ.ShaderTexture, coatTextured);
      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
      this.addComponent(cmpMaterial);


      // ƒ.MeshSprite
      // let karo: ƒ.MeshSprite = new ƒ.MeshSprite("Karo");
      // let textureKaro: ƒ.ComponentMesh = new ƒ.ComponentMesh(karo);
      // textureKaro.mtxPivot.scale(new ƒ.Vector3(0.05, 0.05, 0));
      // this.addComponent(textureKaro);

      // let texture: ƒ.Texture = new ƒ.Texture("KaroMaterial", ƒ.ShaderTexture, new ƒ.CoatTextured(textureId));
      // let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(texture);
      // this.addComponent(cmpMaterial);

      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.move);
    }




    static generateTextureFromId(textureId: string): ƒ.CoatTextured {
      let coatTextured: ƒ.CoatTextured = new ƒ.CoatTextured();
      let img: HTMLImageElement = document.querySelector(textureId);
      let textureImage: ƒ.TextureImage = new ƒ.TextureImage();
      textureImage.image = img;
      coatTextured.texture = textureImage;
      return coatTextured;
    }



    public move = (): void => {
      let speed: number = this.speed * currentSpeed * ƒ.Loop.timeFrameReal / 1000;
      //translation = translation + direction.scale(currentSpeed);
      this.mtxLocal.translate(new ƒ.Vector3(this.direction.x * speed, this.direction.y * speed, 0));
    }

    // Collider
    // protected abstract collideWith(obstacle: Obstacle): void;








  }
}