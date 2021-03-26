import '../../App.css';
import NoteBase from '../note/NoteBase';
import click1 from '../sounds/click1.mp3';
import click2 from '../sounds/click2.mp3';

var id;
var x; var y; // Global x,y coordinates for mouse dragging
var notes = new Map(); // Map that holds the notes created by user
var notebaseColors = ['#F0ADA7', '#EEC979','#48B0C7']; // Holds all possible colors of notes

var mousedownID;  //Global ID of mouse down interval
function mousedown(id, offsetX, offsetY) {
  mousedownID = setInterval(function() {
    var object = document.getElementById(id);
    if (object.className === 'note') {
      object.style.left = (x - offsetX).toString()+"px";
      object.style.top = (y - offsetY).toString()+"px";
    }
  }
  , 10 /*execute every 30ms*/);
}

function mouseup() {
  console.log("Mouse up!");
  document.getElementById(id).style.transform = "scale(1.0)";
  clearInterval(mousedownID);
}

/** Getting drag position **/
document.addEventListener("mousemove", function(e){
    e = e || window.event;
    var dragX = e.pageX, dragY = e.pageY;
    x = dragX; y = dragY;
}, false);

document.addEventListener("mousedown", function(e) {
    console.log("Mouse down...");
    e.preventDefault();
    e = e || window.event;

    // Storing ref to the dragged element
    var object = e.target;
    var dragX = e.pageX, dragY = e.pageY;

    /** Getting offset of mouse and object **/
    const rect = object.getBoundingClientRect();
    var offsetX = dragX - rect.left;
    var offsetY = dragY - rect.top;

    if (object.className === 'notebase') {
      var audio = new Audio(click1);
      audio.play();
      makeNote(object.style.backgroundColor, (x - offsetX), (y - offsetY));
      id = notes.size-1;

      document.getElementById(id).style.transform = "scale(1.1)";
    }
    else if (object.className === 'note'){
      var audio = new Audio(click2);
      audio.play();
      id = object.id;

      document.getElementById(id).style.transform = "scale(1.05)";
    }
    else return;
    if (id === null) return;

    mousedown(id, offsetX, offsetY);
});
document.addEventListener("mouseup", mouseup);

class NoteClass {
  constructor(id, color, text, positionX, positionY) {
      this.id = id;
      this.color = color;
      this.text = text;
      this.positionX = positionX;
      this.positionY = positionY;
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

function makeNote(color, x, y) {
  let note = new NoteClass(notes.size, color, '', x, y);

  /** Creating note element **/
  var newElement = document.createElement('div');
    newElement.id = notes.size;
    newElement.className = 'note';
    newElement.draggable = 'false';
    newElement.style.backgroundColor = color;
    newElement.style.left = x.toString()+"px";
    newElement.style.top = y.toString()+"px";

  /** Adding text element inside of the note **/
  var text = document.createElement('div');
    text.id = 'note-text';
    text.contentEditable = 'false';
    text.append('content');

  newElement.append(text);
  document.body.appendChild(newElement);
  notes.set(note.id, note);
  console.log("Note added. Map length: " + notes.size);
  return newElement;
}

const Home = () => {
  var notebases = notebaseColors.map(item => <NoteBase color={item} />)

  return (
  <div>
    <div id='library' className='library' draggable='false'>
      {notebases}
    </div>

  </div>
  );
}

export default Home;
