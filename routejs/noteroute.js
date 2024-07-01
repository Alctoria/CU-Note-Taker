/* DEPENDENCIES */
const notes = require('express').Router();
const fs = require('fs'); // this is like a must for express
const path = require('path');  // to local path
const db = path.join(__dirname, '../db/db.json');   // to the db.json database
const { id, addNote, findAndRemoveNote } = require('../fscode/fscode.js'); //no code in fscode, but a add and find/remove function is gonna be written there


// get route

// used the cu-module from class as an example for all three notes.functions, really helps a lot since its really similar!

notes.get('/', (req, res) => {

    console.log(`Get request received for /api/notes`)

    fs.readFile(db, 'utf8', (err, data) => {

        if (err) console.error(`Error: ${db} could not be read from.`);

        else res.json(JSON.parse(data));
    });
});

// post route after get route

notes.post('/', (req, res) => {
    console.log(`Post request received for /api/notes`)
    console.log('Please wait to see the request status') // yes i look professional with the two console.log c:

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: id()
        };

        //req.body structure

        const notes = addNote(db, newNote, res);
        } else {
            res.error('Error: note could not be added');  
        }
});

//extra credit 

//CREDITS to the stackoverflow dude who helped me out on this with a 2 hr response time c:

notes.delete('/:id', (req, res) => {

    console.log(`Delete request obtained for /api/notes`)

    const id = req.params.id;
    
    if (req.body) {
        findAndRemoveNote(db, id, res) //if req.body exists do the find/remove
    }
})


// exporting
module.exports = notes;