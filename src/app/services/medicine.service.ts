import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MedicineModels } from '../model/medicinesModel';
@Injectable({
    providedIn: 'root',
})
export class MedicineService {
    constructor(private httpRequest: HttpClient) {}

    url = 'http://localhost:8080/api';

    getMedicine() {
        return this.httpRequest.get<MedicineModels[]>(`${this.url}/medicine`);
    }

    createMedicine(medicine: MedicineModels) {
        return this.httpRequest.post<void>(`${this.url}/medicine`, medicine);
    }

    updateMedicine(id: number, medicine: MedicineModels) {
        return this.httpRequest.put<MedicineModels>(
            `${this.url}/medicine/` + id,
            medicine
        );
    }

    deleteMedicine(id: number) {
        return this.httpRequest.delete<void>(`${this.url}/medicine/` + id);
    }
}
