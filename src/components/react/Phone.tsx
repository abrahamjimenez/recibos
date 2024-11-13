import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import { type Value } from "react-phone-number-input";
import "react-phone-number-input/style.css";

const Phone = () => {
  const [value, setValue] = useState<Value>();

  return (
    <div className="small-receipt-form__phone-container">
      <label htmlFor="phone">Phone</label>
      <PhoneInput
        defaultCountry="US"
        name="phone"
        id="phone"
        value={value}
        onChange={setValue}
      />
    </div>
  );
};

export default Phone;
