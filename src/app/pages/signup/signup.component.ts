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
            Swal.fire({
                html: `
                <div style="text-align: center">
                    <b><span style="font-size: 30px">Desculpe!</span></b>
                    <div class="mt-3">
                        <h2>Não foi possível fazer o cadastro!</h2>
                    </div>
                    <div class="mt-2">
                        <h2>As senhas não coincidem, por favor tente novamente.</h2>
                    </div>
                </div>
            `,
                icon: 'warning',
                confirmButtonColor: '#1c1c39',
                confirmButtonText: 'Ok',
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
