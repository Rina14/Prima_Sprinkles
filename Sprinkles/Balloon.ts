/// <reference path="Sprinkle.ts" />
namespace Sprinkles {
  import ƒ = FudgeCore;

  export class Balloon extends ƒ.Node {
    private counter: number = 0;

    constructor(_name: string) {
      super(_name);

      let balloon: ƒ.MeshSprite = new ƒ.MeshSprite("Balloon");
      let textureBalloon: ƒ.ComponentMesh = new ƒ.ComponentMesh(balloon);
      // textureBalloon.mtxPivot.scale(new ƒ.Vector3(1, 1, 0));
      this.addComponent(textureBalloon);

      let coatTextured: ƒ.CoatTextured = Stuff.generateTextureFromId("BalloonSmall");
      let material: ƒ.Material = new ƒ.Material("BalloonMaterial", ƒ.ShaderTexture, coatTextured);
      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
      this.addComponent(cmpMaterial);


      this.addComponent(new ƒ.ComponentTransform());

    }

    // Wenn Zeit ist, jeden neuen Zustand in einen Array und ausgeben lassen, je nach Counter, Element holen, Counter/2 als Index benutzen
    public clickedOn(): boolean {
      this.counter++;
      switch (this.counter) {
        case 2:
          this.getComponent(ƒ.ComponentMesh).mtxPivot.scale(new ƒ.Vector3(1.2, 1.2, 0));
          let coatTexturedBalloonMedium: ƒ.CoatTextured = Stuff.generateTextureFromId("BalloonMedium");
          let materialBalloonMedium: ƒ.Material = new ƒ.Material("BalloonMediumMaterial", ƒ.ShaderTexture, coatTexturedBalloonMedium);
          this.getComponent(ƒ.ComponentMaterial).material = materialBalloonMedium;
          break;
        case 4:
          this.getComponent(ƒ.ComponentMesh).mtxPivot.scale(new ƒ.Vector3(1.2, 1.2, 0));
          let coatTexturedBalloonBig: ƒ.CoatTextured = Stuff.generateTextureFromId("BalloonBig");
          let materialBalloonBig: ƒ.Material = new ƒ.Material("BalloonBigMaterial", ƒ.ShaderTexture, coatTexturedBalloonBig);
          this.getComponent(ƒ.ComponentMaterial).material = materialBalloonBig;
          break;
        case 6:
          branch.removeChild(this);
          return true;
      }

      return false;

    }


    // public balloonAnimation(): void {

    //   let img: HTMLImageElement = document.querySelector("#enemy_idle");
    //   let spritesheet: fudge.CoatTextured = fudgeAid.createSpriteSheet("Enemy", img);
    //   let sprite: fudgeAid.SpriteSheetAnimation = new fudgeAid.SpriteSheetAnimation("Idle", spritesheet);
    //   sprite.generateByGrid(fudge.Rectangle.GET(0, 0, 32, 32), 4, fudge.Vector2.ZERO(), 32, fudge.ORIGIN2D.BOTTOMCENTER);
    //   Enemy.animations[Platform_Game.ACTION.IDLE] = sprite;

    //   let walkImg: HTMLImageElement = document.querySelector("#enemy_walk");
    //   let walksheet: fudge.CoatTextured = fudgeAid.createSpriteSheet("Enemy", walkImg);
    //   let walkSprite: fudgeAid.SpriteSheetAnimation = new fudgeAid.SpriteSheetAnimation("Walk", walksheet);
    //   walkSprite.generateByGrid(fudge.Rectangle.GET(0, 0, 32, 32), 6, fudge.Vector2.ZERO(), 32, fudge.ORIGIN2D.BOTTOMCENTER);
    //   Enemy.animations[Platform_Game.ACTION.WALK] = walkSprite;

    //   this.setAnimation(<fudgeAid.SpriteSheetAnimation>Enemy.animations[Platform_Game.ACTION.IDLE]);
    // }
  }
}