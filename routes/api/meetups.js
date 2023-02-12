const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Meetup = require('../../models/Meetup');
const User = require('../../models/User');
const checkObjectId = require('../../middleware/checkObjectId');

// @route    POST api/meetups
// @desc     Create a meetup
// @access   Private
router.post(
  '/',
  auth,
  check('text', 'Text is required').notEmpty(),
  check('sport', 'Sport is required').notEmpty(),
  checkObjectId('sport'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const { description, location, date, sport, expLevel } = req.body;

      const newMeetup = new Meetup({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
        location: location,
        date: date,
        sport: sport
      });

      const meetup = await newMeetup.save();

      res.json(meetup);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/meetups
// @desc     Get all meetups
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const meetups = await Meetup.find().sort({ date: -1 });
    res.json(meetups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/meetups/:id
// @desc     Get meetup by ID
// @access   Private
router.get('/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const meetup = await Meetup.findById(req.params.id);

    if (!meetup) {
      return res.status(404).json({ msg: 'Meetup not found' });
    }

    res.json(meetup);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/meetups/:id
// @desc     Delete a meetup
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const meetup = await Meetup.findById(req.params.id);

    if (!meetup) {
      return res.status(404).json({ msg: 'Meetup not found' });
    }

    // Check user
    if (meetup.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await meetup.remove();

    res.json({ msg: 'Meetup removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    PUT api/meetups/like/:id
// @desc     Like a meetup
// @access   Private
router.put('/like/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const meetup = await Meetup.findById(req.params.id);

    // Check if the meetup has already been liked
    if (meetup.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Meetup already liked' });
    }

    meetup.likes.unshift({ user: req.user.id });

    await meetup.save();

    return res.json(meetup.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/meetups/unlike/:id
// @desc     Unlike a meetup
// @access   Private
router.put('/unlike/:id', auth, checkObjectId('id'), async (req, res) => {
  try {
    const meetup = await Meetup.findById(req.params.id);

    // Check if the meetup has not yet been liked
    if (!meetup.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'Meetup has not yet been liked' });
    }

    // remove the like
    meetup.likes = meetup.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await meetup.save();

    return res.json(meetup.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/meetups/comment/:id
// @desc     Comment on a meetup
// @access   Private
router.post(
  '/comment/:id',
  auth,
  checkObjectId('id'),
  check('text', 'Text is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const meetup = await Meetup.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      meetup.comments.unshift(newComment);

      await meetup.save();

      res.json(meetup.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/meetups/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const meetup = await Meetup.findById(req.params.id);

    // Pull out comment
    const comment = meetup.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    meetup.comments = meetup.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await meetup.save();

    return res.json(meetup.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
