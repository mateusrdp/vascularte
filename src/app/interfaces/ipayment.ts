export interface IPayment {
  id: number;
  login: string;
  date: string;
  insuranceProviderName: string;
  amountCharged: number;
  receipt: number;
}
