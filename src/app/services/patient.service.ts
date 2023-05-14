import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PatientModels } from '../model/patientModel';

@Injectable({
    providedIn: 'root',
})
export class PatientService {
    constructor(private httpRequest: HttpClient) {}

    url = 'http://localhost:8080/api';

    getPatient() {
        return this.httpRequest.get<PatientModels[]>(`${this.url}/patient`);
    }

    getPatientById(id: string) {
        return this.httpRequest.get<PatientModels>(`${this.url}/patient/` + id);
    }

    getPatientBySusNumber(susNumber: string) {
        return this.httpRequest.get<PatientModels>(
            `${this.url}/patient/susNumber/` + susNumber
        );
    }

    updatePatient(id: number, patient: PatientModels) {
        return this.httpRequest.put<void>(`${this.url}/patient/` + id, patient);
    }

    createPatient(patient: PatientModels) {
        return this.httpRequest.post<void>(`${this.url}/patient`, patient);
    }

    deletePatient(id: number) {
        return this.httpRequest.delete<void>(`${this.url}/patient/` + id);
    }
}
