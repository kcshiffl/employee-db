import React, { useState, useEffect } from 'react';
import '../../App.css';
import { Link } from "react-router-dom";
import logo from '../../logo.png';
import Note from '../note/Note';
import NoteBase from '../note/NoteBase';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

var notes = [1,2,3];

/** Getting drag position **/
document.addEventListener("dragover", function(e){
    e = e || window.event;
    var dragX = e.pageX, dragY = e.pageY;
}, false);

document.addEventListener("dragend", function(e) {
    e = e || window.event;
    var dragX = e.pageX, dragY = e.pageY;
    console.log('Dropped at X: ' + dragX + ', Y: ' + dragY);
});


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

function makeNote(color, text, positionX, positionY) {
  if (!positionX || !positionY) return;
  if (!color) color = 'yellow';
  if (!text) text = '';

  let id = notes.length;
  let note = new NoteClass(id, color, text, positionX, positionY);
  notes.push(note);
  console.log("Note " + id + " created.");
  console.log("note created");
  console.log("Length: " + notes.length);
}

function addNotes() {
  var html='';
  for (var i=0; i<=notes.length; i++) {
    //html+='<div>'+balls90[i]+'</div>';
    html+='<Note />';
  }
  document.getElementById('board').innerHTML+= html;
}

const Home = () => {
  return (
  <div>
    <div id='board'>
      <button onClick={() => makeNote('red','hello', 10,10)}>button</button>
      <script>
        addNotes();
      </script>
    </div>

    <div id='library' className='library'>
      <NoteBase color='red'/>
      <NoteBase color='blue'/>
      <NoteBase />
    </div>

  </div>
  );
}

export default Home;
