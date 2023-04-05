import React from 'react';
import { Block } from './Block';
import './index.scss';
import Header from './Header';


function App() {
  const [fromCurrency ,setFromCurrency] = React.useState('UAH');
  const [toCurrency, setToCurrency] = React.useState('USD'); 
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(1);
  const [rate, setRate] = React.useState({});


  const ratesRef = React.useRef({});

  React.useEffect(() => {
    fetch('https://v6.exchangerate-api.com/v6/08690c66bbc3f0e322eeda99/latest/UAH')
      .then((response) => response.json())
      .then((data) => {
        setRate(data.conversion_rates);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  

  React.useEffect(() => {
    fetch('https://v6.exchangerate-api.com/v6/08690c66bbc3f0e322eeda99/latest/USD')
    .then((response) => response.json())
    .then((data) => {
      ratesRef.current =data.conversion_rates;
      onChangeToPrice(1);
    }).catch(err => {
      console.warn(err);
      alert('Не удалось');
    });
  },[]);

  const onChangeFromPrice = (value) =>{
    const fromRate = ratesRef.current[fromCurrency];
    const toRate = ratesRef.current[toCurrency];
    if (!fromRate || !toRate) {
        console.warn('Ошибка: не удалось получить курс валют');
        return;
    }
    const price = value / fromRate;
    const result = price * toRate;
    setToPrice(result.toFixed(2));
    setFromPrice(value);
};

const onChangeToPrice = (value) => {
  if (!ratesRef.current) {
    console.warn('Ошибка: данные о курсах валют не получены');
    return;
  }

  const price = value / ratesRef.current[toCurrency];
  const result = price * ratesRef.current[fromCurrency];
  setFromPrice(result.toFixed(2));
  setToPrice(value);
};

React.useEffect(() => {
  onChangeFromPrice(fromPrice);
}, [fromCurrency]);

React.useEffect(() => {
  onChangeToPrice(toPrice);
}, [toCurrency]);

React.useEffect(() => {
  if (Object.keys(ratesRef.current).length > 0) {
    onChangeFromPrice(fromPrice);
  }
}, [fromCurrency, ratesRef]);

React.useEffect(() => {
  if (Object.keys(ratesRef.current).length > 0) {
    onChangeToPrice(toPrice);
  }
}, [toCurrency, ratesRef]);
  
  return (
    <div className="App">
    
      <Block value={fromPrice} currency={fromCurrency} onChangeCurrency= {setFromCurrency} onChangeValue={onChangeFromPrice}/>
      <Block value={toPrice} currency={toCurrency} onChangeCurrency= {setToCurrency} onChangeValue={onChangeToPrice} />
      <Header rate={rate} />
    </div>
  );
}

export default App;