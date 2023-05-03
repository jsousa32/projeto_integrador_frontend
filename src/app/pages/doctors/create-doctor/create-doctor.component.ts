import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DoctorModels } from 'src/app/model/doctorModel';
import { DoctorService } from 'src/app/services/doctor.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-create-doctor',
    templateUrl: './create-doctor.component.html',
    styleUrls: ['./create-doctor.component.scss'],
})
export class CreateDoctorComponent implements OnInit {
    form!: FormGroup;
    nameButton: string = 'Cadastrar';
    nameScreen: string = 'Cadastrar Médico';

    constructor(
        private dialog: MatDialog,
        private doctorService: DoctorService,
        @Inject(MAT_DIALOG_DATA) public doctor: DoctorModels
    ) {}

    ngOnInit(): void {
        this.search();
    }

    search() {
        this.form = new FormGroup({
            crm: new FormControl(null, [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(6),
            ]),
            name: new FormControl(null, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50),
            ]),
            email: new FormControl(null, [
                Validators.required,
                Validators.email,
            ]),
            speciality: new FormControl(null, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50),
            ]),
            telephone: new FormControl(null, [Validators.required]),
        });
        this.checkDoctor();
    }

    createDoctor() {
        this.doctorService
            .createDoctor(this.form.value)
            .toPromise()
            .then(() => {
                Swal.fire({
                    html: ` 
                        <div style="text-align: center">
                            <b><span style="font-size: 30px">Parabéns!</span></b>
                            <div class="mt-3">
                                <h2>Você cadastrou o médico com sucesso!</h2>
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

    updateDoctor() {
        this.doctorService
            .updateDoctor(this.doctor.id, this.form.value)
            .toPromise()
            .then(() => {
                Swal.fire({
                    html: ` 
                    <div style="text-align: center">
                        <b><span style="font-size: 30px">Parabéns!</span></b>
                        <div class="mt-3">
                            <h2>Você atualizou o cadastro do médico com sucesso!</h2>
                        </div>
                    </div>
                `,
                    icon: 'success',
                    confirmButtonColor: '#1c1c39',
                    confirmButtonText: 'Ok',
                }).then(() => {
                    this.dialog.closeAll();
                    window.location.reload();
                });
            })
            .catch(() => {
                Swal.fire({
                    html: ` 
                    <div style="text-align: center">
                        <b><span style="font-size: 30px">Desculpe!</span></b>
                        <div class="mt-3">
                            <h2>Não foi possível atualizar o cadastro do médico!</h2>
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

    checkDoctor() {
        if (this.doctor) {
            this.form.get('crm')?.disable();
            this.nameButton = 'Atualizar';
            this.nameScreen = 'Atualizar Médico';
        }
    }
}
