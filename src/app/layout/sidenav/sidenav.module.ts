import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { MaterialModule } from 'src/material.module';



@NgModule({
  declarations: [
    SidenavComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    SidenavModule
  ]
})
export class SidenavModule { }
