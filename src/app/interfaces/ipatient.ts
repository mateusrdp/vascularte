export interface IPatient {
  id: number;
  name: string;
  dob: Date;
  gender: string;
  ethnicity: string;
  civilStatus: string;
  // TODO: refactor patients phone number to number type and use pipes to format it
  phone: string;
  profession: string;
  address: string;
  naturalFrom: string;
  origin: string;
  referredBy: string;
  obs: string;
}
