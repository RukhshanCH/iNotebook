import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'
import '../App.css'

const Noteitem = (props) => {
    const { note, updateNote, showalert } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (
        <>
            <div className={`m-3 ${props.Theme ? 'card2' : 'card'}`} style={{border: 'transparent'}}>
                <div className="card-content">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-para">{note.description}</p>
                    <div>
                        <i className="fa-solid fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
                        <i className="fa-solid fa-trash-can mx-2" onClick={() => { deleteNote(note._id); showalert("Deleted successfully", "Success") }}></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Noteitem