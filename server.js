let express = require('express')
let app = express()
let path = require('path')
let nconf = require('nconf')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')

nconf.argv().env('__').file({ file: './config.json' })
let uristring = process.env.MONGODB_URI || 'mongodb://localhost:27017/dwbcpay'

mongoose
  .connect(uristring, { useNewUrlParser: true })
  .then(() => console.log('Now connected to MongoDB!'))
  .catch(err => console.error('Something went wrong', err))

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

app.use(bodyParser.json())

app.get('/_health', function (req, res) {
  res.json('Karmapachenno')
})

app.use('/api/v1', require('./lib/routes'))

app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body);
  res.status(404).send('STOP! You are hitting the wrong endpoint. Try again!')
})

let listener = app.listen(process.env.PORT || 8080, () =>
  console.info('Server has started on port ' + listener.address().port))
