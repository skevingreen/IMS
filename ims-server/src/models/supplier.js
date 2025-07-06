/**
 * Authors: Dua Hasan, Scott Green
 * Date: 4 July 2025
 * File: supplier.js
 * Description: Mongoose model for supplier documents.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let supplierSchema = new Schema({
  _id: {
    type: String,
  },
  supplierId: {
    type: Number,
    required: [true, 'Supplier supplierId is required'] // validations
  },
  supplierName: {
    type: String,
    required: [true, 'Supplier supplierName is required'],
    minlength: [1, 'Supplier supplierName must be at least 1 character'],
    maxlength: [100, 'Supplier supplierName cannot exceed 100 characters'],
    unique: true
  },
  contactInformation: {
    type: String,
    required: [true, 'Supplier contactInformation is required'],
    minlength: [12, 'Supplier contactInformation must be at least 12 character'],
    maxlength: [12, 'Supplier contactInformation cannot exceed 12 characters']
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateModified: {
    type: Date
  }
}, {collection: 'Suppliers'});

supplierSchema.pre('save', function(next) { // pre db hook
  if (!this.isNew) {                        // when record saved, date modified is updated
    this.dateModified = new Date();
  }
  next();
})

module.exports = {
  Supplier: mongoose.model('Supplier', supplierSchema)
}
