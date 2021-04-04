class NoteInfo {
  constructor(id, x, y, offsetX, offsetY) {
      this._id = id;
      this._x = x; // The x-coordinate of where the note was originally clicked
      this._y = y; // The y-coordinate of where the note was originally clicked
      this._offsetX = offsetX;
      this._offsetY = offsetY;
  }

  get id() { return this._id; }
  get x() { return this._x; }
  get y() { return this._y; }
  get offsetX() { return this._offsetX; }
  get offsetY() { return this._offsetY; }

  print() {
    console.log(
      "Console: " + this._id
      + "\nX: " + this._x
      + "\nY: " + this._y
      + "\nOffset X: " + this._offsetX
      + "\nOffset Y: " + this._offsetY
    );
  }
}

export default NoteInfo;
