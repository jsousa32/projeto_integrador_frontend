import { Component, OnInit } from '@angular/core';
import { PatientModels } from 'src/app/model/patientModel';
import { PatientService } from 'src/app/services/patient.service';
import { CreatePatientComponent } from '../create-patient/create-patient.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-get-patients',
    templateUrl: './get-patients.component.html',
    styleUrls: ['./get-patients.component.scss'],
})
export class GetPatientsComponent implements OnInit {
    patients: PatientModels[] = [];

    constructor(
        private patientService: PatientService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.search();
    }

    search() {
        this.patientService
            .getPatient()
            .toPromise()
            .then((result) => {
                this.patients = result!;
            });
    }

    createPatient() {
        this.dialog.open(CreatePatientComponent, {
            disableClose: false,
            maxWidth: 800,
            maxHeight: 600,
        });
    }

    editPatient(patient: PatientModels) {
        this.dialog.open(CreatePatientComponent, {
            maxWidth: 600,
            maxHeight: 600,
            data: patient,
            disableClose: true,
        });
    }

    deletePatient(patient: PatientModels) {
        Swal.fire({
            icon: 'warning',
            html: `
            <div style="text-align: center">
                <h2>Você tem certeza da delação do paciente?</h2>
                <div class="mt-2">
                    <b><span>Nome: </span></b> ${patient.name}
                </div>
                <div class="mt-2 mb-2">
                    <b><span>Número do SUS: </span></b> ${patient.susNumber}
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
                this.patientService
                    .deletePatient(patient.id)
                    .toPromise()
                    .then(() => {
                        Swal.fire({
                            html: ` 
                                <div style="text-align: center">
                                    <b><span style="font-size: 30px">Parabéns!</span></b>
                                    <div class="mt-3">
                                        <h2>Você deletou o paciente com sucesso!</h2>
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
                                        <h2>Não foi possível a deleção do paciente!</h2>
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
