namespace Sprinkles {
  import ƒ = FudgeCore;

  export class Stuff {

    // Texture ID wird Mesh zugewiesen
    static generateTextureFromId(textureId: string): ƒ.CoatTextured {
      let coatTextured: ƒ.CoatTextured = new ƒ.CoatTextured();
      let img: HTMLImageElement = document.querySelector("#" + textureId);
      let textureImage: ƒ.TextureImage = new ƒ.TextureImage();
      textureImage.image = img;
      coatTextured.texture = textureImage;
      return coatTextured;
    }

  }
}



