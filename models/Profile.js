const mongoose = require('mongoose');

const EXPERIENCE_LEVELS = {
  BEGINNER: 'BEGINNER',
  INTERMEDIATE: 'INTERMEDIATE',
  EXPERT: 'EXPERT'
}

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  location: {
    type: String
  },
  status: {
    type: String
  },
  bio: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      sport: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      expLevel: {
        type: String,
        enum: Object.values(EXPERIENCE_LEVELS),
        default: EXPERIENCE_LEVELS.BEGINNER
      },
      location: {
        type: String
      },
      club: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      main: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('profile', ProfileSchema);
