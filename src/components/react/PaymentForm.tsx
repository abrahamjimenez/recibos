import React, { useState } from "react";
import PhoneInput, { type Value } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import styles from "./PaymentForm.module.scss";

const PaymentForm = () => {
  const [value, setValue] = useState<Value>();
  const [tableData, setTableData] = useState<string[]>([]);

  return (
    <form action="">
      <label htmlFor="name">Name</label>
      <input type="text" name="name" id="name" autoComplete="off" />

      <label htmlFor="address">Address</label>
      <input
        type="text"
        name="address"
        id="address"
        value="1608 W Sylvester St Unit C"
        autoComplete="off"
        readOnly
        disabled
      />

      <label htmlFor="city">City</label>
      <input
        type="text"
        name="city"
        id="city"
        value="Pasco"
        readOnly
        disabled
      />

      <label htmlFor="phone">Phone</label>
      <PhoneInput
        defaultCountry="US"
        name="phone"
        id="phone"
        value={value}
        onChange={setValue}
        autoComplete="off"
      />

      <label htmlFor="dateReceived">Date Received</label>
      <input type="date" name="dateReceived" id="dateReceived" />

      <label htmlFor="datePromised">Date Promised</label>
      <input type="datetime-local" name="datePromised" id="datePromised" />

      <label htmlFor="remarks">Remarks</label>
      <textarea name="remarks" id="remarks" cols={50} rows={4}></textarea>

      <label htmlFor="total">Total</label>
      <input type="number" name="total" id="total" />

      <div className={styles.checkboxContainer}>
        {["cash", "card", "other"].map((name) => (
          <div key={name} className={styles.checkboxContainerDiv}>
            <input type="checkbox" id={name} name={name} />
            <label htmlFor={name}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </label>
          </div>
        ))}
      </div>

      <table className="table">
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
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Total</th>
            <td>Date</td>
            <td>0 - 0 = 0</td>
          </tr>
        </tfoot>
      </table>

      <button type="submit">Submit</button>
    </form>
  );
};

export default PaymentForm;
