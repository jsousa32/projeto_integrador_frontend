import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PatientModels } from 'src/app/model/patientModel';
import { PatientService } from 'src/app/services/patient.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-create-patient',
    templateUrl: './create-patient.component.html',
    styleUrls: ['./create-patient.component.scss'],
})
export class CreatePatientComponent implements OnInit {
    hide: boolean = true;
    form!: FormGroup;
    nameButton: string = 'Cadastrar';
    nameScreen: string = 'Cadastrar Paciente';

    constructor(
        public dialog: MatDialog,
        public patientService: PatientService,
        private _adapter: DateAdapter<any>,
        @Inject(MAT_DIALOG_DATA) public patient: PatientModels
    ) {}

    ngOnInit(): void {
        this.search();
    }

    search() {
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
        this.checkPatient();
    }

    createPatient() {
        if (
            this.form.get('password')!.value !==
            this.form.get('passwordConfirm')!.value
        ) {
            return Swal.fire({
                html: ` 
                    <div style="text-align: center">
                        <b><span style="font-size: 30px">Desculpe!</span></b>
                        <div class="mt-3">
                            <h2>Não as senhas não coincidem!</h2>
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
            .then(() => {
                Swal.fire({
                    html: ` 
                    <div style="text-align: center">
                        <b><span style="font-size: 30px">Parabéns!</span></b>
                        <div class="mt-3">
                            <h2>Você cadastrou o paciente com sucesso!</h2>
                        </div>
                    </div>
                `,
                    icon: 'success',
                    confirmButtonColor: '#1c1c39',
                    confirmButtonText: 'Ok',
                }).then(() => {
                    window.location.reload();
                });
            })
            .catch((err) => {
                Swal.fire({
                    html: ` 
                    <div style="text-align: center">
                        <b><span style="font-size: 30px">Desculpe!</span></b>
                        <div class="mt-3">
                            <h2>${err.error.message}</h2>
                        </div>
                    </div>
                `,
                    icon: 'warning',
                    confirmButtonColor: '#1c1c39',
                    confirmButtonText: 'Ok',
                });
            });
    }

    updatePatient() {
        this.patientService
            .updatePatient(this.patient.id, this.form.value)
            .toPromise()
            .then(() => {
                Swal.fire({
                    html: ` 
                    <div style="text-align: center">
                        <b><span style="font-size: 30px">Parabéns!</span></b>
                        <div class="mt-3">
                            <h2>Você cadastrou o paciente com sucesso!</h2>
                        </div>
                    </div>
                `,
                    icon: 'success',
                    confirmButtonColor: '#1c1c39',
                    confirmButtonText: 'Ok',
                }).then(() => {
                    window.location.reload();
                });
            })
            .catch(() => {
                Swal.fire({
                    html: ` 
                    <div style="text-align: center">
                        <b><span style="font-size: 30px">Desculpe!</span></b>
                        <div class="mt-3">
                            <h2>Não foi possível o cadastro do paciente!</h2>
                        </div>
                    </div>
                `,
                    icon: 'warning',
                    confirmButtonColor: '#1c1c39',
                    confirmButtonText: 'Ok',
                });
            });
    }

    cancel() {
        this.dialog.closeAll();
    }

    checkPatient() {
        if (this.patient) {
            this.form.get('susNumber')?.disable();
            this.form.removeControl('password');
            this.form.removeControl('passwordConfirm');
            this.nameButton = 'Atualizar';
            this.nameScreen = 'Atualizar Paciente';
        }
    }
}
