/**
 * Author: Scott Green, Dua Hasan
 * Date: 07/04/2025
 * File: dashboard.js
 * Description: Dashboard routes for the IMS API
 */

const express = require("express");
const router = express.Router();
const InventoryItem = require("../models/inventory-item");
const Category = require("../models/category");
const Supplier = require("../models/supplier");

// GET /api/dashboard/stats - Get dashboard statistics
router.get("/stats", async (req, res, next) => {
  try {
    const [totalItems, totalSuppliers, totalCategories, inventoryItems] =
      await Promise.all([
        InventoryItem.countDocuments(),
        Supplier.countDocuments(),
        Category.countDocuments(),
        InventoryItem.find({}, "quantity price"),
      ]);

    const totalValue = inventoryItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    res.json({
      success: true,
      data: {
        totalItems,
        totalSuppliers,
        totalCategories,
        totalValue,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    next(error);
  }
});

module.exports = router;
