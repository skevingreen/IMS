/**
 * Authors: Dua Hasan, Scott Green
 * Date: 4 July 2025
 * File: index.js
 * Description: Routing for the category APIs.
 */

const express = require('express');
const Ajv = require('ajv');
const createError = require('http-errors');
const router = express.Router();
const { Category } = require('../../models/category');
//const { addCategorySchema /*, updateCategorySchema*/ } = require('../../schemas');

//const ajv = new Ajv();
//const validateAddCategory = ajv.compile(addCategorySchema);
//const validateUpdateCategory = ajv.compile(updateCategorySchema);

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find({});

    //console.log("categories: " + categories);
    res.send(categories);
  } catch (err) {
    console.error(`Error while getting categories: ${err}`);
    next(err);
  }
});

module.exports = router;
