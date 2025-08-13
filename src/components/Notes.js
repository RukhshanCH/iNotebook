import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import './Myapp.css'
import '../App.css'

const Notes = (props) => {
    let navigate = useNavigate()
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        } else {
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])
    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    }
    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" })
    const ref = useRef(null)
    const refClose = useRef(null)
    const onChange = (e) => { 
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const handleClick = () => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
        props.showalert("Updated successfully", "Success")
    }
    return (
        <div className='row m-5'>
            <Addnote Theme={props.Theme} showalert={props.showalert} />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className={`modal-content ${props.Theme ? 'mod-card2' : 'mod-card'}`}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Make Changes</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" name="etitle" className="form-control" id="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edsecription" className="form-label">Description</label>
                                    <textarea type="text" name="edescription" className="form-control" id="edescription" value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" name="etag" className="form-control" id="etag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="mod-btn" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 3 || note.edescription.length < 5} type="button" className="mod-btn" onClick={handleClick}>Update note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-5 fs-5 text-light d-flex justify-content-center'>
                {notes.length === 0 && 'Nothing to display'}
            </div>
            <div className='grid-view'>
                {notes.map((note) => {
                    return <Noteitem key={note._id} note={note} showalert={props.showalert} updateNote={updateNote} Theme={props.Theme} />
                })}
            </div>
        </div>
    )
}

export default Notes
