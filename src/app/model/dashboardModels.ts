import { MedicineModels } from './medicinesModel';

export interface DashboardModels {
    numberDoctor: number;
    numberPatient: number;
    numberAppointments: number;
    medicine: MedicineModels[];
}
