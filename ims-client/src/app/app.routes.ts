import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListItemComponent } from './item/item-list/item-list.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'items',
    component: ListItemComponent
  }
];
