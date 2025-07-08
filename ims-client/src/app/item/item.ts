/**
 * Authors: Dua Hasan, Scott Green
 * Date: 4 July 2025
 * File: item.ts
 * Description: Interface to define Item objects.
 */
export interface Item {
  _id: string;
  categoryId: number;
  supplierId: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  dateCreated: string;
  dateModified: string;
}

export type AddItemDTO = Omit<Item, '_id'>;
export type UpdateItemDTO = Omit<Item, '_id'>;
