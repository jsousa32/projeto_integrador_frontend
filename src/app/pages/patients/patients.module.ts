import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetPatientsComponent } from './get-patients/get-patients.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material.module';
import { PrimeNgModule } from 'src/primeng.module';
import { CreatePatientComponent } from './create-patient/create-patient.component';

@NgModule({
    declarations: [GetPatientsComponent, CreatePatientComponent],
    imports: [
        CommonModule,
        PrimeNgModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    exports: [PatientsModule],
})
export class PatientsModule {}
