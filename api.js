// listing the dependencies constants
const express = require('express');
const api = require('./routes/index.js');  // router
const path = require('path');  // local path

const PORT = process.env.PORT || 3001; // port

const app = express(); //express app const


// middleware functions

app.use(express.json());  // Parse JSON 
app.use(express.urlencoded({ extended: true }));  // Parse urlencoded form
app.use(express.static('public')); 

app.use('/api', api);  // Send all "/api" starting strings to index.js as requests        

app.get('/', (req, res) =>  // sending file to home page
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>  // same code, but to notes page as well
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


// code that functions as a port listener

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);