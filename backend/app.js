const express = require('express');
const path = require('path');
const searchRouter = require('./router/searchRouter');
const cors = require('cors');

const app = express();
// Enable CORS for all routes
app.use(cors());
app.use('/api/clips', express.static(path.join(__dirname, 'clips')));

// Serve static files from the "thumbnail" folder
app.use('/api/thumbnails', express.static(path.join(__dirname, 'thumbnails')));

app.use('/api/v1', searchRouter);

module.exports = app;
