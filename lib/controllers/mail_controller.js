let nodemailer = require('nodemailer')
let nconf = require('nconf')
let config = nconf.get()

function Mail () {}

// SEND NOTIFICATION
Mail.prototype.sendMail = function (dataToSend, action, callback) {
  let output = `
              <h3>You have new User request</h3>
              <b>Details</b>
              <p>Email: ${dataToSend.username}</p>
              <p>City: ${dataToSend.city_name}</p>
              `
  let emailToSend = 'alexey.katalkin@gmail.com'
  let emailSubject = 'PaiBack | User Request'
  let textEmail = 'New User Request'

  if (action === 'APPROVE') {
    emailToSend = dataToSend.username
    emailSubject = 'PaiBack | User Approved'
    textEmail = 'User Approved'
    output = `
              <h3>You request was approved</h3>
              <b>Details</b>
              <p>Email: ${dataToSend.username}</p>
              <p>City: ${dataToSend.city_name}</p>
              <p>Login <a href='http://paiback.surge.sh/login'>http://paiback.surge.sh/login</a></p>
              `
  } else if (action === 'REVOKE') {
    emailToSend = dataToSend.username
    emailSubject = 'PaiBack | Access Revoked'
    textEmail = 'Access Revoked'
    output = `
              <h3>You access was revoked</h3>
              <b>Details</b>
              <p>Email: ${dataToSend.username}</p>
              <p>City: ${dataToSend.city_name}</p>
              `
  }

  let transporter = nodemailer.createTransport({
    host: config.NOTIFICATION_EMAIL_HOST,
    port: config.NOTIFICATION_EMAIL_PORT,
    secure: false,
    auth: {
      user: config.NOTIFICATION_EMAIL,
      pass: config.NOTIFICATION_EMAIL_PASSWORD
    }
    // tls: {
    //   rejectUnauthorized: false
    // }
  })

  let mailOptions = {
    from: '"PaiBack Notification" <admin@buddhism-today.org>',
    to: emailToSend,
    subject: emailSubject,
    text: textEmail,
    html: output
  }
  transporter.sendMail(mailOptions, callback)
}

module.exports = new Mail()
