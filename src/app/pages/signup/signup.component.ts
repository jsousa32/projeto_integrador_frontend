import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    hide = true;
    form!: FormGroup;

    constructor(
        private _adapter: DateAdapter<any>) {
    }

    ngOnInit(): void {
        this._adapter.setLocale("br");
        this.form = new FormGroup({
            nome: new FormControl(null, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50)
            ]),
            nomeMae: new FormControl(null, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50)
            ]),
            dataNascimento: new FormControl(null, [
                Validators.required,
            ]),
            cpf: new FormControl(null, [
                Validators.required
            ]),
            sus: new FormControl(null, [
                Validators.required
            ]),
            genero: new FormControl(null, [
                Validators.required
            ]),
            endereco: new FormControl(null, [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(100)
            ]),
            telefone: new FormControl(null, [
                Validators.required
            ]),
            email: new FormControl(null, [
                Validators.required,
                Validators.email
            ]),
            senha: new FormControl(null, [
                Validators.required,
                Validators.minLength(8)
            ])
        })
    }
}
