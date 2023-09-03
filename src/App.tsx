import { CurrencyOptions } from "./CurrencyOptions/CurrencyOptions";
import { getRate } from "./API's/GetRate";
import "./App.css";
import { useState, useRef } from "react";
import { useFormik } from "formik";
import { Values } from "./Interfaces/values";
import * as yup from "yup";

function App() {
  const [currencyFrom, setCurrencyFrom] = useState<string>("");
  const [currencyTo, setCurrencyTo] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null!);
  const formik = useFormik({
    initialValues: {
      amount: 1,
    },
    validationSchema: yup.object({
      amount: yup
        .number()
        .min(1, "Enter any number more than 0")
        .required("Required"),
    }),
    onSubmit: (values) => {
      getResult(values);
    },
  });

  const getResult = async (values: Values) => {
    const rates = await getRate(currencyFrom, currencyTo);

    if (rates) {
      const result = (values.amount * rates).toFixed(5);
      inputRef.current.value = result.toString();
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="convert-container">
        <div className="convert-from">
          <label>Convert FROM:</label>
          <CurrencyOptions setCurrency={setCurrencyFrom} />
          <label>Enter the amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            onChange={formik.handleChange}
            value={formik.values.amount}
          />
        </div>

        <div className="convert-to">
          <label>Convert TO:</label>
          <CurrencyOptions setCurrency={setCurrencyTo} />
          <label>Result:</label>
          <input type="number" ref={inputRef} readOnly />
        </div>
      </div>
      <div className="error">
        {formik.errors.amount
          ? formik.errors.amount
          : (currencyFrom && currencyTo)
          ? ""
          : null}
      </div>
      <button type="submit">Convert</button>
    </form>
  );
}

export default App;
