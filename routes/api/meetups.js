const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Meetup = require('../../models/Meetup');
const UserToMeetup = require('../../models/UserToMeetup');
const User = require('../../models/User');
const Post = require('../../models/Post');
const checkObjectId = require('../../middleware/checkObjectId');

// @route    POST api/meetups
// @desc     Create a meetup
// @access   Private
router.post(
  '/',
  auth,
  check('chat', 'Chat id is required').notEmpty(),
  check('sport', 'Sport id is required').notEmpty(),
  check('location', 'Location id is required').notEmpty(),
  check('name', 'Name id is required').notEmpty(),
  check('avatar', 'Avatar id is required').notEmpty(),
  check('date', 'Date is required').notEmpty(),
  check('text', 'Text is required').notEmpty(),
  checkObjectId('chat'),
  checkObjectId('sport'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { chat, post, date, sport, location, text } = req.body;

      const thePost = await Post.findById(post);
      if(!thePost){
        return res.status(404).json({ msg: 'Post not found' });
      }

      const users = [req.user.id, post.user];

      const newMeetup = new Meetup({
        chat: chat,
        post: post,
        user: req.user.id,
        postUser: thePost.user,
        date: date,
        sport: sport,
        location: location,
        text: text,
        users: users
      });

      let meetup = await newMeetup.save();

      res.json(meetup);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/meetups
// @desc     Get my meetups
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const usertomeetup = await UserToMeetup.find({ user: req.user.id });
    let meetups = [];

    for (let index in usertomeetup) {
      let currMeetup = await Chat.findById(usertomeetup[index].chat);
      if (currMeetup && currMeetup !== null) meetups.push(currMeetup);
    }

    res.json(meetups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/meetups
// @desc     Get post meetups
// @access   Public
router.get('/post/:id', async (req, res) => {
  try {
    let meetups = await Meetup.find({post: req.params.id});

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
    if (meetup.user.toString() !== req.user.id && meetup.postUser.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Delete userToMeetup
    const usertomeetups = await UserToMeetup.find({ meetup: meetup._id });
    usertomeetups.map(async (meetup) => {await meetup.remove()});

    await meetup.remove();

    res.json({ msg: 'Meetup removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

module.exports = router;
