import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginUser } from 'src/app/model/loginModel';
import { MedicineModels } from 'src/app/model/medicinesModel';
import { CreateMedicineComponent } from '../create-medicine/create-medicine.component';
import { MedicineService } from 'src/app/services/medicine.service';
import Swal from 'sweetalert2';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-get-medicine',
    templateUrl: './get-medicine.component.html',
    styleUrls: ['./get-medicine.component.scss'],
})
export class GetMedicineComponent implements OnInit {
    medicines: MedicineModels[] = [];
    user!: LoginUser;

    constructor(
        private dialog: MatDialog,
        private medicineService: MedicineService,
        private storageService: StorageService
    ) {}

    ngOnInit() {
        this.search();
    }

    search() {
        this.medicineService
            .getMedicine()
            .toPromise()
            .then((result) => {
                this.medicines = result!;
            });

        this.user = this.storageService.getStorage('user');
    }

    createMedicine() {
        this.dialog.open(CreateMedicineComponent, {
            maxWidth: 600,
            maxHeight: 800,
            disableClose: true,
        });
    }

    editMedicine(medicine: MedicineModels) {
        this.dialog.open(CreateMedicineComponent, {
            maxWidth: 600,
            maxHeight: 800,
            data: medicine,
            disableClose: true,
        });
    }

    deleteMedicine(medicine: MedicineModels) {
        Swal.fire({
            icon: 'warning',
            html: `
            <div style="text-align: center">
                <h2>Você tem certeza da delação do medicamento?</h2>
                <div class="mt-2">
                    <b><span>Nome: </span></b> ${medicine.name}
                </div>
                <div class="mt-2 mb-2">
                    <b><span>Quantidade: </span></b> ${medicine.quantity}
                </div>
                <div class="mt-2 mb-2">
                    <b><span>Recomendação: </span></b> ${medicine.recommendation}
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
                this.medicineService
                    .deleteMedicine(medicine.id)
                    .toPromise()
                    .then(() => {
                        Swal.fire({
                            html: ` 
                                <div style="text-align: center">
                                    <b><span style="font-size: 30px">Parabéns!</span></b>
                                    <div class="mt-3">
                                        <h2>Você deletou o medicamento com sucesso!</h2>
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
                                        <h2>Não foi possível a deleção do medicamento!</h2>
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
