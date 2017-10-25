import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './SearchBar.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Food Nutrition Facts</h1>
        </header>
        <p className="App-intro">
          Please enter the name of the food to search. <br />
          <SearchBar />
        </p>
      </div>
    );
  }
}

export default App;
