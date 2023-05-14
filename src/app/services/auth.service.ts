import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../model/loginModel';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private httpRequest: HttpClient) {}

    url = 'http://localhost:8080/api';

    login(username: string, password: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + window.btoa(username + ':' + password),
        });
        return this.httpRequest.get<LoginUser>(`${this.url}/auth`, {
            headers: headers,
        });
    }

    forgot(username: string) {
        return this.httpRequest.post<void>(`${this.url}/auth/forgot`, {
            username: username,
        });
    }

    reset(username: string, password: string) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + window.btoa(username + ':' + password),
        });
        return this.httpRequest.get<void>(`${this.url}/auth/reset`, {
            headers: headers,
        });
    }
}
