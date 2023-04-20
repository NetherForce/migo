var fs = require('fs');
const express = require('express');
const cfg = require('../../config/cfg');
const router = express.Router();

const idFormat = new RegExp('^[a-zA-Z0-9]+\\.[a-zA-Z0-9]+$');

// @route    GET api/media/:id
// @desc     Get image
// @access   Private
router.get('/:id', [], async (req, res) => {
  const id = req.params.id;
  if (idFormat.test(id)) {
    const path = cfg.mediaPath + id;
    var filestream = fs.createReadStream(path);
    filestream.pipe(res);
  } else {
    res.status(404).send('Not found');
  }
});

module.exports = router;
