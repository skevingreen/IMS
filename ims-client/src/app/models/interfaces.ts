/**
 * Author: Scott Green, Dua Hasan
 * Date: 07/04/2025
 * File: interfaces.ts
 * Description: TypeScript interfaces for the IMS client
 */

export interface InventoryItem {
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


export interface Category {
  _id: string;
  categoryId: number;
  categoryName: string;
  description: string;
  dateCreated: string;
  dateModified: string;
}

export interface DashboardStats {
  totalItems: number;
  totalSuppliers: number;
  totalCategories: number;
  totalValue: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  count?: number;
}

export interface CreateInventoryItemRequest {
  name: string;
  description?: string;
  categoryId: number;
  supplierId: number;
  quantity: number;
  price: number;
}

export interface CreateCategoryRequest {
  categoryName: string;
  description: string;
}

