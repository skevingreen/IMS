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
const { addItemSchema, updateItemSchema } = require('../../schemas');

const ajv = new Ajv();
const validateAddItem = ajv.compile(addItemSchema);
const validateUpdateItem = ajv.compile(updateItemSchema);

router.get('/', async (req, res, next) => {
  try {
    const items = await inventoryItem.find({});

    res.send(items);
  } catch (err) {
    console.error(`Error while getting items: ${err}`);
    next(err);
  }
});

router.get('/:inventoryItemId', async (req, res, next) => {
  try {
    const tempItem = await inventoryItem.findOne({ _id: req.params.inventoryItemId }); // don't use find() here or you're gonna have a bad time

    if (!tempItem) {
      return res.status(404).send({ message: 'Item not found' });
    }
    res.send(tempItem);
  } catch (err) {
    console.error(`Error while getting item: ${err}`);
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
      ...req.body // expand the body
    }

    const item = new inventoryItem(payload);

    await item.save();

    res.send({
      message: 'Item created successfully',
      id: item._id
    });
  } catch (err) {
    console.error(`Error while creating item: ${err}`); next(err);
  }
});

router.patch('/:inventoryItemId', async (req, res, next) => {
  try {
    // using a variable called "item" hoses the query for some reason
    const tempItem = await inventoryItem.findOne({ _id: req.params.inventoryItemId });

     if (!tempItem) {
      return res.status(404).send({ message: 'Item not found' });
    }

    const valid = validateUpdateItem(req.body);

    if(!valid) {
      return next(createError(400, ajv.errorsText(validateUpdateItem.errors)));
    }

    tempItem.set(req.body);
    await tempItem.save();

    res.send({
      message: 'Item updated successfully',
      id: tempItem._id
    });
  } catch (err) {
    console.error(`Error while updating item: ${err}`);
    next(err);
  }
});

module.exports = router;
