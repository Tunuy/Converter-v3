import React from 'react';

const Header = ({ rate }) => (
  <div className="header">
    <h1>Exchange Rates</h1>
    <p>1 USD = {rate.USD} UAH</p>
    <p>1 EUR = {rate.EUR} UAH</p>
  </div>
);

export default Header;