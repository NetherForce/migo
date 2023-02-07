const express = require('express');
const axios = require('axios');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const Chat = require('../../models/Chat');
const Message = require('../../models/Message');
const User = require('../../models/User');
const UserToChat = require('../../models/UserToChat');

const checkObjectId = require('../../middleware/checkObjectId');

// @route    GET api/messages
// @desc     Get all user chats
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const usertochat = await UserToChat.find({ user: req.user.id });
    let chats = [];

    for (let index in usertochat) {
      let currChat = await Chat.findById(usertochat[index].chat);
      chats.push(currChat);
    }

    res.json(chats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/messages
// @desc     Create chat
// @access   Private
router.post('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let adminUser = await User.findById(req.user.id).select('-password');
    let admin = {
      id: adminUser._id,
      name: adminUser.name,
      avatar: adminUser.avatar
    };

    let users = [];
    const userIds = req.body.userIds;
    users.push(admin);
    for (let index in userIds) {
      if (!mongoose.Types.ObjectId.isValid(userIds[index])) continue;
      let currUser = await User.findById(userIds[index]).select('-password');
      users.push(currUser);
    }

    if (users.length <= 1)
      return res.status(500).send('Not enough people to create a chat');

    let chat = new Chat({
      admin: admin,
      users: users
    });

    const chatId = chat._id;

    for (let index in userIds) {
      if (!mongoose.Types.ObjectId.isValid(userIds[index])) continue;
      let usertochat = new UserToChat({
        user: userIds[index],
        chat: chatId
      });
      await usertochat.save();
    }
    let usertochat = new UserToChat({
      user: adminUser._id,
      chat: chatId
    });
    await usertochat.save();

    chat.save();
    return res.json(chat);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

// @route    DELETE api/messages/:id
// @desc     Delete a chat
// @access   Private
router.delete('/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return res.status(404).json({ msg: 'Chat not found' });
    }

    // Check user
    if (chat.admin.id.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await chat.remove();

    res.json({ msg: 'Chat deleted' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    POST api/messages/add
// @desc     Add user to chat
// @access   Private
router.post(
  '/add',
  [
    auth,
    check('chat', 'Chat is required').notEmpty(),
    check('user', 'User is required').notEmpty(),
    checkObjectId('chat'),
    checkObjectId('user')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let chat = await Chat.findById(req.body.chat);
      if (!chat) {
        return res.status(404).json({ msg: 'Chat not found' });
      }

      let user = await User.findById(req.body.user).select('-password');
      chat.users.push(user);

      await chat.save();

      let usertochat = new UserToChat({
        user: req.body.user,
        chat: chat._id
      });

      await usertochat.save();
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/messages/remove
// @desc     Remove a user form chat
// @access   Private
router.delete(
  '/remove',
  [
    auth,
    check('chat', 'Chat is required').notEmpty(),
    check('user', 'User is required').notEmpty(),
    checkObjectId('chat'),
    checkObjectId('user')
  ],
  async (req, res) => {
    try {
      const chat = await Chat.findById(req.params.id);

      if (!chat) {
        return res.status(404).json({ msg: 'Chat not found' });
      }

      // Check user
      if (chat.admin.id.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      let theIndex = null;
      for (let index in chat.users) {
        if (chat.users[index].id.toString() === req.body.user) {
          theIndex = index;
          break;
        }
      }
      chat.users.splice(theIndex, 1);

      await chat.save();

      let usertochat = await UserToChat.find({
        user: req.body.user,
        chat: req.body.chat
      });
      await usertochat.remove();

      res.json({ msg: 'User removed' });
    } catch (err) {
      console.error(err.message);

      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/messages/from/:id
// @desc     Get all chat messages
// @access   Private
router.get('/from/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const messages = await Message.find({ to: req.params.id });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/messages/send
// @desc     Send message
// @access   Private
router.post(
  '/send',
  [
    auth,
    check('text', 'Text is required').notEmpty(),
    check('chat', 'Chat is required').notEmpty(),
    checkObjectId('chat')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      message = new Message({
        from: req.user.id,
        to: req.body.chat,
        text: req.body.text
      });
      await message.save();
      return res.json(message);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/messages/unsend/:id
// @desc     Delete a message
// @access   Private
router.delete('/unsend/:id', [auth, checkObjectId('id')], async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ msg: 'Message not found' });
    }

    const chat = await Chat.findById(message.to);
    if (!chat) {
      return res.status(404).json({ msg: 'Chat not found' });
    }

    // Check user
    if (
      chat.admin.id.toString() !== req.user.id &&
      message.from.toString() !== req.user.id
    ) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await message.remove();

    res.json({ msg: 'Message deleted' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

module.exports = router;
