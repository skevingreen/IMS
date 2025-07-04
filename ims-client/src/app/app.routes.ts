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

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'items',
    component: ItemListComponent
  },
  {
    path: 'suppliers',
    component: SupplierListComponent
  }
];
