import React, { type ChangeEvent, type FormEvent, useState } from "react";
import PhoneInput, { type Value } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import styles from "./PaymentForm.module.scss";

const PaymentForm = () => {
  const [tableData, setTableData] = useState<string[]>([]);
  const [customer, setCustomer] = useState({
    customerId: 4,
    name: "",
    address: "1608 W Sylvester St Unit C",
    city: "Pasco",
    phone: "",
  });
  const [order, setOrder] = useState({
    orderId: 1001,
    customerId: 1,
    dateReceived: "2024-11-01",
    datePromised: "2024-11-05",
    remarks: "Soldar cadena $10",
    totalCharges: 50.0,
    deposit: 20.0,
    balanceDue: 30.0,
  });
  const [payment, setPayment] = useState({
    paymentId: 5001,
    orderId: 1001,
    paymentMethod: "Cash",
    amount: 20.0,
    dateReceived: "2024-11-01",
  });

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCustomer((prevCustomerData) => ({
      ...prevCustomerData,
      name: value,
    }));

    console.log(name, value);
  };

  const handlePhone = (e: Value) => {
    setCustomer((prevCustomerData) => ({
      ...prevCustomerData,
      phone: e,
    }));
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(customer);
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
      <input type="date" name="orderDateReceived" id="orderDateReceived" />

      <label htmlFor="orderDatePromised">Date Promised</label>
      <input
        type="datetime-local"
        name="orderDatePromised"
        id="orderDatePromised"
      />

      <label htmlFor="remarks">Remarks</label>
      <textarea name="remarks" id="remarks" cols={50} rows={4}></textarea>

      <label htmlFor="total">Total Charges</label>
      <input type="number" name="total" id="total" value={order.totalCharges} />

      <label htmlFor="deposit">Deposit</label>
      <input type="text" name="deposit" id="deposit" value={order.deposit} />

      <p>Balance Due: {order.balanceDue}</p>

      <hr />

      <h2>Payment</h2>

      <label htmlFor="paymentDateReceived">Date Received</label>
      <input type="date" name="paymentDateReceived" id="paymentDateReceived" />

      <div className={styles.checkboxContainer}>
        {["cash", "card", "other"].map((name) => (
          <div key={name} className={styles.checkboxContainerDiv}>
            <input type="radio" id={name} name="payment" />
            <label htmlFor={name}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </label>
          </div>
        ))}
      </div>

      <label htmlFor="amount">Amount</label>
      <input type="text" name="amount" id="amount" value={payment.amount} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default PaymentForm;
