let express = require('express');
let app = express();
let path = require('path');
let nconf = require('nconf')
let bodyParser = require('body-parser');
// let categoryRoute = require('./src/routes/category');
// let cityRoute = require('./src/routes/city');

nconf.argv().env('__').file({file: './config.json'})

app.use(bodyParser.json())

app.get('/_health', function (req, res) {
    res.json('Karmapachenno');
});

app.use('/api/v1', require('./lib/routes'));


// app.use((req, res, next) => {
//     console.log(`${new Date().toString()} => ${req.originalURL}`, req.body)
//     next()
// })
// app.use(cityRoute);
// app.use(categoryRoute);

// app.use((req, res, next) => {
//     res.status(404).send('Not Found.')
// })

// app.use((err, req, res, next) => {
//     console.error(err.stack )
//     res.sendFile(path.join(__dirname, '../public/500.html'))
// })

let listener = app.listen(process.env.PORT || 8080,  () => 
console.info("Server has started on port " + listener.address().port))