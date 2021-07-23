/// <reference path="Sprinkle.ts" />
/// <reference path="Types.ts" />
namespace Sprinkles {
  import ƒ = FudgeCore;

  export class SpriteSprinkle extends Sprinkle {
    private static textureIds: string[] = ["KaroBU", "KaroGN", "KaroRD", "BallBU", "BallGN", "BallRD", "StarBU", "StarGN", "StarRD"]
    private static textureToType: Map<string, TYPES> = new Map([["KaroBU", TYPES.BLUE], ["KaroGN", TYPES.GREEN], ["KaroRD", TYPES.RED], ["BallBU", TYPES.BLUE], ["BallGN", TYPES.GREEN], ["BallRD", TYPES.RED], ["StarBU", TYPES.BLUE], ["StarGN", TYPES.GREEN], ["StarRD", TYPES.RED]]);

    constructor(_name: string, _textureId: string = null) {
      super(_name);

      let textureId: string = _textureId;
      if (!textureId) {
        // for random generation
        let index: number = Math.floor(Math.random() * SpriteSprinkle.textureIds.length);
        textureId = SpriteSprinkle.textureIds[index];
        //  for mapping
        this.type = SpriteSprinkle.textureToType.get(textureId);
      }

      let meshSprite: ƒ.MeshSprite = new ƒ.MeshSprite("SpriteSprinkle");
      let textureSprinkles: ƒ.ComponentMesh = new ƒ.ComponentMesh(meshSprite);
      textureSprinkles.mtxPivot.scale(new ƒ.Vector3(0.05, 0.05, 0));
      this.addComponent(textureSprinkles);

      let coatTextured: ƒ.CoatTextured = Stuff.generateTextureFromId(textureId);
      let material: ƒ.Material = new ƒ.Material("SpriteSprinkleMaterial", ƒ.ShaderTexture, coatTextured);
      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
      this.addComponent(cmpMaterial);



    }



    protected respawn(): void {
      sprinkles.addChild(new SpriteSprinkle("SpriteSprinkles"));
    }


  }
}