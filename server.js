const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');

const express = require('express');
const app =express()
const allNotes = require('./db/db.json');
const res = require('express/lib/response');

//sets express app to hadle parsing 
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

//get nostes bt reading thru db.json, returned saved notes as JSON
app.get('/api/notes', (req, res) =>{
res.json(allNotes.slice(1))
});

app.get('/',(req, reg) =>{
res.sendFile(path.join(__dirname, './public/index.html'));
});

// GET notes return the notes.html file
app.get('/notes', (req, res) => {
res.sendFile(path.join(__dirname, './public/notes.html'));
});

// get * return the index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// create new notes to add unique id to db.json
function createNewNote(body, notesArray) {
    const newNote = body;
    if (!Array.isArray(noetsArray))
    notesArray = [];
    if(noetsArray.length === 0)
    notesArray.push(0);

    body.id = notesArray[0];
    notesArray[0]++;

    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return newNote;
}
app.post('api/notes', (req, res) => {
    const newNote = createNewNote(req.body, allnotes);
    res.json(newNote);
});

// function to remove saved notes from db.json file
function deleteNote(id, notesArray){
    for(let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];
        if(note.id == id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );
            break;
        }
    }
}
// delete saved notes
app.delete('/api/notes/:id',(req, res) => {
    delteNote(req.parms.id, allNotes);
    res.json(true);
});
// start server to begin listing
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});