let CategoryModel = require('../models/city_model')
let async = require('async')

function Category () { }

// CREATE CATEGORY
Category.prototype.createCategoryForCity = function (cityId, catObj, callback) {
  if (!cityId || !catObj) {
    callback(new Error('Something went wrong'))
  }

  if (catObj.category_name) {
    catObj.type_of = catObj.category_name.toLowerCase().replace(' ', '_')
  }

  async.waterfall([
    function (cb) {
      CategoryModel.findOne({ _id: cityId }, cb)
    },
    function (result, cb) {
      catObj.order = result.categories.length + 1
      CategoryModel.findOneAndUpdate(
        { _id: cityId },
        { $push: { categories: catObj } },
        { new: true }, function (err, resultCat) {
          cb(err, resultCat)
        }
      )
    }
  ], callback)
}

// DELETE CATEGORY
Category.prototype.deleteCategoryForCity = function (cityId, catId, callback) {
  if (!cityId || !catId) return callback(new Error('Something went wrong'))
  CategoryModel.findOneAndUpdate(
    { _id: cityId },
    { $pull: { categories: { _id: catId } }, $inc: { __v: 1 } },
    { new: true },
    callback
  )
// TODO: Find categories wich are next to deleted one and decrease the order by one
}

// UPDATE CATEGORY
Category.prototype.updateCategoryForCity = function (cityId, catId, catObj, callback) {
  if (catObj.category_name) {
    catObj.type_of = catObj.category_name.toLowerCase()
  }

  let formattedObj = {}
  for (let key in catObj) {
    let newKey = 'categories.$.' + key
    formattedObj[newKey] = catObj[key]
  }

  CategoryModel.findOneAndUpdate(
    { _id: cityId, 'categories._id': catId },
    { $set: formattedObj, $inc: { __v: 1 } },
    { new: true },
    callback
  )
}

module.exports = new Category()
