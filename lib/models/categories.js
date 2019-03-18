let mongoose = require('mongoose')
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/dwbcpay')

let CategorySchema = new mongoose.Schema({
    category_name: String,
    city_id: Schema.ObjectId,
    category_price: Number,
    type_of: String,
    items: {
        type: Array,
    }
})

module.exports = mongoose.model('categories', CategorySchema)