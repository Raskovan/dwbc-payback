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
  return ItemModel.findOneAndUpdate(
    { _id: cityId, 'categories._id': catId },
    { $pull: { 'categories.$.items': { _id: itemId } }, $inc: { __v: 1 } },
    { new: true },
    callback
  )
}

// UPDATE ITEM
Item.prototype.updateItemForCategoryForCity = function (cityId, catId, itemId, itemObj, callback) {

  let formattedObj = {}
  for (let key in itemObj) {
    let newKey = 'categories.$[i].items.$[j].' + key
    formattedObj[newKey] = itemObj[key]
  }

  return ItemModel.update(
    { },
    { $set: formattedObj },
    { arrayFilters: [{ 'i._id': catId }, { 'j._id': itemId }], new: true },
    callback
  )
}

module.exports = new Item()
