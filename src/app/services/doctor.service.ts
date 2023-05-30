import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DoctorModels } from '../model/doctorModel';
import { environment } from 'src/environments/environment.prod';
import { LoginUser } from '../model/loginModel';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class DoctorService {
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

    getDoctor() {
        const headers = this.getHeaders();

        return this.httpRequest.get<DoctorModels[]>(`${this.url}/doctor`, {
            headers: headers,
        });
    }

    createDoctor(doctor: DoctorModels) {
        const headers = this.getHeaders();

        return this.httpRequest.post<void>(`${this.url}/doctor`, doctor, {
            headers: headers,
        });
    }

    updateDoctor(id: number, doctor: DoctorModels) {
        const headers = this.getHeaders();

        return this.httpRequest.put<DoctorModels>(
            `${this.url}/doctor/` + id,
            doctor,
            { headers: headers }
        );
    }

    deleteDoctor(id: number) {
        const headers = this.getHeaders();

        return this.httpRequest.delete<void>(`${this.url}/doctor/` + id, {
            headers: headers,
        });
    }
}
