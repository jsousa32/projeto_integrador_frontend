import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskPipe, NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PrimeNgModule } from 'src/primeng.module';
import { GetMedicineComponent } from './pages/medicines/get-medicine/get-medicine.component';
import { CreateMedicineComponent } from './pages/medicines/create-medicine/create-medicine.component';
import { ChildrenGuard } from './guards/children.guard';
import { GetPatientsComponent } from './pages/patients/get-patients/get-patients.component';
import { GetDoctorsComponent } from './pages/doctors/get-doctors/get-doctors.component';
import { CreatePatientComponent } from './pages/patients/create-patient/create-patient.component';
import { CreateDoctorComponent } from './pages/doctors/create-doctor/create-doctor.component';
import { GetAppointmentsComponent } from './pages/appointment/get-appointments/get-appointments.component';
import { CreateAppointmentComponent } from './pages/appointment/create-appointment/create-appointment.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        SignupComponent,
        SidenavComponent,
        NavbarComponent,
        DashboardComponent,
        GetMedicineComponent,
        CreateMedicineComponent,
        GetPatientsComponent,
        CreatePatientComponent,
        CreateDoctorComponent,
        GetDoctorsComponent,
        CreateAppointmentComponent,
        GetAppointmentsComponent,
        ProfileComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        PrimeNgModule,
        NgxMaskPipe,
        NgxMaskDirective,
    ],
    providers: [provideNgxMask(), ChildrenGuard],
    bootstrap: [AppComponent],
})
export class AppModule {}
