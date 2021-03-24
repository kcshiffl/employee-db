var color = '';
var red = '#F0ADA7';
var yellow = '#EEC979';
var blue = '#48B0C7';

const NoteBase = ({color}) => {
  return (
    <div
      className='notebase'
      draggable='true'
      style={{backgroundColor: '#EEC979'}}
      onClick={() => { console.log("note clicked");}}
      onDrop={() => { console.log("note dropped");}} >
      {color}
    </div>
  );
}

export default NoteBase;
