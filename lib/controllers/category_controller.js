let CategoryModel = require('../models/city_model')

function Category () { }

// CREATE CATEGORY
Category.prototype.createCategoryForCity = function (cityId, catObj, callback) {
  if (!cityId || !catObj) return callback(new Error('Something went wrong'))
  if (catObj.category_name) catObj.type_of = catObj.category_name.toLowerCase()
  CategoryModel.findOne({ _id: cityId }, function (err, result) {
    if (err) return callback(err)
    if (result) {
      catObj.order = result.categories.length + 1
      CategoryModel.findOneAndUpdate({ _id: cityId }, { $push: { categories: catObj }, $inc: { __v: 1 } }, { new: true }, function (err, result) {
        if (err) return callback(err)
        if (result) {
          return callback(null, result)
        } else {
          return callback(new Error(`No categories for ${cityObj.city_name}`))
        }
      })
    }
  })
}

// DELETE CATEGORY
Category.prototype.deleteCategoryForCity = function (cityId, catId, callback) {
  if (!cityId || !catId) return callback(new Error('Something went wrong'))
  CategoryModel.findOneAndUpdate({ _id: cityId }, { $pull: { categories: { _id: catId } }, $inc: { __v: 1 } }, { new: true }, function (err, result) {
    if (err) return callback(err)
    if (result) {
      return callback(null, result)
    } else {
      return callback(new Error(`No categories for ${cityId}`))
    }
  })
}

// UPDATE CATEGORY
Category.prototype.updateCategoryForCity = function (cityId, catId, catObj, callback) {
  if (!cityId || !catId) return callback(new Error('Something went wrong'))
  if (catObj.category_name) catObj.type_of = catObj.category_name.toLowerCase()
  for (let key in catObj) {
    let newName = 'categories.$.' + key
    catObj[newName] = catObj[key]
    delete catObj[key]
  }

  CategoryModel.updateOne({ _id: cityId, 'categories._id': catId }, { $set: catObj }, function (err, result) {
    if (err) return callback(err)
    if (result) {
      return callback(null, result)
    } else {
      return callback(new Error(`No categories for ${cityId}`))
    }
  })
}

module.exports = new Category()
