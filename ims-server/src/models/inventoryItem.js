const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let inventoryItemSchema = new Schema({
  /*
  _id: String,
  categoryId: Number,
  supplierId: Number,
  name: String,
  description: String,
  quantity: Number,
  price: Number,
  dateCreated: Date,
  dateModified: Date
  */

  _id: {
    type: String,
  },
  categoryId: {
    type: Number,
    required: [true, 'Item categoryId is required'] // validations
  },
  supplierId: {
    type: Number,
    required: [true, 'Item supplierId is required']
  },
  name: {
    type: String,
    required: [true, 'Item name is required'],
    minlength: [1, 'Item name must be at least 1 character'],
    maxlength: [100, 'Item name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Item description is required'],
    minlength: [1, 'Item description must be at least 1 character'],
    maxlength: [500, 'Item description cannot exceed 500 characters']
  },
  quantity: {
    type: Number,
    required: [true, 'Item quantity is required']
  },
  price: {
    type: Number,
    required: [true, 'Item price is required']
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateModified: {
    type: Date
  }
});

inventoryItemSchema.pre('save', function(next) {  // pre db hook
  if (!this.isNew) {  // when record saved, date modified is updated
    this.dateModified = new Date();
  }
  next();
})

module.exports = {
  inventoryItem: mongoose.model('inventoryItem', inventoryItemSchema)
}
