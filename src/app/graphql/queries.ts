import { IDoctor } from '../interfaces/idoctor';
import { IPatient } from '../interfaces/ipatient';
import gql from 'graphql-tag';
import {IConsultation} from '../interfaces/iconsultation';
import {IPayment} from '../interfaces/ipayment';

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
  patient: IPatient[];
  loading: boolean;
}

export const CREATE_PATIENT = gql`
  mutation CreatePatient(
    $name: String!
    $dob: String!
    $gender: String
    $ethnicity: String
    $civilStatus: String
    $phone: String
    $profession: String
    $address: String
    $naturalFrom: String
    $origin: String
    $referredBy: String
    $obs: String
  ) {
    addPatient (
      name: $name
      dob: $dob
      gender: $gender
      ethnicity: $ethnicity
      civilStatus: $civilStatus
      phone: $phone
      profession: $profession
      address: $address
      naturalFrom: $naturalFrom
      origin: $origin
      referredBy: $referredBy
      obs: $obs
    ) {
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

export interface PatientCreateResponse {
  patient: IPatient;
  loading: boolean;
}

export const CONSULTATION_DATA = gql`
  query ConsultationData($name: String!) {
    consultation (name: $name) {
      anamnesis
      physical
      hypothesis
      conduct
      evolution
      examination
      surgicalProcedures
    }
  }
`;

export interface ConsultationDataResponse {
  consultation: IConsultation[];
  loading: boolean;
}

export const CREATE_CONSULTATION = gql`
  mutation CreateConsultation(
    $id: Int!,
    $anamnesis: String,
    $physical: String,
    $hypothesis: String,
    $conduct: String,
    $evolution: String,
    $examination: String,
    $surgicalProcedures: String
  ) {
    addConsultation (
      id:$id,
      anamnesis:$anamnesis,
      physical:$physical,
      hypothesis:$hypothesis,
      conduct:$conduct,
      evolution:$evolution,
      examination:$examination,
      surgicalProcedures:$surgicalProcedures
    ) {
      login
      id
      anamnesis
      physical
      hypothesis
      conduct
      evolution
      examination
      surgicalProcedures
    }
  }
`;

export interface ConsultationCreateResponse {
  consultation: IConsultation;
  loading: boolean;
}

export const PAYMENT_DATA = gql`
  query PaymentData($name: String!) {
    payment (name: $name) {
      date
      insuranceProviderName
      amountCharged
      receipt
    }
  }
`;

export interface PaymentDataResponse {
  payment: IPayment[];
  loading: boolean;
}

export const ADD_PAYMENT = gql`
  mutation AddPayment(
    $pacId: Int!,
    $payDate: String!,
    $insuranceProviderName: String!,
    $amountCharged: Float!,
    $receipt: Float!
  ){
    addPayment(
      id:$pacId,
      date:$payDate,
      insuranceProviderName:$insuranceProviderName,
      amountCharged:$amountCharged,
      receipt:$receipt
    ) {
      id
      date
      insuranceProviderName
      amountCharged
      receipt
    }
  }
`;

export interface AddOrRemovePaymentDataResponse {
  payment: IPayment;
  loading: boolean;
}

export const REMOVE_PAYMENT = gql`
  mutation RemovePayment(
  $pacId: Int!,
  $payDate: String!
  ){
    removePayment(
      id:$pacId,
      date:$payDate,
    ) {
      id
      date
      insuranceProviderName
      amountCharged
      receipt
    }
  }
`;
