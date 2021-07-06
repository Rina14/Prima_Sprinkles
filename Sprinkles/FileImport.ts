///<reference path="SprinkleDefinition.ts"/>

namespace Sprinkles {
  window.addEventListener("load", init);
  async function init() {
    //let sprinkleDef: SprinkleDefinition = new SprinkleDefinition(10, 1, 1.2, 1.5, 20, 50);  
    //let json: string = JSON.stringify(sprinkleDef, null, 2);
  
    const fetchPromise = fetch("data.json");
    let json = await fetchPromise.then(response => {
      return response.json();
    });
    let sprinkleDefFromFile: SprinkleDefinition = new SprinkleDefinition(json.amount, json.speed1, json.speed2, json.speed3, json.amountLevelChange1, json.amountLevelChange2);
    console.log(json);
    console.log(sprinkleDefFromFile);
  }
}