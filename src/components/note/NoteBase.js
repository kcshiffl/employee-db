var red = '#F0ADA7';
var yellow = '#EEC979';
var blue = '#48B0C7';

function makeNote(color) {
  var newElement = document.createElement('div');
  newElement.className = 'notebase';
  newElement.draggable = 'true';

  // Style
  newElement.style.backgroundColor = color;
  document.body.appendChild(newElement);
}

const NoteBase = ({color}) => {
  return (
    <div
      className='notebase'
      draggable='true'
      style={{backgroundColor: {color}}}
    >
      {color}
    </div>
  );
}

export default NoteBase;
