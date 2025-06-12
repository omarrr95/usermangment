import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { AdduserComponent } from './components/adduser/adduser.component';
import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './components/list/list.component';

@NgModule({
  declarations: [
    UsersComponent,
    AdduserComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule          
  ]
})
export class UsersModule { }
