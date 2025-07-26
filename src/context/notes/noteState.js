import { useState } from "react";
import noteContext from "./noteContext";

const host = process.env.REACT_APP_HOST;

const NoteState = (props) => { 
    const notesInitail = []
    const [notes, setNotes] = useState(notesInitail)

    // Get all notes
    const getNotes = async () => { 
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        })
        const json = await response.json()
        console.log(json)
        setNotes(json)

    }

    // Add a new note
    const addnote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        })
        const newNote = await response.json()
        setNotes(notes.concat(newNote))
    }

    // Delete note
    const deleteNote = async (id) => { 
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        })
        const json = await response.json()
        console.log(json)
        const newNotes = notes.filter((note) => {
            return note._id !== id
        })
        setNotes(newNotes)
    }

    // Edit note
    const editNote = async (id, title, description, tag) => { 
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        })
        const json = await response.json()
        console.log(json)
        for (let index = 0; index < notes.length; index++) {
            const el = notes[index];
            if (el._id === id) {
                el.title = title;
                el.description = description;
                el.tag = tag;
                break;
            }
        }
        setNotes(JSON.parse(JSON.stringify(notes)))
    }
    
    return (
        <noteContext.Provider value={{notes, getNotes, addnote, deleteNote, editNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;