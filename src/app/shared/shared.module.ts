import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  declarations: [
    SharedComponent,
    SidebarComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,         
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule
  ],
  exports: [
    SidebarComponent,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule,
    LayoutComponent
  ]
})
export class SharedModule { }
