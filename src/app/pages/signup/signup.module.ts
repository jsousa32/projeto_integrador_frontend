import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';



@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SignupModule
  ]
})
export class SignupModule { }
