const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Meetup = require('../../models/Meetup');
const UserToMeetup = require('../../models/UserToMeetup');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Timeslot = require('../../models/Timeslot');
const checkObjectId = require('../../middleware/checkObjectId');

const daysOfTheWeek = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
];

const days = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false
}

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
      const { chat, post, user, date, sport, location, text, duration, avatar, name } =
        req.body;

      const theUser = await User.findById(req.user.id).select('-password');
      if (!theUser) {
        return res.status(404).json({ msg: 'User not found' });
      }

      let timeslotId;

      if(duration !== undefined && duration !== null){
        let newTimeslot = new Timeslot({
          postId: post,
          positive: false,
          startDate: date,
          endDate: date,
          startTime: [new Date(date).getHours() * 60 + new Date(date).getMinutes()],
          duration: duration,
          day: { ...days, [daysOfTheWeek[new Date(date).getDay()]]: true }
        });

        let timeslot = await newTimeslot.save();

        timeslotId = timeslot._id;
      }

      const users = req.user.id.toString() !== user.toString() ? [req.user.id, user] : [user];

      const newMeetup = new Meetup({
        chat: chat,
        post: post,
        user: req.user.id,
        postUser: user,
        date: date,
        sport: sport,
        location: location,
        text: text,
        users: users,
        avatar: theUser.avatar,
        name: theUser.name,
        timeslot: timeslotId
      });

      let meetup = await newMeetup.save();

      for (let index in users) {
        let user = users[index];

        let newUserToMeetup = new UserToMeetup({
          user: user,
          meetup: meetup._id
        });

        newUserToMeetup.save();
      }

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
      let currMeetup = await Meetup.findById(usertomeetup[index].meetup);
      if (currMeetup && currMeetup !== null) meetups.push(currMeetup);
    }

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
    if (
      meetup.user.toString() !== req.user.id &&
      meetup.postUser.toString() !== req.user.id
    ) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Delete timeslot
    if(meetup.timeslot){
      const timeslot = await Timeslot.findById(req.params.id);

      if(timeslot){
        await timeslot.remove();
      }
    }

    // Delete userToMeetup
    const usertomeetups = await UserToMeetup.find({ meetup: meetup._id });
    usertomeetups.map(async (meetup) => {
      await meetup.remove();
    });

    await meetup.remove();

    res.json({ msg: 'Meetup removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

module.exports = router;

// @route    PUT api/meetups/:id
// @desc     Update a meetup
// @access   Private
router.put('/:id', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const meetup = await Meetup.findById(req.params.id);
    const { date } = req.body;

    meetup.date = date;
    await meetup.save();

    res.json(meetup);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
