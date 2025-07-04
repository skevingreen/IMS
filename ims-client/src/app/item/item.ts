export interface Item {
  _id: string;
  categoryId: number;
  supplierId: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  dateCreated?: string;
  dateModified?: string;
}

/*
export type UpdateGardenDTO = Omit<Item, '_id' | 'dateCreated' | 'dateModified'>;
export type AddGardenDTO = Omit<Item, '_id' | 'dateModified'>;
*/
