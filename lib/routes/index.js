let express = require('express');

module.exports = (function() {
    let router = express.Router();
    router.use('/city', require('./city'));
    return router;
}());