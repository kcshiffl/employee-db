class Note {
  constructor(id, color, text, positionX, positionY) {
      this._id = id;
      this._color = color;
      this._text = text;
      this._positionX = positionX;
      this._positionY = positionY;
  }
  get id() { return this._id; }
  get color() { return this._color; }
  get text() { return this._text; }
  get positionX() { return this._positionX; }
  get positionY() { return this._positionY; }

  set id(value) { this._id = value; }
  set color(value) { this._color = value; }
  set text(value) { this._text = value; }
  set positionX(value) { this._positionX = value; }
  set positionY(value) { this._positionY = value; }
}

export default Note;
