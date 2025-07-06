/**
 * Authors: Dua Hasan, Scott Green
 * Date: 4 July 2025
 * File: index.js
 * Description: Routing for the supplier APIs.
 */

const express = require('express');
const Ajv = require('ajv');
const createError = require('http-errors');
const router = express.Router();
const { addSupplierSchema /*, updateGardenSchema*/ } = require('../../schemas');
const { Supplier } = require('../../models/supplier');

const ajv = new Ajv();
//const validateAddItem = ajv.compile(addSupplierSchema);
//const validateUpdateItem = ajv.compile(updateItemSchema);

router.get('/', async (req, res, next) => {
  try {
    const suppliers = await Supplier.find({});

    //console.log("suppliers: " + suppliers);
    res.send(suppliers);
  } catch (err) {
    console.error(`Error while getting suppliers: ${err}`);
    next(err);
  }
});

module.exports = router;
