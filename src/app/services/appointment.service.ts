import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    AppointmentCreate,
    AppointmentModels,
} from '../model/appointmentModel';

@Injectable({
    providedIn: 'root',
})
export class AppointmentService {
    constructor(private httpRequest: HttpClient) {}

    url = 'http://localhost:8080/api';

    getAppointment() {
        return this.httpRequest.get<AppointmentModels[]>(
            `${this.url}/appointment`
        );
    }

    checkAppointments(date: string, crm: string) {
        return this.httpRequest.get<[]>(
            `${this.url}/appointment/date/` + date + `/id/` + crm
        );
    }

    createAppointments(appointment: AppointmentCreate) {
        return this.httpRequest.post<void>(
            `${this.url}/appointment`,
            appointment
        );
    }

    getAppointmentByPatientId(id: string) {
        return this.httpRequest.get<AppointmentModels[]>(
            `${this.url}/appointment/id/` + id
        );
    }

    updateAppointment(id: number, appointment: AppointmentCreate) {
        return this.httpRequest.put<void>(
            `${this.url}/appointment/` + id,
            appointment
        );
    }

    deleteAppointment(id: number) {
        return this.httpRequest.delete<void>(`${this.url}/appointment/` + id);
    }
}
