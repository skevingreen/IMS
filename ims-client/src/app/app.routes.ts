/**
 * Authors: Richard Krasso, Dua Hasan, Scott Green
 * Date: 4 July 2025
 * File: app.routes.spec.ts
 * Description: File to define Angular routes.
 */

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { SupplierListComponent } from './supplier/supplier-list/supplier-list.component';
import { ItemDetailsComponent } from './item/item-details/item-details.component';
import { ItemAddComponent } from './item/item-add/item-add.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'items/:inventoryItemId',
    component: ItemDetailsComponent
  },
  {
    path: 'items',
    component: ItemListComponent
  },
  {
    path: 'items/add',
    component: ItemAddComponent
  },
  {
    path: 'suppliers',
    component: SupplierListComponent
  }
];
