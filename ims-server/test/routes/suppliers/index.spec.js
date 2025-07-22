/**
 * Authors: Dua Hasan, Scott Green
 * Date: 21 July 2025
 * File: index.spec.js
 * Description: Unit tests for /api/suppliers routes.
 */

const request = require("supertest");
const app = require('../../../src/app');
const { Supplier } = require('../../../src/models/supplier');
const mongoose = require('mongoose');

jest.mock('../../../src/models/supplier');  // Mock the Item model

describe('Supplier API', () => {
  afterAll(async () => {  // Get rid of the jest error
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('GET /api/suppliers', () => {
    // Tests for list all suppliers
    it('should get all suppliers', async () => {
      Supplier.find.mockResolvedValue([{
        _id: '12345',
        supplierId: 3,
        supplierName: 'Supplier 1',
        contactInformation: '555-555-5555',
        address: '555 55th St',
        dateCreated: new Date,
        dateModified: new Date
      }]); // Mock (yeah) the find method

      const response = await request(app).get('/api/suppliers');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0].supplierName).toBe('Supplier 1');
    });

    it('should handle get suppliers errors', async () => {
      Supplier.find.mockRejectedValue(new Error('Database error')); // Mock an error

      const response = await request(app).get('/api/suppliers');
      expect(response.status).toBe(500);
    });

    it('should return an empty array when no suppliers are found', async () => {
      Supplier.find.mockResolvedValue([]); // Mock no documents returned

      const response = await request(app).get('/api/suppliers');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });
});
