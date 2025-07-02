import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListItemComponent } from './list-item/list-item.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '/items',
    component: ListItemComponent
  }
];
