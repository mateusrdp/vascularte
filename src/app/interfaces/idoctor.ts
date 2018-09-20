export interface IDoctor {
  login: string;
  name: string;
  identityDocument: string;
  register: number;
  address: string;
  gender: string;
  // TODO: refactor doctors' phone number to number type and use pipes to format it
  phone: string;
  city: string;
  state: string;
  specialty: string;
}
