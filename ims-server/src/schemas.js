/**
 * Authors: Dua Hasan, Scott Green
 * Date: 4 July 2025
 * File: schemas.js
 * Description: Schema for database operations.
 */

// Ajv validation schemas
const addItemSchema = {
  type: 'object',
  properties: {
    // Mongoose will add the _id
    categoryId: { type: 'number' },
    supplierId: { type: 'number' },
    name: { type: 'string', minLength: 1, maxLength: 100 },
    description: { type: 'string', maxLength: 500 },
    price: { type: 'number' },
    dateCreated: { type: 'string', pattern: '^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z)?$' },
    dateModified: { type: 'string', pattern: '^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z)?$' }
  },
  required: ['categoryId', 'supplierId', 'name', 'description', 'price', 'dateCreated', 'dateModified'],
  additionalProperties: true
};

const updateItemSchema = {
  type: 'object',
  properties: {
    categoryId: { type: 'number' },
    supplierId: { type: 'number' },
    name: { type: 'string', minLength: 1, maxLength: 100 },
    description: { type: 'string', maxLength: 500 },
    price: { type: 'number' },
  },
  required: ['categoryId', 'supplierId', 'name', 'description', 'price'],
  additionalProperties: true
};

module.exports = {
  addItemSchema,
  updateItemSchema
};
