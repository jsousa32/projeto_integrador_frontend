import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetDoctorsComponent } from './get-doctors/get-doctors.component';
import { CreateDoctorComponent } from './create-doctor/create-doctor.component';



@NgModule({
  declarations: [
    GetDoctorsComponent,
    CreateDoctorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DoctorsModule
  ]
})
export class DoctorsModule { }
