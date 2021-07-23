namespace Sprinkles {
  import ƒ = FudgeCore;

  export abstract class Sprinkle extends ƒ.Node {
    public type: TYPES;
    private direction: ƒ.Vector2;
    private speed: number;


    constructor(_name: string) {
      super(_name);
      let direction: ƒ.Vector2 = new ƒ.Vector2(Math.random() - 0.5, Math.random() - 0.5);
      //  für zufällige Spawnposition
      let x: number = (Math.random() - 0.5) / 4;
      let y: number = (Math.random() - 0.5) / 4;
      direction.normalize();
      this.direction = direction;

      this.speed = Math.random() * 0.2 + 0.1;


      this.addComponent(new ƒ.ComponentTransform());

      this.mtxLocal.translateX(x);
      this.mtxLocal.translateY(y);

      ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, this.move);
    }


    public move = (): void => {
      let speed: number = this.speed * levels[currentLevel].speed * ƒ.Loop.timeFrameReal / 1000;
      this.mtxLocal.translate(new ƒ.Vector3(this.direction.x * speed, this.direction.y * speed, 0));


      let clientCoordinates: ƒ.Vector2 = viewport.pointWorldToClient(this.mtxLocal.translation);
      if (!clientRectangle.isInside(clientCoordinates)) {
        this.remove();
      }

      for (let pillar of branch.getChildrenByName("Pillar")[0].getChildren()) {
        this.collideWith(<Pillar>pillar);
      }

    }


    public remove(): void {
      sprinkles.removeChild(this);
      ƒ.Loop.removeEventListener(ƒ.EVENT.LOOP_FRAME, this.move);
      this.respawn();
    }

    // Collider
    protected collideWith(pillar: Pillar): void {
      let rectangle: ƒ.Rectangle = new ƒ.Rectangle(this.mtxLocal.translation.x, this.mtxLocal.translation.y, this.getComponent(ƒ.ComponentMesh).mtxPivot.scaling.x, this.getComponent(ƒ.ComponentMesh).mtxPivot.scaling.y);
      if (pillar.rectangle.collides(rectangle)) {
        let pillarOrientation: ƒ.Vector3;
        if (Math.abs(this.direction.x) > Math.abs(this.direction.y)) {
          if (this.direction.y > 0) {
            pillarOrientation = new ƒ.Vector3(1, 0, 0);
          } else {
            pillarOrientation = new ƒ.Vector3(-1, 0, 0);
          }
        } else {
          if (this.direction.x > 0) {
            pillarOrientation = new ƒ.Vector3(0, 1, 0);
          } else {
            pillarOrientation = new ƒ.Vector3(0, -1, 0);
          }

        }
        // Winkelberechnung zwischen zwei Vektoren
        let newDirection: ƒ.Vector3 = this.direction.toVector3();
        newDirection.reflect(pillarOrientation);
        this.direction = new ƒ.Vector2(newDirection.x, newDirection.y);

      }
    }


    protected abstract respawn(): void;
  }



}