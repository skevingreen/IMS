/**
 * Author: Dua Hasan, Scott Green
 * Date: 07/04/2025
 * File: inventory.js
 * Description: Inventory item routes for the IMS API
 */

const express = require("express");
const router = express.Router();
const InventoryItem = require("../models/inventory-item");
const Category = require("../models/category");



// POST /api/inventory - Create new inventory item
router.post("/", async (req, res, next) => {
  try {
    const { name, description, categoryId, supplierId, quantity, price } =
      req.body;

    // Validation
    if (!name || !categoryId || !supplierId || quantity < 0 || price < 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid input data",
      });
    }

    // Check if category and supplier exist
    const categoryExists = await Category.findOne({ categoryId });
    const supplierExists = await Supplier.findOne({ supplierId });

    if (!categoryExists || !supplierExists) {
      return res.status(400).json({
        success: false,
        message: "Invalid category or supplier",
      });
    }

    const newItem = new InventoryItem({
      name: name.trim(),
      description: description ? description.trim() : "",
      categoryId,
      supplierId,
      quantity,
      price,
    });

    const savedItem = await newItem.save();

    res.status(201).json({
      success: true,
      message: "Inventory item created successfully",
      data: savedItem,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Item name must be unique",
      });
    }
    console.error("Error creating inventory item:", error);
    next(error);
  }
});


module.exports = router;
