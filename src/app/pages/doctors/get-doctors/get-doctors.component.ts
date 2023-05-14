import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DoctorModels } from 'src/app/model/doctorModel';
import { DoctorService } from 'src/app/services/doctor.service';
import { CreateDoctorComponent } from '../create-doctor/create-doctor.component';
import Swal from 'sweetalert2';
import { StorageService } from 'src/app/services/storage.service';
import { LoginUser } from 'src/app/model/loginModel';

@Component({
    selector: 'app-get-doctors',
    templateUrl: './get-doctors.component.html',
    styleUrls: ['./get-doctors.component.scss'],
})
export class GetDoctorsComponent implements OnInit {
    doctors: DoctorModels[] = [];
    user!: LoginUser;

    constructor(
        private doctorService: DoctorService,
        private dialog: MatDialog,
        private storageService: StorageService
    ) {}

    ngOnInit(): void {
        this.search();
    }

    search() {
        this.doctorService
            .getDoctor()
            .toPromise()
            .then((result) => {
                this.doctors = result!;
            });

        this.user = this.storageService.getStorage('user');
    }

    createDoctor() {
        this.dialog.open(CreateDoctorComponent, {
            disableClose: false,
            maxWidth: 600,
            maxHeight: 800,
        });
    }

    editDoctor(doctor: DoctorModels) {
        this.dialog.open(CreateDoctorComponent, {
            disableClose: false,
            maxWidth: 600,
            maxHeight: 800,
            data: doctor,
        });
    }

    deleteDoctor(doctor: DoctorModels) {
        Swal.fire({
            icon: 'warning',
            html: `
            <div style="text-align: center">
                <h2>Você tem certeza da delação do médico?</h2>
                <div class="mt-2">
                    <b><span>Nome: </span></b> ${doctor.name}
                </div>
                <div class="mt-2 mb-2">
                    <b><span>Número do CRM: </span></b> ${doctor.crm}
                </div>
            </div>
                 `,
            showCancelButton: true,
            confirmButtonColor: '#1c1c39',
            cancelButtonColor: '#ac1212',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
        }).then((result) => {
            if (result.isConfirmed) {
                this.doctorService
                    .deleteDoctor(doctor.id)
                    .toPromise()
                    .then(() => {
                        Swal.fire({
                            html: ` 
                                <div style="text-align: center">
                                    <b><span style="font-size: 30px">Parabéns!</span></b>
                                    <div class="mt-3">
                                        <h2>Você deletou o médico com sucesso!</h2>
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
                                        <h2>Não foi possível a deleção do médico!</h2>
                                    </div>
                                    <div class="mt-2">
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
        });
    }
}
