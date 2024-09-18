export class Position {
  constructor(inputX, inputY, inputN) {
    this.inputX = inputX;
    this.inputY = inputY;
    this.inputN = inputN;
  }

  // Validate the model before sending it to the API
  validate() {
    if (!this.inputX || !this.inputY || !this.inputN) {
      throw new Error('All fields are required');
    }
  }
}
