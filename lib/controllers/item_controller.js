let ItemModel = require('../models/city_model')

function Item () { }

// CREATE ITEM
Item.prototype.createItemForCategoryForCity = function (cityId, catId, itemObj, callback) {
  if (!cityId || !catId || !itemObj) return callback(new Error('Something went wrong'))
  ItemModel.findOneAndUpdate({ _id: cityId, 'categories._id': catId }, { $push: { 'categories.$.items': itemObj }, $inc: { __v: 1 } }, { new: true }, function (err, result) {
    if (err) return callback(err)
    if (result) {
      return callback(null, result)
    } else {
      return callback(new Error(`No items for ${itemObj.item_name}`))
    }
  })
}

// DELETE ITEM
Item.prototype.deleteItemForCategoryForCity = function (cityId, catId, itemId, callback) {
  if (!cityId || !catId || !itemId) return callback(new Error('Something went wrong'))
  ItemModel.findOneAndUpdate({ _id: cityId, 'categories._id': catId }, { $pull: { 'categories.$.items': { _id: itemId } }, $inc: { __v: 1 } }, { new: true }, function (err, result) {
    if (err) return callback(err)
    if (result) {
      return callback(null, result)
    } else {
      return callback(new Error(`No categories for ${cityId}`))
    }
  })
}

// UPDATE CATEGORY
// Category.prototype.updateCategoryForCity = function (cityId, catId, catObj, callback) {
//   if (!cityId || !catId) return callback(new Error('Something went wrong'))
//   if (catObj.category_name) catObj.type_of = catObj.category_name.toLowerCase()
//   for (let key in catObj) {
//     let newName = 'categories.$.' + key
//     catObj[newName] = catObj[key]
//     delete catObj[key]
//   }

//   CategoryModel.updateOne({ _id: cityId, 'categories._id': catId }, { $set: catObj }, function (err, result) {
//     if (err) return callback(err)
//     if (result) {
//       return callback(null, result)
//     } else {
//       return callback(new Error(`No categories for ${cityId}`))
//     }
//   })
// }

module.exports = new Item()
