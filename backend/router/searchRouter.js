const express = require('express');
const searchController = require('./../controller/searchController');
const videoController = require('./../controller/videoController');
const router = express.Router();

router
  .route('/:keyword')
  .get(searchController.srtReader, videoController.videoCutter);
module.exports = router;
