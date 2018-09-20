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
  CONSULTATION_DATA,
  PaymentDataResponse,
  PAYMENT_DATA,
  ADD_PAYMENT,
  AddOrRemovePaymentDataResponse,
  REMOVE_PAYMENT,
  CREATE_CONSULTATION,
  ConsultationCreateResponse, CREATE_PATIENT, PatientCreateResponse
} from '../graphql/queries';
import {IPatient} from '../interfaces/ipatient';
import {IConsultation} from '../interfaces/iconsultation';
import {AuthService} from '../auth/auth.service';
import {IPayment} from '../interfaces/ipayment';
import {BehaviorSubject} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService implements OnInit {

  // TODO: implement this with GraphQL subscriptions, so the drs always have an up-to-date list of patients, as the secretary adds them
  private _allPatientNames: string[] = [];

  private _patient: IPatient = null;
  private _consultation: IConsultation = null;
  private _payments: IPayment[] = null;

  private _paymentAdded = new BehaviorSubject({id: -1, login: '', date: '', insuranceProviderName: '', amountCharged: 0, receipt: 0 });
  private _paymentRemoved = new BehaviorSubject({id: -1, login: '', date: '', insuranceProviderName: '', amountCharged: 0, receipt: 0 });

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

  createPatientData() {
    this.apollo.mutate<PatientCreateResponse>({
      mutation: CREATE_PATIENT,
      variables: {
        name: this.patient.name,
        dob: this.patient.dob,
        gender: this.patient.gender,
        ethnicity: this.patient.ethnicity,
        civilStatus: this.patient.civilStatus,
        phone: this.patient.phone,
        profession: this.patient.profession,
        address: this.patient.address,
        naturalFrom: this.patient.naturalFrom,
        origin: this.patient.origin,
        referredBy: this.patient.referredBy,
        obs: this.patient.obs,
      }
    }).subscribe(result => {
      this._patient = result.data.patient;
      this._patient.dob = new Date(result.data.patient.dob); // hack to get the date right
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
      dob: null,
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

  get isNewPatient() {
    return this._patient.id <= 0;
  }

  closePatient() {
    this._patient = null;
    this._consultation = null;
    this._payments = null;
  }

  get consultation() {
    return this._consultation;
  }

  createConsultationData() {
    this.apollo.mutate<ConsultationCreateResponse>({
      mutation: CREATE_CONSULTATION,
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
      login: this.auth.doctor.login,
      id: -1,
      anamnesis: '',
      physical: '',
      hypothesis: '',
      conduct: '',
      evolution: '',
      examination: '',
      surgical_procedures: ''
    };
  }

  get isnewConsultation() {
    return this._consultation.id <= 0;
  }

  get payments() {
    return this._payments;
  }

  loadPaymentData() {
    this.apollo.query<PaymentDataResponse>({
      query: PAYMENT_DATA,
      variables: {name: this.patient.name}
    }).subscribe(result => {
      this._payments = result.data.payment;
    }, error => {
      alert(error);
    });
  }

  addPayment(pacId: Number, payDate: String, insuranceProviderName: String, amountCharged: Number, receipt: Number) {
    this.apollo.mutate<AddOrRemovePaymentDataResponse>({
      mutation: ADD_PAYMENT,
      variables: {
        pacId: pacId,
        payDate: payDate,
        insuranceProviderName: insuranceProviderName,
        amountCharged: amountCharged,
        receipt: receipt
      }
    }).subscribe(result => {
      this._paymentAdded.next(result.data.addPayment);
    }, error => {
      alert(error);
    });
  }

  removePayment(payment: IPayment) {
    this.apollo.mutate<AddOrRemovePaymentDataResponse>({
      mutation: REMOVE_PAYMENT,
      variables: {
        pacId: payment.id,
        payDate: payment.date,
      }
    }).subscribe(result => {
      this._paymentRemoved.next(result.data.removePayment);
    }, error => {
      alert(error);
    });
  }

  get paymentAdded() {
    return this._paymentAdded.asObservable();
  }

  get paymentRemoved() {
    return this._paymentRemoved.asObservable();
  }
}
