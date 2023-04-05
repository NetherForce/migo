const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimeslotSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId
  },
  positive: {
    type: Boolean,
    default: true
  },
  startDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  endDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  startTime: [{
    type: Integer,
    isRequired: true
  }],
  duration: {
    type: Integer,
    isRequired: true
  },
  day: {
    monday: {
      type: Boolean,
      default: false
    },
    tuesday: {
      type: Boolean,
      default: false
    },
    wednesday: {
      type: Boolean,
      default: false
    },
    thursday: {
      type: Boolean,
      default: false
    },
    friday: {
      type: Boolean,
      default: false
    },
    saturday: {
      type: Boolean,
      default: false
    },
    sunday: {
      type: Boolean,
      default: false
    }
  }
});

module.exports = mongoose.model('timeslot', TimeslotSchema);
