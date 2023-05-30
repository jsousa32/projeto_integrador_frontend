import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    AppointmentCreate,
    AppointmentModels,
} from '../model/appointmentModel';
import { environment } from 'src/environments/environment.prod';
import { LoginUser } from '../model/loginModel';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class AppointmentService {
    user!: LoginUser;

    constructor(
        private httpRequest: HttpClient,
        private session: StorageService
    ) {}

    url = environment.url;

    private getHeaders(): HttpHeaders {
        this.user = this.session.getStorage('user');
        const token = this.user.token;
        const headers = new HttpHeaders().set(
            'Authorization',
            `Basic ${token}`
        );
        return headers;
    }

    getAppointment() {
        const headers = this.getHeaders();

        return this.httpRequest.get<AppointmentModels[]>(
            `${this.url}/appointment`,
            { headers: headers }
        );
    }

    checkAppointments(date: string, crm: string) {
        const headers = this.getHeaders();

        return this.httpRequest.get<AppointmentModels[]>(
            `${this.url}/appointment/date/` + date + `/id/` + crm,
            { headers: headers }
        );
    }

    createAppointments(appointment: AppointmentCreate) {
        const headers = this.getHeaders();

        return this.httpRequest.post<void>(
            `${this.url}/appointment`,
            appointment,
            { headers: headers }
        );
    }

    getAppointmentByPatientId(id: string) {
        const headers = this.getHeaders();

        return this.httpRequest.get<AppointmentModels[]>(
            `${this.url}/appointment/id/` + id,
            { headers: headers }
        );
    }

    updateAppointment(id: number, appointment: AppointmentCreate) {
        const headers = this.getHeaders();

        return this.httpRequest.put<void>(
            `${this.url}/appointment/` + id,
            appointment,
            { headers: headers }
        );
    }

    deleteAppointment(id: number) {
        const headers = this.getHeaders();

        return this.httpRequest.delete<void>(`${this.url}/appointment/` + id, {
            headers: headers,
        });
    }
}
