import { useState, useEffect, useRef } from 'react';
import { Block } from './components/Block';
import './App.scss';

const defaultCurrencies = ['BYN', 'USD', 'EUR', 'PLN'];

function App() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BYN');
  // const [exchangeRates, setExchangeRates] = useState({});
  const [amountFromMoney, setAmountFromMoney] = useState('');
  const [amountToMoney, setAmountToMoney] = useState('');

  const exchangeRatesRef = useRef({});

  useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/latest.js')
      .then((res) => res.json())
      .then((json) => {
        updateAmountFromInput(1);
        exchangeRatesRef.current = json.rates;
      })
      .catch((e) => console.log('error during fetching rates', e));
  }, []);

  const currencyList = () => {
    const items = [];
    for (const currency in exchangeRatesRef.current) {
      if (
        Object.hasOwnProperty.call(exchangeRatesRef.current, currency) &&
        defaultCurrencies.includes(currency)
      ) {
        const currencyItem = (
          <li key={currency}>
            {currency} - {exchangeRatesRef.current[currency]}
          </li>
        );
        items.push(currencyItem);
      }
    }

    return items;
  };

  const updateAmountFromInput = (value) => {
    setAmountFromMoney(value);
    const result = (
      (exchangeRatesRef.current[toCurrency] /
        exchangeRatesRef.current[fromCurrency]) *
      value
    ).toFixed(2);
    setAmountToMoney(result);
  };

  const updateAmountToInput = (value) => {
    setAmountToMoney(value);
    const result = (
      (exchangeRatesRef.current[fromCurrency] /
        exchangeRatesRef.current[toCurrency]) *
      value
    ).toFixed(2);
    setAmountFromMoney(result);
  };

  useEffect(() => {
    const result = (
      (exchangeRatesRef.current[toCurrency] /
        exchangeRatesRef.current[fromCurrency]) *
      amountFromMoney
    ).toFixed(2);
    setAmountToMoney(result);
  }, [toCurrency]);

  useEffect(() => {
    const result = (
      (exchangeRatesRef.current[fromCurrency] /
        exchangeRatesRef.current[toCurrency]) *
      amountToMoney
    ).toFixed(2);
    setAmountFromMoney(result);
  }, [fromCurrency]);

  return (
    <div className="App">
      <Block
        onChangeCurrency={setFromCurrency}
        value={amountFromMoney}
        currency={fromCurrency}
        onChangeAmount={updateAmountFromInput}
      />
      <Block
        onChangeCurrency={setToCurrency}
        value={amountToMoney}
        currency={toCurrency}
        onChangeAmount={updateAmountToInput}
      />
      <ul>{currencyList()}</ul>
    </div>
  );
}

export default App;
