///<reference path="ExternalProperties.ts"/>

namespace Sprinkles {
  window.addEventListener("load", init);
  export let externalProperties: ExternalProperties;
  async function init(): Promise<void> {
    //let sprinkleDef: SprinkleDefinition = new SprinkleDefinition(10, 1, 1.2, 1.5, 20, 50);  
    //let json: string = JSON.stringify(sprinkleDef, null, 2);

    const fetchPromise: Promise<Response> = fetch("SprinkleDefFromFile.json");
    externalProperties = await fetchPromise.then(response => {
      return response.json();
    });
    // let sprinkleDefFromFile: SprinkleDefinition = new SprinkleDefinition(json.amount, json.speed1, json.speed2, json.speed3, json.amountLevelChange1, json.amountLevelChange2, json.amountLevelChange3);
    console.log(externalProperties);
    // console.log(sprinkleDefFromFile);
  }
}