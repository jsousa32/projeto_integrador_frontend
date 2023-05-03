import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/primeng.module';
import { GetMedicineComponent } from './get-medicine/get-medicine.component';
import { CreateMedicineComponent } from './create-medicine/create-medicine.component';
import { MaterialModule } from 'src/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@NgModule({
    declarations: [
        GetMedicineComponent,
        CreateMedicineComponent
    ],
    imports: [
        CommonModule,
        PrimeNgModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    exports: [
        MedicinesModule
    ]
})
export class MedicinesModule { }
