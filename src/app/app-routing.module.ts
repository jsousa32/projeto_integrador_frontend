import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenGuard } from './guards/children.guard';
import { HomeComponent } from './layout/home/home.component';
import { GetAppointmentsComponent } from './pages/appointment/get-appointments/get-appointments.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GetDoctorsComponent } from './pages/doctors/get-doctors/get-doctors.component';
import { LoginComponent } from './pages/login/login.component';
import { GetMedicineComponent } from './pages/medicines/get-medicine/get-medicine.component';
import { GetPatientsComponent } from './pages/patients/get-patients/get-patients.component';
import { SignupComponent } from './pages/signup/signup.component';
import { RouterGuard } from './guards/router.guard';
import { ForgotComponent } from './pages/forgot/forgot.component';
import { ResetComponent } from './pages/reset/reset.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'forgot', component: ForgotComponent },
    { path: 'reset/:token', component: ResetComponent },
    {
        path: 'home',
        component: HomeComponent,
        canActivateChild: [ChildrenGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [RouterGuard],
            },
            { path: 'medicines', component: GetMedicineComponent },
            { path: 'patients', component: GetPatientsComponent },
            { path: 'doctors', component: GetDoctorsComponent },
            { path: 'appointments', component: GetAppointmentsComponent },
        ],
    },
    { path: '**', redirectTo: 'login' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
