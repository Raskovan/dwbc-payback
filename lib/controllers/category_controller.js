let CategoryModel = require('../models/city_model')

function Category () { }

// CREATE CATEGORY
Category.prototype.createCategoryForCity = function (cityId, catObj, callback) {
  if (!cityId || !catObj) {
    return callback(new Error('Something went wrong'))
  }

  if (catObj.category_name) {
    catObj.type_of = catObj.category_name.toLowerCase()
  }

  return CategoryModel.findOne(
    { _id: cityId },
    function (err, result) {
      if (err) {
        return callback(err)
      }
      if (result) {
        catObj.order = result.categories.length + 1
        CategoryModel.findOneAndUpdate(
          { _id: cityId },
          { $push: { categories: catObj } },
          { new: true },
          callback
        )
      }
    })
}

// DELETE CATEGORY
Category.prototype.deleteCategoryForCity = function (cityId, catId, callback) {
  if (!cityId || !catId) return callback(new Error('Something went wrong'))
  return CategoryModel.findOneAndUpdate(
    { _id: cityId },
    { $pull: { categories: { _id: catId } }, $inc: { __v: 1 } },
    { new: true },
    callback
  )
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

  return CategoryModel.findOneAndUpdate(
    { _id: cityId, 'categories._id': catId },
    { $set: formattedObj, $inc: { __v: 1 } },
    { new: true },
    callback
  )
}

module.exports = new Category()
