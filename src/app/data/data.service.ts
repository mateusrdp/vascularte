// TODO: Implement saving data
import { Injectable, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import {
  AllPatientNamesResponse,
  ALL_PATIENT_NAMES,
  PatientDataResponse,
  PATIENT_DATA,
  ConsultationDataResponse,
  CONSULTATION_DATA, PaymentDataResponse, PAYMENT_DATA
} from '../graphql/queries';
import { IPatient } from '../interfaces/ipatient';
import { IConsultation } from '../interfaces/iconsultation';
import { AuthService } from '../auth/auth.service';
import { IPayment } from '../interfaces/ipayment';
import {BehaviorSubject} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService implements OnInit {

  private _allPatientNames: string[] = [];

  private _patient: IPatient = null;
  private _consultation: IConsultation = null;
  private _payments: IPayment[] = null;

  private _newPaymentData = new BehaviorSubject(false);

  ngOnInit() {}

  constructor(private apollo: Apollo, private httpLink: HttpLink, private auth: AuthService) { }

  refetchPatientNames() {
    this.apollo.query<AllPatientNamesResponse>({ query: ALL_PATIENT_NAMES }).subscribe(result => {
      this._allPatientNames = [];
      for (const patient of result.data.patient) {
        this._allPatientNames.push(patient.name);
      }
    }, error => {
      alert(error);
    });
  }

  get allPatientNames(): string[] {
    return this._allPatientNames;
  }

  loadPatientData(patientName: string) {
    this.apollo.query<PatientDataResponse>({
      query: PATIENT_DATA,
      variables: {name: patientName}
    }).subscribe(result => {
      this._patient = result.data.patient[0];
      this._patient.dob = new Date(result.data.patient[0].dob); // hack to get the date right
      // The API is designed to do the search itself, but giving an exact match will only return one, unless two have the same name
      // TODO: handle the same name scenario
      if (this.auth.isRegisteredDoctor) {
        this.loadConsultationData();
        this.loadPaymentData();
      }
    }, error => {
      alert(error);
    });
  }

  get patient() {
    return this._patient;
  }

  newPatient() {
    this._patient = {
      id: -1,
      name: '',
      dob: new Date(),
      gender: '',
      ethnicity: '',
      civilStatus: '',
      phone: '',
      profession: '',
      address: '',
      naturalFrom: '',
      origin: '',
      referredBy: '',
      obs: ''
    };
  }

  closePatient() {
    this._patient = null;
    this._consultation = null;
    this._payments = null;
  }

  get consultation() {
    return this._consultation;
  }

  loadConsultationData() {
    this.apollo.query<ConsultationDataResponse>({
        query: CONSULTATION_DATA,
        variables: {name: this.patient.name}
    }).subscribe(result => {
      this._consultation = result.data.consultation[0];
      if (!this._consultation) {
        this.newConsultation();
      }
    }, error => {
      alert(error);
    });
  }

  newConsultation() {
    this._consultation = {
      anamnesis: '',
      physical: '',
      hypothesis: '',
      conduct: '',
      evolution: '',
      examination: '',
      surgical_procedures: ''
    };
  }

  get payments() {
    return this._payments;
  }

  get newPaymentData() {
    return this._newPaymentData.asObservable();
  }

  loadPaymentData() {
    this.apollo.query<PaymentDataResponse>({
      query: PAYMENT_DATA,
      variables: {name: this.patient.name}
    }).subscribe(result => {
      this._payments = result.data.payment;
      this._newPaymentData.next(true);
    }, error => {
      alert(error);
    });
  }
}
