import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { DashboardModels } from 'src/app/model/dashboardModels';
import { MedicineModels } from 'src/app/model/medicinesModel';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    dashboard!: DashboardModels;
    medicines: MedicineModels[] = [];
    isLoading: boolean = false;
    constructor(private dashboardService: DashboardService) {}

    ngOnInit(): void {
        this.search();
    }

    async search() {
        this.isLoading = true;
        await this.dashboardService
            .getDashboard()
            .toPromise()
            .then((result) => {
                this.dashboard = result!;
                this.medicines = this.dashboard.medicine;
            });

        this.isLoading = false;
    }
}
