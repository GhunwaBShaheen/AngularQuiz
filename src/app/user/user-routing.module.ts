import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserInfoComponentComponent } from './user-info-component/user-info-component.component';
import { UsersListComponentComponent } from './users-list-component/users-list-component.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        component: UsersListComponentComponent,
      },
      {
        path: 'user-info/:userId',
        component: UserInfoComponentComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
