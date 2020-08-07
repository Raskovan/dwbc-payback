let express = require('express')
let app = express()
let nconf = require('nconf')
var cors = require('cors')

let bodyParser = require('body-parser')
let mongoose = require('mongoose')

nconf.argv().env('__').file({ file: './config.json' })
let uristring = nconf.get('MONGODB_URI')

mongoose
  .connect(uristring, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.info('Now connected to MongoDB!'))
  .catch(err => console.error('Something went wrong', err))

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

app.use(bodyParser.json())
app.use(cors())

app.get('/_health', function (req, res) {
  res.json('Karmapachenno')
})

app.use('/api/v1', require('./lib/routes'))

app.use((req, res, next) => {
  console.info(`${new Date().toString()} => ${req.originalUrl}`, req.body)
  res.status(404).send('STOP! You are hitting the wrong endpoint. Try again!')
})

let listener = app.listen(process.env.PORT || 8080, () =>
  console.info('Server has started on port ' + listener.address().port),
)
