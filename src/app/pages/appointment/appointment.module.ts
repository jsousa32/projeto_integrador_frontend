import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { GetAppointmentsComponent } from './get-appointments/get-appointments.component';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';

@NgModule({
    declarations: [GetAppointmentsComponent, CreateAppointmentComponent],
    imports: [CommonModule],
    exports: [AppointmentModule],
    providers: [DatePipe],
})
export class AppointmentModule {}
