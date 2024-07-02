const express = require('express');
const api = require('./routes/index.js');  // Import router
const path = require('path');  // Get local path

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());  // Parse JSON 
app.use(express.urlencoded({ extended: true }));  // Parse urlencoded
app.use(express.static('public'));  // Serve up static assets

app.use('/api', api);  // Send all the requests with api to index         

app.get('/', (req, res) =>  
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>  
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);