import '../../App.css';
import NoteBase from '../note/NoteBase'; // Class for base colors of note (stored in library)
import click1 from '../sounds/click1.mp3'; // Click noise 1
import click2 from '../sounds/click2.mp3'; // Click noise 2
import { FaChevronDown, FaPlus } from 'react-icons/fa' // Arrow icon (For library)

var libraryOpen = true;
var id;
var x; var y; // Global x,y coordinates of coordinates where mouse is on the page
var notes = new Map(); // Map that holds all notes created by user
var notebaseColors = ['#F0ADA7', '#EEC979','#48B0C7']; // Holds all default colors of notes

var mousedownID;  // Global ID of mouse down interval
function mousedown(id, offsetX, offsetY) {
  mousedownID = setInterval(function() {
    var object = document.getElementById(id);
    if (object.className === 'note') {
      object.style.left = (x - offsetX).toString()+"px";
      object.style.top = (y - offsetY).toString()+"px";
    }
  }
  , 10 /*execute every 10ms*/);
}

/**
* Called every time a mouse click is lifted
* - Resets the size of what is being clicked to 100% of original size
* - Clears the mouse-down interval that indicates the click has lifted (i.e. finished dragging)
**/
function mouseup() {
  //console.log("Mouse up!");
  var elem = document.getElementById(id);
  if (elem != null) elem.style.transform = "scale(1.0)";
  clearInterval(mousedownID);
}

/** Getting mouse position **/
document.addEventListener("mousemove", function(e){
    e = e || window.event;
    var dragX = e.pageX, dragY = e.pageY;
    x = dragX; y = dragY;
}, false);

document.addEventListener("mousedown", function(e) {
    //console.log("Mouse down...");
    e.preventDefault();
    e = e || window.event;

    // Storing ref to the dragged element
    var object = e.target;
    var dragX = e.pageX, dragY = e.pageY;

    /** Getting offset of mouse and object **/
    const rect = object.getBoundingClientRect();
    var offsetX = dragX - rect.left+4.5;
    var offsetY = dragY - rect.top+4.5;

    if (object.className === 'notebase') {
      var audio = new Audio(click2);
      audio.play();
      makeNote(object.style.backgroundColor, (x - offsetX), (y - offsetY));
      id = notes.size-1;
      document.getElementById(id).style.transform = "scale(1.05)";
    }
    else if (object.className === 'note'){
      var audio = new Audio(click1);
      audio.play();
      id = object.id;
      var elem = document.getElementById(id);
      elem.parentElement.appendChild(elem); // Moving to front
      elem.style.transform = "scale(1.05)";
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
    text.className = 'note-text';
    text.contentEditable = 'false';
    text.append('content');
  newElement.append(text);

  newElement.addEventListener('dblclick', function(e) {
      if (newElement.children[0].id != 'note-text') return;
      newElement.children[0].contentEditable = 'true';
      newElement.style.pointerEvents = 'auto';
      console.log("double clicked");
  });
  document.body.appendChild(newElement);
  notes.set(note.id, note);
  return newElement;
}

/**
* Toggles the library to show if hidden, and hide if shown
**/
function toggleLibrary() {
  if (libraryOpen) {
    document.getElementById('downArrow').style.transform = "rotate(0deg)";
    document.getElementById('library').style.top = '-125px';
    libraryOpen=false;
  }
  else {
    document.getElementById('downArrow').style.transform = "rotate(180deg)";
    document.getElementById('library').style.top = '0px';
    libraryOpen=true;
  }
}

const Home = () => {
  var notebases = notebaseColors.map(item => <NoteBase color={item} />) // Maps all default note colors
  return (
  <div>
    <div id='library' className='library' draggable='false'>
      {notebases}
      <FaPlus className='plus-icon' />
      <div onClick={toggleLibrary} id='downArrow' className='downArrow' align='center'><FaChevronDown size={40}/></div>
    </div>

  </div>
  );
}

export default Home;
