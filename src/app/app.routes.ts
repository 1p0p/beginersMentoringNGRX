import { Routes } from '@angular/router';
import { UserListComponent } from './component/user-list/user-list.component';

export const routes: Routes = [
    {path:'', redirectTo: 'users', pathMatch:'full'}, // redirect - первая страница которя будет открываться
    {path:'users', component: UserListComponent}
];
