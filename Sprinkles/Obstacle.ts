namespace Sprinkles {
  import ƒ = FudgeCore;

  export class Obstacle extends ƒ.Node {
    // sprite anzeigen lassen -> show()? / Quad wird stattdessen genutzt, scheint einfacher
    static mesh: ƒ.Mesh = new ƒ.MeshQuad("Column");
    static material: ƒ.Material = new ƒ.Material("White", ƒ.ShaderUniColor, new ƒ.CoatColored());

    public obstacle: ƒ.Rectangle;

    constructor(_name: string, _pos: ƒ.Vector2, _scale: ƒ.Vector2) {
      super(_name);

      this.obstacle = new ƒ.Rectangle(_pos.x, _pos.y, _scale.x, _scale.y, ƒ.ORIGIN2D.CENTER);





    }
  }




}