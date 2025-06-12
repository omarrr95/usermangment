import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './components/list/list.component';
import { BrandsRoutingModule } from './brands-routing.module';
import { AddComponent } from './components/add/add.component';

@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
  ],
  imports: [
    CommonModule,
    BrandsRoutingModule,
    SharedModule          
  ]
})
export class BrandsModule { }
