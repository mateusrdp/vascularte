import { IDoctor } from '../interfaces/idoctor';
import { IPatient } from '../interfaces/ipatient';
import gql from 'graphql-tag';

export const ALL_PATIENT_NAMES = gql `query AllPatientNames{ patient { name } }`;

export interface AllPatientNamesResponse {
  patient: {
    name: string;
  }[];
  loading: boolean;
}

export const SIGN_IN = gql`
  mutation SignIn ($usr: String!, $pwd: String!) {
    signIn( login: $usr, password: $pwd ){
      token
    }
  }
`;

export interface SignInResponse {
  signIn: {
    token: string;
  };
  loading: boolean;
}

export const DRS_DATA = gql`
  query DrsData {
    doctor {
      login
      name
      identityDocument
      register
      address
      gender
      phone
      city
      state
      specialty
    }
  }
`;

export interface DrsDataResponse {
  doctor: IDoctor;
  loading: boolean;
}

export const PATIENT_DATA = gql`
  query PatientData($name: String!) {
    patient (name: $name) {
      id
      name
      dob
      gender
      ethnicity
      civilStatus
      phone
      profession
      address
      naturalFrom
      origin
      referredBy
      obs
    }
  }
`;

export interface PatientDataResponse {
  patient: IPatient;
  loading: boolean;
}
