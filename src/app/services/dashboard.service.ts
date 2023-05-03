import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashboardModels } from '../model/dashboardModels';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    constructor(private httpRequest: HttpClient) {}

    url = 'http://localhost:8080/api';

    getDashboard() {
        return this.httpRequest.get<DashboardModels>(`${this.url}/dashboard`);
    }
}
