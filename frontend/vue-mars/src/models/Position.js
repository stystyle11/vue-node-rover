export class Position {
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  // Validate the model before sending it to the API
  validate() {
    if (!this.x === '' || !this.y === '' || !this.direction === '') {
      throw new Error('All fields are required');
    }
  }
}
