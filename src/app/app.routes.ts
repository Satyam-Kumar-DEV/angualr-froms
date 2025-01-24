import { Routes } from '@angular/router';
import { ImageDragDropComponent } from '../image-drag-drop/image-drag-drop.component';
import { UserListComponent } from '../user-list/user-list.component';

export const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'add', component: ImageDragDropComponent },
  { path: 'update/:id', component: ImageDragDropComponent },
];
