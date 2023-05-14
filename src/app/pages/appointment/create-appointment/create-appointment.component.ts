import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import {
    AppointmentCreate,
    AppointmentModels,
} from 'src/app/model/appointmentModel';
import { DoctorModels } from 'src/app/model/doctorModel';
import { LoginUser } from 'src/app/model/loginModel';
import { PatientModels } from 'src/app/model/patientModel';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { StorageService } from 'src/app/services/storage.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-create-appointment',
    templateUrl: './create-appointment.component.html',
    styleUrls: ['./create-appointment.component.scss'],
})
export class CreateAppointmentComponent implements OnInit {
    form!: FormGroup;
    checkListHour: boolean = false;
    selectedValue: string = '';
    user!: LoginUser;
    patient!: PatientModels;
    nameButton: string = 'Checar horário disponível';
    nameScreen: string = 'Cadastrar Consulta';
    doctors: DoctorModels[] = [];
    appointments: AppointmentModels[] = [];
    create!: AppointmentCreate;
    appointmentsHour: String[] = [];
    hours: String[] = [
        '07:00:00',
        '08:00:00',
        '09:00:00',
        '10:00:00',
        '11:00:00',
        '12:00:00',
        '13:00:00',
        '14:00:00',
        '15:00:00',
        '16:00:00',
        '17:00:00',
        '18:00:00',
        '19:00:00',
    ];

    constructor(
        private dialog: MatDialog,
        private _adapter: DateAdapter<any>,
        private doctorService: DoctorService,
        private patientService: PatientService,
        private appointmentService: AppointmentService,
        private storageService: StorageService,
        @Inject(MAT_DIALOG_DATA) public appointment: AppointmentModels
    ) {}

    ngOnInit(): void {
        this.search();
    }

    search() {
        this._adapter.setLocale('br');
        this.form = new FormGroup({
            date: new FormControl(null, [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(10),
            ]),
            DoctorId: new FormControl(null, Validators.required),
            time: new FormControl(null, Validators.required),
            PatientSusNumber: new FormControl(null, [Validators.required]),
        });
        this.form.get('time')?.disable();
        this.form.get('PatientSusNumber')?.disable();

        this.user = this.storageService.getStorage('user');

        this.patientService
            .getPatientById(this.user.id)
            .toPromise()
            .then((result) => {
                this.patient = result!;
            });

        this.doctorService
            .getDoctor()
            .toPromise()
            .then((resultDoctor) => {
                this.doctors = resultDoctor!;
            });
        this.checkAppointment();
    }

    checkHourAppointment() {
        this.appointmentsHour = [];

        const newDate = moment(this.form.get('date')?.value).format(
            'YYYY-MM-DD'
        );

        this.appointmentService
            .checkAppointments(newDate, this.form.get('DoctorId')?.value)
            .toPromise()
            .then(async (resultAppointment) => {
                this.appointments = resultAppointment!;

                this.appointments.forEach((appointment) => {
                    this.appointmentsHour.push(appointment.time);
                });

                await this.checkHour(this.appointmentsHour);

                this.form.get('time')?.enable();

                if (!this.user.isAdmin) {
                    this.nameButton = 'Marcar consulta';
                } else if (!this.appointment) {
                    this.form.get('PatientSusNumber')?.enable();
                    this.nameButton = 'Marcar consulta';
                } else {
                    this.nameButton = 'Atualizar';
                }
                this.checkListHour = true;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    checkHour(listHour: String[]) {
        for (let i = 0; i < this.hours.length; i++) {
            let count = 0;

            for (let j = 0; j < listHour.length; j++) {
                if (this.hours[i] === listHour[j]) {
                    count++;
                }

                if (!this.user.isAdmin && count === 2) {
                    this.hours.splice(i, 1);
                }

                if (this.user.isAdmin && count === 3) {
                    this.hours.splice(i, 1);
                }
            }
        }
    }

    async createAppointment() {
        await this.patientService
            .getPatientBySusNumber(this.form.get('PatientSusNumber')?.value)
            .toPromise()
            .then((result) => {
                this.create = {
                    date: this.form.get('date')?.value,
                    time: this.form.get('time')?.value,
                    DoctorId: this.form.get('DoctorId')?.value,
                    PatientId: result!.id,
                };
            });

        this.appointmentService
            .createAppointments(this.create)
            .toPromise()
            .then(() => {
                Swal.fire({
                    html: ` 
                    <div style="text-align: center">
                        <b><span style="font-size: 30px">Parabéns!</span></b>
                        <div class="mt-3">
                            <h2>Você cadastrou uma consulta com sucesso!</h2>
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
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    html: ` 
                    <div style="text-align: center">
                        <b><span style="font-size: 30px">Desculpe!</span></b>
                        <div class="mt-3">
                            <h2>Não foi possível o cadastro da consulta!</h2>
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

    async updateAppointment() {
        await this.patientService
            .getPatientBySusNumber(this.form.get('PatientSusNumber')?.value)
            .toPromise()
            .then((result) => {
                this.create = {
                    date: this.form.get('date')?.value,
                    time: this.form.get('time')?.value,
                    DoctorId: this.form.get('DoctorId')?.value,
                    PatientId: result!.id,
                };
            });

        this.appointmentService
            .updateAppointment(this.appointment.id, this.create)
            .toPromise()
            .then(() => {
                Swal.fire({
                    html: `
                    <div style="text-align: center">
                        <b><span style="font-size: 30px">Parabéns!</span></b>
                        <div class="mt-3">
                            <h2>Você atualizou a consulta com sucesso!</h2>
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
            .catch((err) => {
                Swal.fire({
                    html: `
                    <div style="text-align: center">
                        <b><span style="font-size: 30px">Desculpe!</span></b>
                        <div class="mt-3">
                            <h2>Não foi possível a atualização da consulta!</h2>
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

    cancel() {
        this.dialog.closeAll();
    }

    checkAppointment() {
        if (this.appointment) {
            console.log(this.appointment);
            this.form.get('PatientSusNumber')?.disable();
            this.nameScreen = 'Atualizar Consulta';
        }
    }
}
