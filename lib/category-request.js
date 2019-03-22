let CategoryModel = require('./models/city-model')

function Category () { }

// CREATE CATEGORY
Category.prototype.createCategoryForCity = function (cityId, catObj, callback) {
  if (!cityId || !catObj) return callback(new Error('Something went wrong'))
  CategoryModel.findOneAndUpdate({ _id: cityId }, { $push: { categories: catObj }, $inc: { __v: 1 } }, { new: true }, function (err, result) {
    if (err) return callback(err)
    if (result) {
      return callback(null, result)
    } else {
      return callback(new Error(`No categories for ${cityObj.city_name}`))
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
  let modKey = Object.keys(catObj)[0]
  let newName = 'categories.$.' + modKey
  catObj[newName] = catObj[modKey]
  delete catObj[modKey]
  CategoryModel.updateOne({ _id: cityId, 'categories._id': catId }, { $set: catObj, $inc: { __v: 1 } }, { new: true }, function (err, result) {
    if (err) return callback(err)
    if (result) {
      return callback(null, result)
    } else {
      return callback(new Error(`No categories for ${cityId}`))
    }
  })
}

// Category.prototype.getAllCats = function (callback) {
//   CategoryModel.find({}, function (err, allCats) {
//     if (err) return callback(err)
//     if (allCats) {
//       return callback(null, allCats)
//     } else {
//       return callback(new Error(`No categories to show`))
//     }
//   })
// }

// Category.prototype.createCatForCity = function (catObj, callback) {
//   let model = new CategoryModel(catObj)
//   model.save()
//     .then(result => {
//       if (!result || result.length === 0) return callback(new Error('Empty body'))
//       return callback(null, result)
//     })
//     .catch(err => { return callback(err) })
// }

// Category.prototype.updateCategory = function (query, update, callback) {
//   if (update.items) {
//     CategoryModel.update(query, { $pull: { items: update.items[0] }, $inc: { __v: 1 } }, { new: true }, function (err, result) {
//       if (err) return callback(err)
//       if (result) {
//         return callback(null, result)
//       } else {
//         return callback(new Error(`Category can't be found`))
//       }
//     })
//   } else {
//     CategoryModel.findOneAndUpdate(query, { $set: update, $inc: { __v: 1 } }, { new: true }, function (err, result) {
//       if (err) return callback(err)
//       if (result) {
//         return callback(null, result)
//       } else {
//         return callback(new Error(`Category can't be found`))
//       }
//     })
//   }
// }

// Category.prototype.deleteCategory = function (query, callback) {
//   CategoryModel.findOneAndDelete(query, function (err, result) {
//     if (err) return callback(err)
//     if (result) {
//       return callback(null, result)
//     } else {
//       return callback(new Error(`Category can't be found`))
//     }
//   })
// }

module.exports = new Category()
