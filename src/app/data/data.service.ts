import { Injectable, OnInit } from '@angular/core';

import { Apollo } from 'apollo-angular';

import { HttpLink } from 'apollo-angular-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import gql from 'graphql-tag';

import { AllPatientNamesResponse, ALL_PATIENT_NAMES, PatientDataResponse, PATIENT_DATA } from '../graphql/queries';
import { IPatient } from '../interfaces/ipatient';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit {

  private token: string;
  private _allPatientNames: string[] = [];
  private _patient: IPatient = {
      id: -1,
      name: 'No patient loaded',
      dob: '',
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

  ngOnInit() {}

  constructor(private apollo: Apollo, private httpLink: HttpLink) { }

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
      this.apollo.query<PatientDataResponse>({ query: PATIENT_DATA, variables: {name: patientName} }).subscribe(result => {
      this._patient = result.data.patient[0];
        // The API is designed to do the search itself, but giving an exact match will only return one, unless two have the same name
        // TODO: handle the same name scenario
    }, error => {
      alert(error);
    });
  }

  get patient() {
    return this._patient;
  }
}
