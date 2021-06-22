import "./App.scss";
import React, { useState, useEffect } from "react";
import currencies from "./commonCurrency.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSyncAlt,
  faDollarSign,
  faEuroSign,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [inputFrom, setInputFrom] = useState(0);
  const [inputTo, setInputTo] = useState(0);
  const [rate, setRate] = useState(0);
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("EUR");

  const handleChangeFrom = (event) => {
    const { value } = event.target;
    setInputFrom(value);
    setInputTo(value * rate);
  };

  const handleChangeTo = (event) => {
    const { value } = event.target;
    setInputTo(value);
    setInputFrom(value / rate);
  };

  const handleSelectFrom = (event) => {
    const { value } = event.target;
    setCurrencyFrom(value);
  };
  const handleSelectTo = (event) => {
    const { value } = event.target;
    setCurrencyTo(value);
  };
  const handleSwap = () => {
    setCurrencyFrom(currencyTo);
    setCurrencyTo(currencyFrom);
  };

  useEffect(() => {
    const fetchConversionRates = async () => {
      const result = await fetch(
        `https://v6.exchangerate-api.com/v6/ed66962687fdf4b5a9afb6c6/latest/${currencyFrom}`
      );
      if (result.ok) {
        const rates = await result.json();
        setRate(rates.conversion_rates[currencyTo]);
      }
    };
    fetchConversionRates();
  });

  return (
    <div className="App">
      <header>
        <FontAwesomeIcon icon={faDollarSign} size="2x" />
        <h2> Exchange Rate Calculator </h2>
        <FontAwesomeIcon icon={faEuroSign} size="2x" />
      </header>
      <div id="container">
        <div id="content-box">
          <div id="inputs">
            <input
              id="amountFrom"
              type="number"
              value={inputFrom}
              onChange={handleChangeFrom}
            ></input>
            <input
              id="amountTo"
              type="number"
              value={inputTo}
              onChange={handleChangeTo}
            ></input>
          </div>

          <p>
            1 {currencyFrom} = {rate} {currencyTo}
          </p>
          <div id="selectors">
            <select onChange={handleSelectFrom} value={currencyFrom}>
              {Object.keys(currencies).map((currency, index) => (
                <option value={currency} key={index}>
                  {currency} - {currencies[currency].name}
                </option>
              ))}
            </select>
            <button id="swap-icon">
              <FontAwesomeIcon
                icon={faSyncAlt}
                size="2x"
                onClick={handleSwap}
              />
            </button>

            <select onChange={handleSelectTo} value={currencyTo}>
              {Object.keys(currencies).map((currency, index) => {
                return (
                  <option value={currency} key={index}>
                    {currency} - {currencies[currency].name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
