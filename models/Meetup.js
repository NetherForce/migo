const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MeetupSchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      required: true
    }
  ],
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  postUser: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  post: {
    type: Schema.Types.ObjectId
  },
  chat: {
    type: Schema.Types.ObjectId,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  location: {
    longitude: {
      type: String
    },
    latitude: {
      type: String
    }
  },
  sport: {
    type: Schema.Types.ObjectId,
    required: true
  },
  timeslot: {
    type: Schema.Types.ObjectId
  }
});

module.exports = mongoose.model('meetup', MeetupSchema);
