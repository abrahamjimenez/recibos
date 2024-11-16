export interface Order {
  orderId: number;
  customerId: number;
  dateReceived: string;
  datePromised: string;
  remarks: string;
  totalCharges: number;
  deposit: number;
  balanceDue: number;
  customer: Customer;
  payments: Payments[];
}

interface Customer {
  customerId: number;
  name: string;
  address: string;
  city: string;
  phone: string;
}

interface Payments {
  paymentId: number;
  orderId: number;
  paymentMethod: string;
  amount: number;
  dateReceived: string;
}
