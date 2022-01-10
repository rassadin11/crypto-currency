import React from 'react';
import './App.css';
import InstanceCurrency from './components/InstanceCurrency/InstanceCurrency';
import ResultCurrency from './components/ResultPrice/ResultCurrency';
import { useAppDispatch } from './store/hooks/redux';
import { setPrevValue } from './store/reducers/CurrenciesReducer';
import { topCurrencies } from './store/thunks/thunks';

function App() {
  let dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(topCurrencies())
  }, [dispatch])

  setInterval(() => {
    dispatch(setPrevValue())
    dispatch(topCurrencies())
  }, 60000)

  return (
    <div className="App">
      <h1 className="title">Crypto converter</h1>
      <div className="wrapper">
        <div className="instance"><InstanceCurrency /></div>
        <div className="result"><ResultCurrency /></div>
      </div>
    </div>
  );
}

export default App;
