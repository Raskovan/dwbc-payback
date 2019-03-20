let mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/dwbcpay', { useNewUrlParser: true })
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

let CitySchema = new mongoose.Schema({
    city_name: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('cities', CitySchema)