namespace Sprinkles {
  export class SprinkleDefinition {
    public amount: number;
    public speed1: number; 
    public speed2: number; 
    public speed3: number; 
    public amountLevelChange1: number;
    public amountLevelChange2: number;

    constructor(_amount: number, _speed1: number, _speed2: number, _speed3: number, _amountLevelChange1: number, _amountLevelChange2: number) {
      this.amount = _amount;
      this.speed1 = _speed1;
      this.speed2 = _speed2;
      this.speed3 = _speed3;
      this.amountLevelChange1 = _amountLevelChange1;
      this.amountLevelChange2 = _amountLevelChange2;
    }
  }


}