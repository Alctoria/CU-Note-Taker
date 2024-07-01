/* DEPENDENCIES */
const fs = require('fs');

/* FUNCTIONS */
/* Generate random ID */
function id() {
    let result = ""
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charsLength = chars.length;
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * charsLength));
    }
    return result;
}

/* Add new note to existing notes */
function addNote(db, newNote, res) {
    fs.readFile(db, (err, data) => {
        if (err) console.error(`Error: ${db} could not be read from.`)
        else {
            let notes = JSON.parse(data);
            notes.push(newNote)
            fs.writeFile(db, JSON.stringify(notes, null, 4), (err) => {
                if (err) console.error(`Error: ${db} could not be written to.`)
                else res.json(notes)
            }); 
        }        
    })
    return [];
}

function findAndRemoveNote(db, id, res) {
    fs.readFile(db, (err, data) => {
        if (err) console.error(`Error: ${db} could not be read from.`)
        else {
            let notes = JSON.parse(data) || [];
            for (note in notes) {
                if (notes[note].id === id) {
                    console.log(`Removing note with ID: ${id}.`)
                    notes.splice(note, 1);

                    fs.writeFile(db, JSON.stringify(notes, null, 4), (err) => {
                        if (err) console.error(`Error: ${db} could not be written to.`)
                        return res.json(notes);
                    }); 
                }
            }
        }        
    })
    return [];
}

/* EXPORTS */
module.exports = { id, addNote, findAndRemoveNote };