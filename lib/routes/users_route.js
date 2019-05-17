let express = require('express')
var bcrypt = require('bcryptjs')
let async = require('async')
const jwt = require('jsonwebtoken')
// let nodemailer = require('nodemailer')
let router = express.Router()
let User = require('../controllers/user_controller')
let City = require('../controllers/city_controller')
let Mail = require('../controllers/mail_controller')
let CityListModel = require('../models/city_list_model')

const secret = 'karmapachenno'

router.post('/getuser', (req, res) => {
  const { token } = req.body
  jwt.verify(token, secret, function (err, decoded) {
    if (err) {
      res.status(401).send('Unauthorized: Invalid token')
    } else {
      console.info('Requested User:', decoded)
      res.send(decoded)
    }
  })
})

router.post('/signup', (req, res) => {
  const { username, password, city } = req.body

  User.findUser(username, function (err, foundUser) {
    if (err) {
      res.status(500).send({ error: err.toString() })
    } else if (foundUser === null) {
      async.waterfall(
        [
          function (cb) {
            if (!city.match('.*\\d+.*')) {
              let cityName = { city_name: city }
              City.createCity(cityName, cb)
            } else {
              CityListModel.findOne({ city_id: city }, cb)
            }
          },
          function (cityObj, cb) {
            User.createUser(
              username,
              password,
              cityObj.city_name,
              cityObj.city_id,
              cb
            )
          }
        ],
        function (err, result) {
          if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
              res.status(500).send({
                succes: false,
                message: 'City already exist!'
              })
            } else { res.status(500).send({ error: err.toString() }) }
          } else {
            console.info(`User ${result.username} created`)
            Mail.sendMail(result, 'CREATE', (err, info) => {
              if (err) {
                return console.info('Error:', err)
              }
              console.info('Message sent: %s', info.messageId)
            })
            res.send(result)
          }
        }
      )
    } else {
      res.status(500).send({
        succes: false,
        message: 'User already exist!'
      })
    }
  })
})

router.post('/login', (req, res) => {
  const { username, password } = req.body
  console.info('User submitted: ', username, password)

  User.findUser(username, function (err, foundUser) {
    if (err) {
      res.status(500).send({ error: err.toString() })
    } else {
      if (foundUser === null) {
        res.status(401).json({
          sucess: false,
          token: null,
          message: 'Wrong Username!'
        })
      } else {
        console.info('User Found: ', foundUser)
        bcrypt.compare(password, foundUser.password, function (err, result) {
          if (err) res.status(500).send({ error: err.toString() })
          if (result === true) {
            console.info('Valid!')
            let token = jwt.sign(
              {
                username: foundUser.username,
                city_name: foundUser.city_name,
                city_id: foundUser.city_id,
                is_approved: foundUser.is_approved,
                is_admin: foundUser.is_admin
              },
              'karmapachenno',
              { expiresIn: 129600 }
            ) // Signing the token

            res.json({
              user: foundUser,
              sucess: true,
              err: null,
              token
            })
          } else {
            console.info('Entered Password and Hash do not match!')
            res.status(401).json({
              sucess: false,
              token: null,
              message: 'Wrong Password!'
            })
          }
        })
      }
    }
  })
})

router.get('/users', (req, res) => {
  User.getUsers(function (err, result) {
    if (err) {
      res.status(500).send({ error: err.toString() })
    } else {
      console.info('All users requested')
      res.send(result)
    }
  })
})

router.put('/users/:id', (req, res) => {
  if (!req.params.id || Object.keys(req.body).length === 0) {
    return res.status(400).send('Something is wrong')
  }
  User.updateUser(req.params.id, req.body, function (err, result) {
    if (err) {
      res.status(500).send({ error: err.toString() })
    } else {
      console.info('User info was updated')
      // send email to a user
      let action
      if (result.is_approved) {
        action = 'APPROVE'
      } else {
        action = 'REVOKE'
      }
      Mail.sendMail(result, action, (err, info) => {
        if (err) {
          return console.info('Error sending an email:', err)
        }
        console.info('Message sent: %s', info.messageId)
      })
      res.send(result)
    }
  })
})

router.delete('/users/:id', (req, res) => {
  if (!req.params.id) return res.status(400).send('Needs a name')
  User.deleteUser(req.params.id, function (err, result) {
    if (err) {
      res.status(500).send({ error: err.toString() })
    } else if (result) {
      console.info(`User ${result.city_name} deleted`)
      res.status(200).send(result)
    } else {
      res.status(500).send('Something went horribly wrong....')
    }
  })
})

module.exports = router
