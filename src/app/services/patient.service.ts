import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PatientModels } from '../model/patientModel';
import { StorageService } from './storage.service';
import { LoginUser } from '../model/loginModel';
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root',
})
export class PatientService {
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

    getPatient() {
        const headers = this.getHeaders();
        return this.httpRequest.get<PatientModels[]>(`${this.url}/patient`, {
            headers: headers,
        });
    }

    getPatientById(id: string) {
        const headers = this.getHeaders();
        return this.httpRequest.get<PatientModels>(
            `${this.url}/patient/` + id,
            {
                headers: headers,
            }
        );
    }

    getPatientBySusNumber(susNumber: string) {
        const headers = this.getHeaders();
        return this.httpRequest.get<PatientModels>(
            `${this.url}/patient/susNumber/` + susNumber,
            {
                headers: headers,
            }
        );
    }

    updatePatient(id: number, patient: PatientModels) {
        const headers = this.getHeaders();
        return this.httpRequest.put<void>(
            `${this.url}/patient/` + id,
            patient,
            {
                headers: headers,
            }
        );
    }

    createPatient(patient: PatientModels) {
        return this.httpRequest.post<void>(`${this.url}/patient`, patient);
    }

    deletePatient(id: number) {
        const headers = this.getHeaders();
        return this.httpRequest.delete<void>(`${this.url}/patient/` + id, {
            headers: headers,
        });
    }
}
