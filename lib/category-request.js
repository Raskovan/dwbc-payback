let CategoryModel = require("./models/category-model");

function Category() { }

Category.prototype.getCategoriesForCity = function (cityObj, callback) {
    if (!cityObj) return callback(new Error('Something went wrong'));

    CategoryModel.find({ city_id: cityObj._id }, function (err, result) {
        if (err) return callback(err);
        if (result) {
            return callback(null, result);
        } else {
            return callback(new Error(`No categories for ${cityObj.city_name}`));
        }
    })
}

Category.prototype.getAllCats = function (callback) {
    CategoryModel.find({}, function (err, allCats) {
        if (err) return callback(err);
        if (allCats) {
            return callback(null, allCats);
        } else {
            return callback(new Error(`No categories to show`));
        }
    });
}

Category.prototype.createCatForCity = function (catObj, callback) {
    let model = new CategoryModel(catObj);
    model.save()
        .then(result => {
            if (!result || result.length === 0) return callback(new Error("Empty body"))
            return callback(null, result);
        })
        .catch(err => { return callback(err) })
}

Category.prototype.updateCategory = function (query, update, callback) {
    CategoryModel.findOneAndUpdate(query, { $set: update, $inc: {__v: 1} }, { new: true }, function (err, result) {
        if (err) return callback(err);
        if (result) {
            return callback(null, result);
        } else {
            return callback(new Error(`Category can't be found`));
        }
    });
}

module.exports = new Category();