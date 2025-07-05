/**
 * Authors: Dua Hasan, Scott Green
 * Date: 4 July 2025
 * File: category.js
 * Description: Mongoose model for category documents.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categorySchema = new Schema({
  _id: {
    type: String,
  },
  categoryId: {
    type: Number,
    required: [true, 'Category categoryId is required'] // validations
  },
  categoryName: {
    type: String,
    required: [true, 'Category name is required'],
    minlength: [1, 'Category name must be at least 1 character'],
    maxlength: [100, 'Category name cannot exceed 100 characters'],
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Category description is required'],
    minlength: [1, 'Category description must be at least 1 character'],
    maxlength: [500, 'Category description cannot exceed 500 characters']
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateModified: {
    type: Date
  }
}, {collection: 'Categories'});

categorySchema.pre('save', function(next) { // pre db hook
  if (!this.isNew) {                        // when record saved, date modified is updated
    this.dateModified = new Date();
  }
  next();
})

module.exports = {
  Category: mongoose.model('Category', categorySchema)
}
