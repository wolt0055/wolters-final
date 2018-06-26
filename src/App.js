import React, { Component } from 'react';
import './App.css';
import Header from './Header.js';
import FindWeather from './FindWeather.js';

class App extends Component {

  render() {

    return (
      <div className="App">
        <Header />
        <FindWeather />
      </div>
    );
  }
}

export default App;
