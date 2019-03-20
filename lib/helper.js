let nconf = require("nconf");
let config = nconf.get("ROUTES");

const checkApiKey = (query) => {
    let authorized;
    if (config.API_KEY) {
        if (!query) {
            authorized = 401;
        }
        if (config.API_KEY && query === config.API_KEY) authorized = 200;
    
        if (!authorized) authorized = 403;
    }
    return authorized;
}

module.exports.checkApiKey = checkApiKey;
