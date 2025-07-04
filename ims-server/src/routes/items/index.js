/**
 * Authors: Dua Hasan, Scott Green
 * Date: 4 July 2025
 * File: index.js
 * Description: Routing for the items APIs.
 */

const express = require('express');
const Ajv = require('ajv');
const createError = require('http-errors');
const router = express.Router();
const { inventoryItem } = require('../../models/inventoryItem');
const { addItemSchema /*, updateGardenSchema*/ } = require('../../schemas');

const ajv = new Ajv();
const validateAddItem = ajv.compile(addItemSchema);
const validateUpdateItem = ajv.compile(updateItemSchema);

// TODO: Implement Unit Tests
router.get('/', async (req, res, next) => {
  try {
    const items = await inventoryItem.find({});

    console.log("items: " + items);
    res.send(items);
  } catch (err) {
    console.error(`Error while getting items: ${err}`);
    next(err);
  }
});

// TODO: Finish implementing /items POST (add validation, etc.)
router.post('/', async (req, res, next) => {
  try {
    //const items = await inventoryItem.find({});
    const items = [];

    //console.log("items: " + items);
    console.log("post /items not yet implemented");
    res.send(items);
  } catch (err) {
    console.error(`Error while creating item: ${err}`);
    next(err);
  }
});

module.exports = router;
