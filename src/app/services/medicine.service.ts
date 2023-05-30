import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MedicineModels } from '../model/medicinesModel';
import { environment } from 'src/environments/environment.prod';
import { LoginUser } from '../model/loginModel';
import { StorageService } from './storage.service';
@Injectable({
    providedIn: 'root',
})
export class MedicineService {
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

    getMedicine() {
        const headers = this.getHeaders();

        return this.httpRequest.get<MedicineModels[]>(`${this.url}/medicine`, {
            headers: headers,
        });
    }

    createMedicine(medicine: MedicineModels) {
        const headers = this.getHeaders();

        return this.httpRequest.post<void>(`${this.url}/medicine`, medicine, {
            headers: headers,
        });
    }

    updateMedicine(id: number, medicine: MedicineModels) {
        const headers = this.getHeaders();

        return this.httpRequest.put<MedicineModels>(
            `${this.url}/medicine/` + id,
            medicine,
            { headers: headers }
        );
    }

    deleteMedicine(id: number) {
        const headers = this.getHeaders();

        return this.httpRequest.delete<void>(`${this.url}/medicine/` + id, {
            headers: headers,
        });
    }
}
