import { DoctorModels } from './doctorModel';
import { PatientModels } from './patientModel';

export interface AppointmentModels {
    id: number;
    date: string;
    time: string;
    Doctor: DoctorModels;
    Patient: PatientModels;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}

export interface AppointmentCreate {
    date: string;
    time: string;
    DoctorId: number;
    PatientId: number;
}
