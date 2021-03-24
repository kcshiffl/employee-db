import React, { useState, useEffect } from 'react';
import '../../App.css';
import { Link } from "react-router-dom";
import logo from '../../logo.png';
import Note from '../note/Note';
import NoteBase from '../note/NoteBase';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

var x = 100; var y = 100;
var notes = [1,2,3];
const createDiv = (color, text) => `<Note color={color} text={text} />`;

/** Getting drag position **/
document.addEventListener("dragover", function(e){
    e = e || window.event;
    var overX = e.pageX, overY = e.pageY;
    x = overX; y = overY;
}, false);

/**
document.addEventListener("dragend", function(e) {
    e = e || window.event;
    var dragX = e.pageX, dragY = e.pageY;
    console.log('Dropped at X: ' + dragX + ', Y: ' + dragY);
});
**/


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
  let note = new NoteClass(notes.length, 'red', 'hello', x, y);

  notes.push(note);
  var newElement = document.createElement('div');
  newElement.id = notes.length;
  newElement.className = 'note';
  newElement.draggable = 'true';
  newElement.style.left = x.toString()+"px";
  newElement.style.top = y.toString()+"px";
  newElement.append("Hello test!");
  document.body.appendChild(newElement);

  console.log("adding notes...");
}

const Home = () => {
  return (
  <div>
    <div id='board'>
      <button onClick={() => addNotes()}>button</button>
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
