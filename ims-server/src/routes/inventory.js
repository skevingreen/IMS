/**
 * Author: Student Name
 * Date: Current Date
 * File: inventory.js
 * Description: Inventory item routes for the IMS API
 */

const express = require("express");
const router = express.Router();
const InventoryItem = require("../models/inventory-item");
const Category = require("../models/category");
const Supplier = require("../models/supplier");

// GET /api/inventory - Get all inventory items or search
router.get("/", async (req, res, next) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      };
    }

    const items = await InventoryItem.find(query).sort({ name: 1 });

    res.json({
      success: true,
      data: items,
      count: items.length,
    });
  } catch (error) {
    console.error("Error fetching inventory items:", error);
    next(error);
  }
});

// GET /api/inventory/:id - Get inventory item by ID
router.get("/:id", async (req, res, next) => {
  try {
    const item = await InventoryItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Inventory item not found",
      });
    }

    res.json({
      success: true,
      data: item,
    });
  } catch (error) {
    console.error("Error fetching inventory item:", error);
    next(error);
  }
});

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

// PUT /api/inventory/:id - Update inventory item
router.put("/:id", async (req, res, next) => {
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

    const updatedItem = await InventoryItem.findByIdAndUpdate(
      req.params.id,
      {
        name: name.trim(),
        description: description ? description.trim() : "",
        categoryId,
        supplierId,
        quantity,
        price,
        dateModified: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.json({
      success: true,
      message: "Inventory item updated successfully",
      data: updatedItem,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Item name must be unique",
      });
    }
    console.error("Error updating inventory item:", error);
    next(error);
  }
});

// DELETE /api/inventory/:id - Delete inventory item
router.delete("/:id", async (req, res, next) => {
  try {
    const deletedItem = await InventoryItem.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.json({
      success: true,
      message: "Inventory item deleted successfully",
      data: deletedItem,
    });
  } catch (error) {
    console.error("Error deleting inventory item:", error);
    next(error);
  }
});

module.exports = router;
