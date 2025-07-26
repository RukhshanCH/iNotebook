const express = require('express')
const router = express.Router()
const Notes = require('../models/Notes')
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');

// Fetch all notes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)  
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

// Add a new note
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const{ title, description, tag } = req.body
    try {
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savednote = await note.save()
        res.json(savednote)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

// Update note
router.put('/updatenote/:id', fetchuser, async (req, res) => { 
    const { title, description, tag } = req.body
    try {
        const newNote = {}
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if (tag) { newNote.tag = tag }

        let note = await Notes.findById(req.params.id)
        if(!note){return res.status(404).send("Not Found")}
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        res.json({ "Success": "Note has been updated", note})
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

// Delete note
router.delete('/deletenote/:id', fetchuser, async (req, res) => { 
    try {
        let note = await Notes.findById(req.params.id)
        if(!note){return res.status(404).send("Not Found")}
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"Success": "Note has been deleted", note: note})
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})

module.exports = router;