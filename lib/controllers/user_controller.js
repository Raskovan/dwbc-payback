var bcrypt = require('bcryptjs')
let UserModel = require('../models/user_model')

function User () {}

User.prototype.createUser = function (username, password, cityName, cityId, callback) {
  const saltRounds = 10
  bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) {
      return callback(err)
    }
    let model = new UserModel({ username: username, password: hash, city_id: cityId, city_name: cityName })
    return model.save(callback)
  })
}

User.prototype.findUser = function (username, callback) {
  UserModel.findOne({ username: username }, callback)
}

User.prototype.getUsers = function (callback) {
  UserModel.find({}, callback)
}

User.prototype.updateUser = function (userId, userObj, callback) {
  UserModel.findOneAndUpdate(
    { _id: userId },
    { $set: userObj, $inc: { __v: 1 } },
    { new: true },
    callback
  )
}

User.prototype.deleteUser = function (userId, callback) {
  UserModel.findOneAndDelete({ _id: userId }, callback)
}

module.exports = new User()
