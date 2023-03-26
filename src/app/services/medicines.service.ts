import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MedicinesService {

  constructor(
    private httpRequest: HttpClient
  ) { }


  fetchMedicine() {
    return this.httpRequest.get<any[]>("http://localhost/projeto-angular-php/listar.php")
  }
}
