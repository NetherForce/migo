const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MeetupSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  location: {
    type: String
  },
  date: {
    type: Date,
    min: Date.now,
    required: true
  },
  postDate: {
    type: Date,
    default: Date.now
  },
  sport: {
    type: Schema.Types.ObjectId
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('meetup', MeetupSchema);
