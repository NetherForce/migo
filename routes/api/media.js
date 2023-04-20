const express = require('express');
const cfg = require('../../config/cfg');
const router = express.Router();
var fs = require('fs');
var path = require('path');

const idFormat = new RegExp('^[a-zA-Z0-9]+\\.[a-zA-Z0-9]+$');

// @route    GET api/media/:id
// @desc     Get image
// @access   Private
router.get('/:id', [], async (req, res) => {
  const id = req.params.id;
  if (idFormat.test(id)) {
    const filePath = path.join(__dirname, '..', '..', 'media', id);
    var filestream = fs.createReadStream(filePath);
    filestream.pipe(res);
  } else {
    res.status(404).send('Not found');
  }
});

// @route    POST api/media/:id
// @desc     Upload image
// @access   Private
router.post('/:id', [], async (req, res) => {
  const id = req.params.id;
  if (idFormat.test(id)) {
    const filePath = path.join(__dirname, '..', '..', 'media', id);
    var filestream = fs.createWritetream(filePath);
    filestream.pipe(res);
  } else {
    res.status(404).send('Not found');
  }
});

module.exports = router;
