import '../../App.css';
import Note from '../note/Note';
import NoteInfo from '../note/NoteInfo';
import NoteBase from '../note/NoteBase'; // Class for base colors of note (stored in library)
import click1 from '../sounds/click1.mp3'; // Click noise 1
import click2 from '../sounds/click2.mp3'; // Click noise 2
import click3 from '../sounds/click3.mp3'; // Click noise 2
import { FaChevronDown, FaPlus } from 'react-icons/fa' // Arrow icon (For library)

var libraryOpen = true;
var x; var y; // Global x,y coordinates of coordinates where mouse is on the page

var notes = new Map(); // Map that holds all notes created by user
var currNote = new NoteInfo(0, 0, 0); // State of the note currently selected
var notebaseColors = ['#F0ADA7', '#EEC979','#48B0C7']; // Holds all default colors of notes

var dragging = false;
var noteSound = new Audio(click1);
var baseSound = new Audio(click2);
var dropSound = new Audio(click3);


var mousedownID;  // Global ID of mouse down interval
function mousedown() {
  mousedownID = setInterval(function() {
    if (currNote === null) return;
    var object = document.getElementById(currNote.id);
    if (object.className === 'note') {
      object.style.left = (x - currNote.offsetX).toString()+"px";
      object.style.top = (y - currNote.offsetY).toString()+"px";
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
  dragging = false;
  try {
    var elem = document.getElementById(currNote.id);
    if (elem != null) {
      elem.style.transform = "scale(1.0)";
      elem.style.zIndex = '1';
    }
  } catch(err) { }
  clearInterval(mousedownID);

  if (currNote === null) return;
  // Note clicked - Edit the text of the note
  if (currNote.x === x && currNote.y === y) {
    console.log("Clicked!");
  }

  /** Removing note if it was let go in the library section **/
  if (elem != null && elem.className === 'note') {
    if (elem.getBoundingClientRect().top < document.getElementById('library').getBoundingClientRect().bottom) {
      elem.remove();
      dropSound.play();
    }
  }
  currNote = null;
}

/** Getting mouse position **/
document.addEventListener("mousemove", function(e){
    e = e || window.event;
    x = e.pageX; y = e.pageY;

    if (currNote === null) return;
    if (!dragging && currNote.x !== x && currNote.y !== y) {
      var elem = document.getElementById(currNote.id);
      if (elem === null) return;
      if (elem.className === 'note') {
        elem.style.transform = "scale(1.05)";
        noteSound.play();
      }
      dragging = true;
    }
}, false);

document.addEventListener("mousedown", function(e) {
    e.preventDefault();
    e = e || window.event;

    // Storing ref to the dragged element
    var object = e.target;
    var dragX = e.pageX, dragY = e.pageY;

    /** Getting offset of mouse and object **/
    const rect = object.getBoundingClientRect();
    var offsetX = dragX - rect.left+4.5;
    var offsetY = dragY - rect.top+4.5;

    // Notebase
    if (object.className === 'notebase') {
      // baseSound.play();
      makeNote(object.style.backgroundColor, (x - offsetX), (y - offsetY));
      currNote = new NoteInfo(notes.size-1, dragX, dragY, offsetX, offsetY);
      var elem = document.getElementById(currNote.id);
        elem.style.transform = "scale(1.05)";
        elem.style.zIndex = '20';
    }
    // Note
    else if (object.className === 'note'){
      currNote = new NoteInfo(object.id, dragX, dragY, offsetX, offsetY);
      var elem = document.getElementById(currNote.id);
        elem.parentElement.appendChild(elem); // Moving to front
        elem.style.zIndex = '20';
    }
    else return;
    if (currNote[0] === null) return;

    mousedown();
});
document.addEventListener("mouseup", mouseup);

function makeNote(color, x, y) {
  let note = new Note(notes.size, color, '', x, y);

  /** Creating note element **/
  var newElement = document.createElement('div');
    newElement.id = notes.size;
    newElement.className = 'note';
    newElement.draggable = 'false';
    newElement.style.backgroundColor = color;
    newElement.style.left = x.toString()+"px";
    newElement.style.top = y.toString()+"px";
    newElement.style.zIndex = '20';

  /** Adding text element inside of the note **/
  var text = document.createElement('div');
    text.id = 'note-text';
    text.className = 'note-text';
    text.contentEditable = 'false';
    text.append('content');
  newElement.append(text);

  /** On double click, user can change text to note
  newElement.addEventListener('dblclick', function(e) {
      if (newElement.children[0].id !== 'note-text') return;
      newElement.children[0].contentEditable = 'true';
      newElement.style.pointerEvents = 'auto';
      console.log("double clicked");
  });
  **/

  document.body.appendChild(newElement);
  notes.set(note.id, note);
  return newElement;
}

function removeNote(id) {
  document.getElementById(id).remove();
  notes.remove(id);
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
