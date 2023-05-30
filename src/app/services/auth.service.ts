import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../model/loginModel';
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private httpRequest: HttpClient) {}

    url = environment.url;

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
