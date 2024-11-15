import React, {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useState,
} from "react";
import PhoneInput, { type Value } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import styles from "./PaymentForm.module.scss";

const PaymentForm = () => {
  const getCurrentDateTime = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const getCurrentDateTimeFormatted = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:00`;
  };

  const [customer, setCustomer] = useState({
    customerId: 4,
    name: "",
    address: "1608 W Sylvester St Unit C",
    city: "Pasco",
    phone: "",
  });
  const [order, setOrder] = useState({
    orderId: 1004,
    customerId: 4,
    dateReceived: getCurrentDateTime(),
    datePromised: getCurrentDateTimeFormatted(),
    remarks: "",
    totalCharges: 0,
    deposit: 0,
    balanceDue: 0,
  });
  const [payment, setPayment] = useState({
    paymentId: 5004,
    orderId: 1004,
    paymentMethod: "Cash",
    amount: 0,
    dateReceived: getCurrentDateTime(),
  });

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setCustomer((prevCustomerData) => ({
      ...prevCustomerData,
      name: value,
    }));
  };

  const handlePhone = (e: Value) => {
    setCustomer((prevCustomerData) => ({
      ...prevCustomerData,
      phone: e,
    }));
  };

  const handleOrderDate = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setOrder((prevOrderData) => ({
      ...prevOrderData,
      datePromised: value,
    }));
  };

  const handleRemarks = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    setOrder((prevOrderData) => ({
      ...prevOrderData,
      remarks: value,
    }));
  };

  const handleTotalCharges = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const newAmount = value === "" ? 0 : parseFloat(value);

    setOrder((prevOrderData) => ({
      ...prevOrderData,
      totalCharges: newAmount,
    }));
  };

  const handleDeposit = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const newAmount = value === "" ? 0 : parseFloat(value);

    setOrder((prevOrderData) => ({
      ...prevOrderData,
      deposit: newAmount,
    }));
  };

  useEffect(() => {
    setOrder((prevOrderData) => ({
      ...prevOrderData,
      balanceDue: parseFloat(
        (order.totalCharges - order.deposit - payment.amount).toFixed(2),
      ),
    }));
  }, [order.totalCharges, order.deposit, payment.amount]);

  const handleAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const newAmount = value === "" ? 0 : parseFloat(value);

    setPayment((prevPaymentData) => ({
      ...prevPaymentData,
      amount: newAmount,
    }));
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(customer, order, payment);
  };

  return (
    <form action="" onSubmit={submitHandler}>
      <h2>Customer</h2>

      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        autoComplete="off"
        onChange={handleName}
        value={customer.name}
      />

      <label htmlFor="address">Address</label>
      <input
        type="text"
        name="address"
        id="address"
        value={customer.address}
        autoComplete="off"
        readOnly
        disabled
      />

      <label htmlFor="city">City</label>
      <input
        type="text"
        name="city"
        id="city"
        value={customer.city}
        readOnly
        disabled
      />

      <label htmlFor="phone">Phone</label>
      <PhoneInput
        defaultCountry="US"
        name="phone"
        id="phone"
        value={customer.phone}
        onChange={handlePhone}
        autoComplete="off"
      />

      <hr />

      <h2>Order</h2>

      <label htmlFor="orderDateReceived">Date Received</label>
      <input
        type="datetime-local"
        name="orderDateReceived"
        id="orderDateReceived"
        value={order.dateReceived}
        disabled
        readOnly
      />

      <label htmlFor="orderDatePromised">Date Promised</label>
      <input
        type="datetime-local"
        name="orderDatePromised"
        id="orderDatePromised"
        value={order.datePromised}
        onChange={handleOrderDate}
      />

      <label htmlFor="remarks">Remarks</label>
      <textarea
        name="remarks"
        id="remarks"
        cols={50}
        rows={4}
        value={order.remarks}
        onChange={handleRemarks}
      />

      <label htmlFor="total">Total Charges</label>
      <input
        type="number"
        name="total"
        id="total"
        value={order.totalCharges === 0 ? "" : order.totalCharges}
        onChange={handleTotalCharges}
      />

      <label htmlFor="deposit">Deposit</label>
      <input
        type="number"
        name="deposit"
        id="deposit"
        value={order.deposit === 0 ? "" : order.deposit}
        onChange={handleDeposit}
      />

      <p>Balance Due: {order.balanceDue}</p>

      <hr />

      <h2>Payment</h2>

      <label htmlFor="paymentDateReceived">Date Received</label>
      <input
        type="datetime-local"
        name="paymentDateReceived"
        id="paymentDateReceived"
        value={payment.dateReceived}
        disabled
        readOnly
      />

      <label htmlFor="amount">Amount</label>
      <input
        type="number"
        name="amount"
        id="amount"
        value={payment.amount === 0 ? "" : payment.amount}
        onChange={handleAmount}
      />

      <p>Balance Due: {order.balanceDue}</p>

      <button type="submit">Submit</button>
    </form>
  );
};

export default PaymentForm;
