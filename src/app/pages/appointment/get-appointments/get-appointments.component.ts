import { Component, OnInit } from '@angular/core';
import { AppointmentModels } from 'src/app/model/appointmentModel';
import { AppointmentService } from 'src/app/services/appointment.service';
import { CreateAppointmentComponent } from '../create-appointment/create-appointment.component';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { StorageService } from 'src/app/services/storage.service';
import { LoginUser } from 'src/app/model/loginModel';

@Component({
    selector: 'app-get-appointments',
    templateUrl: './get-appointments.component.html',
    styleUrls: ['./get-appointments.component.scss'],
})
export class GetAppointmentsComponent implements OnInit {
    appointments: AppointmentModels[] = [];
    user!: LoginUser;

    constructor(
        private appointmentService: AppointmentService,
        public dialog: MatDialog,
        private storageService: StorageService
    ) {}

    ngOnInit(): void {
        this.search();
    }

    search() {
        this.user = this.storageService.getStorage('user');
        if (this.user.isAdmin) {
            this.appointmentService
                .getAppointment()
                .toPromise()
                .then((result) => {
                    this.appointments = result!;

                    this.appointments.forEach((appointment) => {
                        appointment.date = moment(appointment.date).format(
                            'DD/MM/YYYY'
                        );

                        appointment.createdAt = moment(
                            appointment.createdAt
                        ).format('DD/MM/YYYY');
                    });
                });
        } else {
            this.appointmentService
                .getAppointmentByPatientId(this.user.id)
                .toPromise()
                .then((result) => {
                    this.appointments = result!;

                    this.appointments.forEach((appointment) => {
                        appointment.date = moment(appointment.date).format(
                            'DD/MM/YYYY'
                        );

                        appointment.createdAt = moment(
                            appointment.createdAt
                        ).format('DD/MM/YYYY');
                    });

                    console.log(this.appointments);
                });
        }
    }

    createAppointment() {
        this.dialog.open(CreateAppointmentComponent, {
            maxWidth: 600,
            maxHeight: 800,
            disableClose: true,
        });
    }

    updateAppointment(appointment: AppointmentModels) {
        this.dialog.open(CreateAppointmentComponent, {
            maxWidth: 600,
            maxHeight: 800,
            disableClose: true,
            data: appointment,
        });
    }

    deleteAppointment(appointment: AppointmentModels) {
        Swal.fire({
            icon: 'warning',
            html: `
            <div style="text-align: center">
                <h2>Você tem certeza da delação da consulta do paciente?</h2>
                <div class="mt-2">
                    <b><span>Nome: </span></b> ${appointment.Patient.name}
                </div>
                <div class="mt-2 mb-2">
                    <b><span>Número do SUS: </span></b> ${appointment.Patient.susNumber}
                </div>
                <div class="mt-2 mb-2">
                    <b><span>Médico(a): </span></b> ${appointment.Doctor.name}
                </div>
                <div class="mt-2 mb-2">
                    <b><span>Data consulta: </span></b> ${appointment.date}
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
                this.appointmentService
                    .deleteAppointment(appointment.id)
                    .toPromise()
                    .then(() => {
                        Swal.fire({
                            html: ` 
                                <div style="text-align: center">
                                    <b><span style="font-size: 30px">Parabéns!</span></b>
                                    <div class="mt-3">
                                        <h2>Você deletou a consulta com sucesso!</h2>
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
                                        <h2>Não foi possível a deleção da consulta!</h2>
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
