namespace Sprinkles {
  import ƒ = FudgeCore;

  export abstract class Sprinkle extends ƒ.Node {
    private direction: ƒ.Vector2;
    private speed: number;

    constructor(_name: string, _x: number, _y: number) {
      super(_name);
      let direction: ƒ.Vector2 = new ƒ.Vector2(Math.random() - 0.5, Math.random() - 0.5);
      direction.normalize();
      this.direction = direction;

      this.speed = Math.random() * 0.2 + 0.1;


      this.addComponent(new ƒ.ComponentTransform());

      // ƒ.MeshSprite
      let mesh: ƒ.MeshQuad = new ƒ.MeshQuad("Cube");
      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);
      cmpMesh.mtxPivot.scale(new ƒ.Vector3(0.2, 0.2, 0));
      this.addComponent(cmpMesh);

      let material: ƒ.Material = new ƒ.Material("Cubey", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);
      this.addComponent(cmpMaterial);

      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.move);
    }

    public move = (): void => {
      let speed: number = this.speed * currentSpeed * ƒ.Loop.timeFrameReal / 1000;
      //translation = translation + direction.scale(currentSpeed);
      this.mtxLocal.translate(new ƒ.Vector3(this.direction.x * speed, this.direction.y * speed, 0));
    }

    // Collider
    protected abstract collideWith(obstacle: Obstacle): void;








  }
}