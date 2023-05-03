import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    setStorage(key: string, value: Object) {
        const valueFormatted = JSON.stringify(value);
        return localStorage.setItem(key, valueFormatted);
    }

    getStorage(key: string) {
        const valueFormatted = localStorage.getItem(key)!;
        return JSON.parse(valueFormatted);
    }

    delStorage(key: string) {
        return sessionStorage.removeItem(key);
    }
}
