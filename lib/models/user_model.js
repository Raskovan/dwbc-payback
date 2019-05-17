let mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  city_name: {
    type: String,
    required: false
  },
  city_id: {
    type: String,
    required: false
  },
  is_approved: {
    type: Boolean,
    required: false,
    default: false
  },
  is_admin: {
    type: Boolean,
    required: false,
    default: false
  }
})

module.exports = mongoose.model('User', UserSchema)
