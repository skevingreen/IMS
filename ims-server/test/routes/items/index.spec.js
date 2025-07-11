/**
 * Authors: Dua Hasan, Scott Green
 * Date: 4 July 2025
 * File: index.spec.js
 * Description: Unit tests for /api/items routes.
 */

const request = require("supertest");
const app = require('../../../src/app');
const { inventoryItem } = require('../../../src/models/inventoryItem');

jest.mock('../../../src/models/inventoryItem');  // Mock the Item model

describe('Item API', () => {
  describe('GET /api/items', () => {
    it('should get all items', async () => {
      inventoryItem.find.mockResolvedValue([{
        _id: '12345',
        categoryId: 1,
        supplierId: 3,
        name: 'Item 1',
        description: 'Description 1',
        quantity: 11,
        price: 9.99,
        dateCreated: '2024-09-04T21:39:36.605Z'
      }]); // Mock (yeah) the find method

      const response = await request(app).get('/api/items');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0].name).toBe('Item 1');
    });

    it('should handle get items errors', async () => {
      inventoryItem.find.mockRejectedValue(new Error('Database error')); // Mock an error

      const response = await request(app).get('/api/items');
      expect(response.status).toBe(500);
    });

    it('should return an empty array when no items are found', async () => {
      inventoryItem.find.mockResolvedValue([]); // Mock no documents returned

      const response = await request(app).get('/api/items');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('PATCH /api/items/:inventoryItemId', () => {
    it('should update a item successfully', async () => {
      const mockItem = {
        _id: '507f1f77bcf86cd799439011',
        categoryId: 57,
        supplierId: 75,
        name: 'Thingy',
        description: 'thing-a-ma-jig',
        quantity: 23,
        price: 1.00,
        set: jest.fn(),
        save: jest.fn().mockResolvedValue(true)
      };

      inventoryItem.findOne.mockResolvedValue(mockItem);
      const response = await request(app).patch('/api/items/507f1f77bcf86cd799439011').send({
        categoryId: 57,
        supplierId: 75,
        name: 'Thingy',
        description: 'thing-a-ma-jig',
        quantity: 23,
        price: 1.00
      });

      expect(response.status).toBe(200); expect(response.body.message).toBe('Item updated successfully');
    });

    it('should handle patch errors', async () => {
      inventoryItem.findOne.mockRejectedValue(new Error('Database error')); // Mock an error

      const response = await request(app).patch('/api/items/12345');
      expect(response.status).toBe(500);
    });

    it('should return 404 if item does not exist', async () => {
      inventoryItem.findOne.mockResolvedValue(null); // Simulate item not found

      const response = await request(app)
        .patch('/api/items/507f1f77bcf86cd799439099') // Some non-existing ID
        .send({
          categoryId: 57,
          supplierId: 75,
          name: 'NonExistent',
          description: 'No description',
          quantity: 0,
          price: 0
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toMatch(/not found/i);
    });

    /*
    it('should return an empty array when no items are found', async () => {
      inventoryItem.findOne.mockResolvedValue(); // Mock no documents returned

      const response = await request(app).patch('/api/items/12345');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
    */
  });
  
  describe('GET /api/items/:inventoryItemId', () => {
    it('should retrieve a single item by ID', async () => {
      const mockItem = {
        _id: '507f1f77bcf86cd799439011',
        categoryId: 1,
        supplierId: 2,
        name: 'Sample Item',
        description: 'Sample description',
        quantity: 10,
        price: 99.99,
        dateCreated: '2024-01-01T00:00:00.000Z'
      };

      inventoryItem.findOne.mockResolvedValue(mockItem);

      const response = await request(app).get('/api/items/507f1f77bcf86cd799439011');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        _id: mockItem._id,
        name: mockItem.name,
        quantity: mockItem.quantity,
      });
    });

    it('should return 404 if item not found', async () => {
      inventoryItem.findOne.mockResolvedValue(null);

      const response = await request(app).get('/api/items/507f1f77bcf86cd799439099');

      expect(response.status).toBe(404);
      expect(response.body.message).toMatch(/not found/i);
    });

    it('should handle errors when fetching an item', async () => {
      inventoryItem.findOne.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/api/items/507f1f77bcf86cd799439011');

      expect(response.status).toBe(500);
    });

  });
});
