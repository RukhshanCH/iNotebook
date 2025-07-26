import React, { useState, useContext } from 'react'
import NoteContext from '../context/notes/noteContext'


const Addnote = (props) => {
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const context = useContext(NoteContext);
    const { addnote } = context
    
    const onChange = (e) => { 
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const handleClick = (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tag)
        setNote({ title: "", description: "", tag: "" })
        props.showalert("Added successfully", "Success")
    }
    return (
        <div className='form-container container'>
            <form className='form'>
                <div className="form-group">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" name="title" className="form-control" id="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="dsecription" className="form-label">Description</label>
                    <textarea type="text" name="description" className="form-control" id="description" value={note.description} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" name="tag" className="form-control" id="tag" value={note.tag} onChange={onChange} />
                </div>
                <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="form-submit-btn" onClick={handleClick}>Add note</button>
            </form>
        </div>
    )
}

export default Addnote
