let nodemailer = require('nodemailer')
let nconf = require('nconf')
let config = nconf.get()
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2

const oauth2Client = new OAuth2(
  config.CLIENT_ID,
  config.CLIENT_SECRET,
  'https://developers.google.com/oauthplayground', // Redirect URL
)

oauth2Client.setCredentials({
  refresh_token:
    '1//04tnQPWC1GKw7CgYIARAAGAQSNwF-L9IrC5IyJaGHsRYY8sJ8X7AtpvwSxebxPnT0CaGVk-1Hyw1epeUU7ghMCpECh6Yomz3lgts',
})
const accessToken = oauth2Client.getAccessToken()

function Mail() {}

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
              <p>Login <a href='https://peiback.surge.sh/login'>https://peiback.surge.sh/login</a></p>
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

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: config.NOTIFICATION_EMAIL,
      clientId: config.CLIENT_ID,
      clientSecret: config.CLIENT_SECRET,
      refreshToken: config.REFRESH_TOKEN,
      accessToken: accessToken,
    },
  })

  let mailOptions = {
    from: '"PaiBack Notification" <alexey.katalkin@gmail.com>',
    to: emailToSend,
    subject: emailSubject,
    text: textEmail,
    html: output,
  }
  transporter.sendMail(mailOptions, callback)
}

module.exports = new Mail()
