const router = require('express').Router();

const notesRouter = require('./notes');  

router.use('/notes', notesRouter);

module.exports = router;

// Import file that has our route, basically, this is a notesrouter function