var positionX, positionY;

function setPositionX(x) { positionX = x; }
function setPositionY(y) { positionY = y; }

const Note = ({color, text}) => {
  return (
    <div className='note' draggable='true'>
      {text}
    </div>
  );
}

export default Note;
