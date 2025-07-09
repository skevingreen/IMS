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
    // it('should update an items', async () => {
    //   inventoryItem.findOne.mockResolvedValue([{
    //     _id: '12345',
    //     categoryId: 1,
    //     supplierId: 3,
    //     name: 'Item 1',
    //     description: 'Description 1',
    //     quantity: 11,
    //     price: 9.99,
    //   }]); // Mock (yeah) the find method

    //   const response = await request(app).patch('/api/items/12345');
    //   expect(response.status).toBe(200);
    //   expect(Array.isArray(response.body)).toBe(true);
    //   expect(response.body[0].name).toBe('Item 1');

    it('should update a plant successfully', async () => {
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

      console.log("items index.spec response.error: " + response.error);
      expect(response.status).toBe(200); expect(response.body.message).toBe('Item updated successfully');
    });

    it('should handle patch errors', async () => {
      inventoryItem.findOne.mockRejectedValue(new Error('Database error')); // Mock an error

      const response = await request(app).patch('/api/items/12345');
      expect(response.status).toBe(500);
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
});
