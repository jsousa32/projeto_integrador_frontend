import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { LoginUser } from 'src/app/model/loginModel';
import { PatientModels } from 'src/app/model/patientModel';
import { PatientService } from 'src/app/services/patient.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    form!: FormGroup;
    patient!: PatientModels;

    constructor(
        @Inject(MAT_DIALOG_DATA) public user: LoginUser,
        private patientService: PatientService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.search();
    }

    search() {
        this.form = new FormGroup({
            susNumber: new FormControl(null, [Validators.required]),
            name: new FormControl(null, [
                Validators.required,
                Validators.minLength(3),
            ]),
            email: new FormControl(null, [
                Validators.required,
                Validators.email,
            ]),
            telephone: new FormControl(null, [
                Validators.required,
                Validators.minLength(9),
            ]),
        });

        this.form.get('susNumber')?.disable();

        console.log(this.user);

        this.patientService
            .getPatientById(this.user.id)
            .toPromise()
            .then((result) => {
                this.patient = result!;
            });
    }

    updateProfile() {
        this.patientService
            .updatePatient(this.patient.id, this.form.value)
            .toPromise()
            .then(() => {
                Swal.fire({
                    html: ` 
                    <div style="text-align: center">
                        <b><span style="font-size: 30px">Parabéns!</span></b>
                        <div class="mt-3">
                            <h2>Você atualizou o seu cadastro com sucesso!</h2>
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
                            <h2>Não foi possível atualizar seu cadastro!</h2>
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
}
