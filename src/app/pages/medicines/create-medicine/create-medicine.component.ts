import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MedicineModels } from 'src/app/model/medicinesModel';
import { MedicineService } from 'src/app/services/medicine.service';
import Swal from 'sweetalert2';
import { GetMedicineComponent } from '../get-medicine/get-medicine.component';

@Component({
    selector: 'app-create-medicine',
    templateUrl: './create-medicine.component.html',
    styleUrls: ['./create-medicine.component.scss'],
})
export class CreateMedicineComponent implements OnInit {
    form!: FormGroup;
    disabled: boolean = false;
    nameButton: string = 'Cadastrar';
    nameScreen: string = 'Cadastrar Medicamento';

    constructor(
        public medicineService: MedicineService,
        public dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public medicine: MedicineModels
    ) {}

    ngOnInit(): void {
        this.search();
    }

    search() {
        this.form = new FormGroup({
            name: new FormControl(null, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50),
            ]),
            manufacturer: new FormControl(null, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50),
            ]),
            quantity: new FormControl(null, [Validators.required]),
            packaging: new FormControl(null, [Validators.required]),
            recommendation: new FormControl(null, [Validators.required]),
        });
        this.checkMedicine();
    }

    createMedicine() {
        this.medicineService
            .createMedicine(this.form.value)
            .toPromise()
            .then(() => {
                Swal.fire({
                    html: ` 
                    <div style="text-align: center">
                        <b><span style="font-size: 30px">Parabéns!</span></b>
                        <div class="mt-3">
                            <h2>Você cadastrou o medicamento com sucesso!</h2>
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
                            <h2>Não foi possível o cadastro do medicamento!</h2>
                        </div>
                    </div>
                `,
                    icon: 'success',
                    confirmButtonColor: '#1c1c39',
                    confirmButtonText: 'Ok',
                });
            });
    }

    updateMedicine() {
        this.medicineService
            .updateMedicine(this.medicine.id, this.form.value)
            .toPromise()
            .then(() => {
                Swal.fire({
                    html: ` 
                    <div style="text-align: center">
                        <b><span style="font-size: 30px">Parabéns!</span></b>
                        <div class="mt-3">
                            <h2>Você atualizou o medicamento com sucesso!</h2>
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
                            <h2>Não foi possível a atualização do medicamento!</h2>
                        </div>
                    </div>
                `,
                    icon: 'success',
                    confirmButtonColor: '#1c1c39',
                    confirmButtonText: 'Ok',
                });
            });
    }

    cancel() {
        this.dialog.closeAll();
    }

    checkMedicine() {
        if (this.medicine) {
            this.form.get('name')?.disable();
            this.form.get('manufacturer')?.disable();
            this.form.get('packaging')?.disable();
            this.form.get('recommendation')?.disable();
            this.nameButton = 'Atualizar';
            this.nameScreen = 'Atualizar Medicamento';
        }
    }
}
