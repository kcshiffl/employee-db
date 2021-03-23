import React, { useState, useEffect } from 'react';
import '../../App.css';
import { Link } from "react-router-dom";
import logo from '../../logo.png';
import Note from '../note/Note';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

var notes = [];

/** Getting drag position **/
document.addEventListener("dragover", function(e){
    e = e || window.event;
    var dragX = e.pageX, dragY = e.pageY;
    console.log("X: "+dragX+" Y: "+dragY);
}, false);


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
}

const Home = () => {
  return (
  <div>

    <div>

    </div>

    <div className='library'>
      <Note color='red' />
      <Note color='pink' />
      <Note />
    </div>

  </div>
  );
}

export default Home;
