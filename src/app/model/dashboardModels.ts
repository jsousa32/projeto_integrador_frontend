import { MedicineModels } from './medicinesModel';

export interface DashboardModels {
    numberAppointmentsAtDay: number;
    numberAppointments: appointments[];
    medicine: MedicineModels[];
}
interface appointments {
    count: number;
    speciality: string;
}
