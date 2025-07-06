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
//const validateUpdateItem = ajv.compile(updateItemSchema);

router.get('/', async (req, res, next) => {
  try {
    const items = await inventoryItem.find({});

    //console.log("items: " + items);
    res.send(items);
  } catch (err) {
    console.error(`Error while getting items: ${err}`);
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const valid = validateAddItem(req.body);

    if (!valid) {
      return next(createError(400, ajv.errorsText(validateAddItem.errors)));
    }

    const payload = {
      ...req.body
    }

    const item = new inventoryItem(payload);

    await item.save();

    res.send({
      message: 'Item created successfully', id: item._id
    });
  } catch (err) {
    console.error(`Error while creating item: ${err}`); next(err);
  }
});

module.exports = router;
