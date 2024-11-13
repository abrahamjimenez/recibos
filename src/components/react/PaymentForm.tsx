import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./PaymentForm.module.scss";

interface PaymentReceiptData {
  name: string;
  address: string;
  city: string;
  phone: string;
  dateReceived: string;
  datePromised: string;
  remarks: string;
  cash: boolean;
  card: boolean;
  weekly: boolean;
  monthly: boolean;
  willCall: boolean;
  mail: boolean;
  cashPrice: number;
  cardPrice: number;
  weeklyPrice: number;
  monthlyPrice: number;
  willCallPrice: number;
  mailPrice: number;
  totalPrice: number;
  total: number;
  purchaseDates: string[];
}

interface FormData extends PaymentReceiptData {
  [key: string]: string | number | boolean | string[];
}

const PaymentForm = () => {
  const date = new Date();

  function getCurrentDate() {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function getFutureDate() {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}T10:00`;
  }

  const [formData, setFormData] = useState<FormData>({
    name: "",
    address: "1608 W Sylvester St Unit C",
    city: "Pasco",
    phone: "",
    dateReceived: getCurrentDate(),
    datePromised: getFutureDate(),
    remarks: "",
    cash: false,
    card: false,
    weekly: false,
    monthly: false,
    willCall: false,
    mail: false,
    cashPrice: 0,
    cardPrice: 0,
    weeklyPrice: 0,
    monthlyPrice: 0,
    willCallPrice: 0,
    mailPrice: 0,
    totalPrice: 0,
    total: 0,
    purchaseDates: [],
  });
  const [tableData, setTableData] = useState<string[]>([]);

  function addItem(selectedItem: string) {
    setTableData((prevData) => [...prevData, selectedItem]);
  }

  function removeItem(selectedItem: string) {
    setTableData((prevData) =>
      prevData.filter((item) => item !== selectedItem),
    );
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { value, name } = e.target;

    console.log(value, name);

    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: name.endsWith("Price") ? Number(value) : value,
      };

      if (name.endsWith("Price")) {
        updatedData.totalPrice =
          updatedData.cashPrice +
          updatedData.cardPrice +
          updatedData.mailPrice +
          updatedData.weeklyPrice +
          updatedData.monthlyPrice +
          updatedData.willCallPrice;
      }

      if (name === "total") {
        updatedData.total = Number(value);
      }

      return updatedData;
    });
  }

  function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;

    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: checked,
      };

      if (checked) {
        updatedData.totalPrice += Number(updatedData[name + "Price"]);
      } else {
        updatedData.totalPrice -= Number(updatedData[name + "Price"]);
      }

      return updatedData;
    });

    if (checked) {
      addItem(name);
    } else {
      removeItem(name);
    }
  }

  function handlePhone() {}

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const updatedData = {
      ...formData,
      purchaseDates: [...formData.purchaseDates, date.toString()],
    };

    console.log(updatedData);

    resetFormData();
  }

  function resetFormData() {
    setFormData({
      name: "",
      address: "1608 W Sylvester St Unit C",
      city: "Pasco",
      phone: "",
      dateReceived: getCurrentDate(),
      datePromised: getFutureDate(),
      remarks: "",
      cash: false,
      card: false,
      weekly: false,
      monthly: false,
      willCall: false,
      mail: false,
      cashPrice: 0,
      cardPrice: 0,
      weeklyPrice: 0,
      monthlyPrice: 0,
      willCallPrice: 0,
      mailPrice: 0,
      totalPrice: 0,
      total: 0,
      purchaseDates: [],
    });

    setTableData([]);
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <h1>
        No. <span>0001</span>
      </h1>

      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          name="address"
          id="address"
          value={formData.address}
          autoComplete="off"
          readOnly
          disabled
        />
      </div>

      <div>
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          id="city"
          value={formData.city}
          readOnly
          disabled
        />
      </div>

      <div>
        <label htmlFor="phone">Phone</label>
        <PhoneInput
          defaultCountry="US"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handlePhone}
          autoComplete="off"
        />
      </div>

      <div>
        <div>
          <label htmlFor="dateReceived">Date Received</label>
          <input
            type="date"
            name="dateReceived"
            id="dateReceived"
            value={formData.dateReceived}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="datePromised">Date Promised</label>
          <input
            type="datetime-local"
            name="datePromised"
            id="datePromised"
            value={formData.datePromised}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label htmlFor="remarks">Remarks</label>
        <textarea
          name="remarks"
          id="remarks"
          cols={5000}
          rows={4}
          value={formData.remarks}
          onChange={handleChange}
        ></textarea>
      </div>

      <div>
        <label htmlFor="total">Total</label>
        <input
          type="number"
          name="total"
          id="total"
          value={formData.total === 0 ? "" : formData.total}
          onChange={handleChange}
        />
      </div>

      <div>
        {["cash", "card", "weekly", "monthly", "willCall", "mail"].map(
          (name) => (
            <div key={name}>
              <input
                type="checkbox"
                id={name}
                name={name}
                checked={Boolean(formData[name])}
                onChange={handleCheckbox}
              />
              <label htmlFor={name}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </label>
            </div>
          ),
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Date</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data) => (
            <tr key={data}>
              <th scope="row">
                {data.charAt(0).toUpperCase() + data.slice(1)}
              </th>
              <td></td>
              <td>
                <input
                  type="number"
                  name={`${data}Price`}
                  id={`${data}Price`}
                  value={
                    Number(formData[data + "Price"]) === 0
                      ? ""
                      : Number(formData[data + "Price"])
                  }
                  onChange={handleChange}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Total</th>
            <td>{getCurrentDate()}</td>
            <td>
              {formData.total | 0} - {formData.totalPrice} ={" "}
              {Number(formData.total) - formData.totalPrice}
            </td>
          </tr>
        </tfoot>
      </table>

      <button type="submit">Submit</button>
    </form>
  );
};

export default PaymentForm;
