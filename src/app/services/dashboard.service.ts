import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashboardModels } from '../model/dashboardModels';
import { environment } from 'src/environments/environment.prod';
import { LoginUser } from '../model/loginModel';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
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

    getDashboard() {
        const headers = this.getHeaders();
        return this.httpRequest.get<DashboardModels>(`${this.url}/dashboard`, {
            headers: headers,
        });
    }
}
