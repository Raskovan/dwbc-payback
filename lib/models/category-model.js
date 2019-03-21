let mongoose = require('mongoose')
var Schema = mongoose.Schema;

let uristring = process.env.MONGODB_URI || "mongodb://localhost:27017/dwbcpay";
mongoose.connect(uristring, { useNewUrlParser: true });

let CategorySchema = new mongoose.Schema({
    city_id: Schema.ObjectId,
    category_name: String,
    category_price: Number,
    type_of: String,
    items: [{
        item_name: String,
        item_price: Number
    }]
})

module.exports = mongoose.model('categories', CategorySchema)