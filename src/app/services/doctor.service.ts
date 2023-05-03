import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DoctorModels } from '../model/doctorModel';

@Injectable({
    providedIn: 'root',
})
export class DoctorService {
    constructor(private httpRequest: HttpClient) {}

    url = 'http://localhost:8080/api';

    getDoctor() {
        return this.httpRequest.get<DoctorModels[]>(`${this.url}/doctor`);
    }

    createDoctor(doctor: DoctorModels) {
        return this.httpRequest.post<void>(`${this.url}/doctor`, doctor);
    }

    updateDoctor(id: number, doctor: DoctorModels) {
        return this.httpRequest.put<DoctorModels>(
            `${this.url}/doctor/` + id,
            doctor
        );
    }

    deleteDoctor(id: number) {
        return this.httpRequest.delete<void>(`${this.url}/doctor/` + id);
    }
}
