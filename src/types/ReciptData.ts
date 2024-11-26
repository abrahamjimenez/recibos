export interface Order {
  orderId: number;
  customerId: number;
  dateReceived: string;
  datePromised: string;
  remarks: string;
  totalCharges: number;
  deposit: number;
  balanceDue: number;
}
