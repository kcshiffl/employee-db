var positionX, positionY;

function setPositionX(x) { positionX = x; }
function setPositionY(y) { positionY = y; }

const note = ({color, text}) => {
  return (
    <div className='note' draggable='true'>
      {text}
    </div>
  );
}

export default note;
