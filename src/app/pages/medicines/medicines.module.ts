import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicinesComponent } from './medicines.component';
import { PrimeNgModule } from 'src/primeng.module';

@NgModule({
  declarations: [
    MedicinesComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports: [
    MedicinesModule
  ]
})
export class MedicinesModule { }
