/**
 * Authors: Dua Hasan, Scott Green
 * Date: 4 July 2025
 * File: category.spec.js
 * Description: Unit tests for inventoryItem model.
 */

const mongoose = require('mongoose');
const { inventoryItem } = require('../../src/models/inventoryItem');
const request = require('supertest');
const express = require('express');

describe('Item Model Test', () => {
  // Connect to a test database
  beforeAll(async () => {
    const connectionString = 'mongodb+srv://ims_user:s3cret@bellevueuniversity.qgo4d.mongodb.net/?retryWrites=true&w=majority&appName=BellevueUniversity';
    try {
      await mongoose.connect(connectionString, {
        dbName: 'IMS_Test'
      });

      console.log('Connection to the IMS_Test database instance was successful');
    } catch (err) {
      console.error(`MongoDB connection error: ${err}`);
    }
  });

  // Clear the database before each test
  beforeEach(async () => {
    await inventoryItem.deleteMany({});
  });

  // Close the database connection after all tests
  afterAll(async () => {
    await mongoose.connection.close();
    console.log('/test/models/inventoryItem.spec.js database connection closed');
  });

  it('should create a Item successfully', async () => {
    const ItemData = {
      _id: '12345',
      categoryId: 1,
      supplierId: 3,
      name: 'Item 1',
      description: 'Description 1',
      quantity: 11,
      price: 9.99
    };

    const item = new inventoryItem(ItemData);
    const savedItem = await item.save();

    expect(savedItem._id).toBeDefined();
    expect(savedItem.categoryId).toBe(ItemData.categoryId);
    expect(savedItem.supplierId).toBe(ItemData.supplierId);
    expect(savedItem.name).toBe(ItemData.name);
    expect(savedItem.description).toBe(ItemData.description);
    expect(savedItem.quantity).toBe(ItemData.quantity);
    expect(savedItem.price).toBe(ItemData.price);
  });

  // missing categoryId
  it('should fail to create an item without required fields', async () => {
    const ItemData = { _id: '12345', supplierId: 3, name: 'Item 1', description: 'Description 1', quantity: 11, price: 9.99, dateCreated: '2024-09-04T21:39:36.605Z' };

    const item = new inventoryItem(ItemData);
    let err;

    try {
      await item.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.errors['categoryId']).toBeDefined();
  });

  it('should update a Item\'s description successfully', async () => {
    const ItemData = { _id: '12345', categoryId: 1, supplierId: 3, name: 'Item 1', description: 'Description 1', quantity: 11, price: 9.99, dateCreated: '2024-09-04T21:39:36.605Z' };

    const item = new inventoryItem(ItemData);
    const savedItem = await item.save();

    savedItem.description = 'otherworldly';
    const updatedItem = await savedItem.save();

    expect(updatedItem.description).toBe('otherworldly');
  });

  it('should fail to create an item without a name', async () => {
    const ItemData = { _id: '12345', categoryId: 1, supplierId: 3, name: '', description: 'Description 1', quantity: 11, price: 9.99, dateCreated: '2024-09-04T21:39:36.605Z' };

    const item = new inventoryItem(ItemData);
    let err;

    try {
      await item.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined(); expect(err.errors['name']).toBeDefined();
    expect(err.errors['name'].message).toBe('Item name is required');
  });

  it('should fail to create a Item with a name longer than 100 characters', async () => {
    const ItemData = { _id: '12345', categoryId: 1, supplierId: 3, name: 'z'.repeat(101), description: 'Description 1', quantity: 11, price: 9.99, dateCreated: '2024-09-04T21:39:36.605Z' };

    const item = new inventoryItem(ItemData);
    let err;

    try {
      await item.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.errors['name']).toBeDefined();
    expect(err.errors['name'].message).toBe('Item name cannot exceed 100 characters');
  });
});

// Create a mock express app
const apiApp = express();
apiApp.use(express.json());

const mockInventoryItems = [
  {
    _id: '507f1f77bcf86cd799439011',
    name: 'Test Laptop',
    description: 'High-end gaming laptop',
    categoryId: 1000,
    supplierId: 1,
    quantity: 10,
    price: 1500.0,
    dateCreated: new Date().toISOString(),
    dateModified: new Date().toISOString()
  }
];

apiApp.post('/api/inventory', (req, res) => {
  const { name, description, categoryId, supplierId, quantity, price } = req.body;
  if (!name || !description || !categoryId || !supplierId || quantity === undefined || price === undefined || quantity < 0 || price < 0) {
    return res.status(400).json({ success: false, message: 'Invalid input data' });
  }
  const newItem = {
    _id: '507f1f77bcf86cd799439012',
    name,
    description,
    categoryId,
    supplierId,
    quantity,
    price,
    dateCreated: new Date().toISOString(),
    dateModified: new Date().toISOString()
  };
  res.status(201).json({ success: true, message: 'Inventory item created successfully', data: newItem });
});


describe('POST /api/inventory', () => {
  test('should create inventory item successfully', async () => {
    const itemData = {
      name: 'Test Laptop',
      description: 'High-end gaming laptop',
      categoryId: 1000,
      supplierId: 1,
      quantity: 10,
      price: 1500.0
    };
    const response = await request(apiApp).post('/api/inventory').send(itemData).expect(201);
    expect(response.body.success).toBe(true);
  });

  test('should return 400 for invalid input data', async () => {
    const invalidData = { name: '', categoryId: 1000, supplierId: 1, quantity: -5, price: -100 };
    const response = await request(apiApp).post('/api/inventory').send(invalidData).expect(400);
    expect(response.body.success).toBe(false);
  });

  test("should return 400 error when price is missing", async () => {
    const missingPriceData = {
      name: "Test Mouse",
      description: "Wireless mouse",
      categoryId: 2000,
      supplierId: 2,
      quantity: 50,
      // price is missing
    };

    const response = await request(apiApp)
      .post("/api/inventory")
      .send(missingPriceData)
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Invalid input data");
  });
});
 
