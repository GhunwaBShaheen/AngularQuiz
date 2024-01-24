import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponentComponent } from './user-info-component/user-info-component.component';
import { UsersListComponentComponent } from './users-list-component/users-list-component.component';
import { MaterialModule } from '../material.module';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgBusyModule } from 'ng-busy';

@NgModule({
  declarations: [
    UserComponent,
    UsersListComponentComponent,
    UserInfoComponentComponent,
  ],
  imports: [
    UserRoutingModule,
    CommonModule,
    MaterialModule,
    NgxSpinnerModule,
    NgBusyModule,
  ],
})
export class UserModule {}
