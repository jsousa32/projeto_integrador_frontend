import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
    hide: boolean = true;
    form!: FormGroup;

    constructor(
        private _adapter: DateAdapter<any>,
        private patientService: PatientService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._adapter.setLocale('br');
        this.form = new FormGroup({
            name: new FormControl(null, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50),
            ]),
            susNumber: new FormControl(null, [Validators.required]),
            telephone: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [
                Validators.required,
                Validators.email,
            ]),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(8),
            ]),
            passwordConfirm: new FormControl(null, [
                Validators.required,
                Validators.minLength(8),
            ]),
        });
    }

    cadastrar() {
        if (
            this.form.get('password')!.value !==
            this.form.get('passwordConfirm')!.value
        ) {
            return Swal.fire({
                title: 'Ocorreu um erro!!',
                text: 'Senha e confirmar senha não correspondem.',
                icon: 'warning',
            });
        }
        this.form.removeControl('passwordConfirm');
        this.patientService
            .createPatient(this.form.value)
            .toPromise()
            .then(() => this.router.navigate(['login']))
            .catch(() => {
                Swal.fire({
                    title: 'Ocorreu um erro!',
                    text: 'O Numero do SUS já está cadastrado',
                    icon: 'warning',
                });
            });
    }
}
