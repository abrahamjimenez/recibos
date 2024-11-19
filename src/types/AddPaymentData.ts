export interface AddPaymentData {
  customerId: number;
  name: string;
  address: string;
  city: string;
  phone: string;
  orders: Order[];
}

export interface Order {
  orderId: number;
  customerId: number;
  dateReceived: string;
  datePromised: string;
  remarks: string;
  totalCharges: number;
  deposit: number;
  balanceDue: number;
  customer: AddPaymentData;
  payments: Payments[];
}

interface Payments {
  paymentId: number;
  orderId: number;
  paymentMethod: string;
  amount: number;
  dateReceived: string;
}
