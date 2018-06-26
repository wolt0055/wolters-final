import React, { Component } from 'react';
import './App.css';
// import Results from './Results.js';

class FindWeather extends Component {
  constructor(props){
    super(props);
    this.state = {
      inputText: '',
      weather: {},
      recentSearches: [],
      temp: '',
      description: ""
    };
  }

  fetchWeather = (input) => {
    let enterKey = prompt("enter an API key:");

    let myKey = `&APPID=${enterKey}`;
    let apiCallAddressBeginning = '';
    if(!isNaN(input)){
      // ZIP code request base address
      apiCallAddressBeginning = 'http://api.openweathermap.org/data/2.5/weather?zip=';
    }
    else {
      // City name request base address
      apiCallAddressBeginning = 'http://api.openweathermap.org/data/2.5/weather?q='}
    // When button is clicked, take the input and call the API to return weather
    // Also clear the state of inputText so the input field is reset
    fetch(`${apiCallAddressBeginning}${input}${myKey}&units=imperial`)
    .then(response => response.json())
    .then(json => {
      let weather = json;
      this.setState({weather: weather});
      let roundedTemp=Math.round(weather.main.temp);
      this.setState({temp: roundedTemp});
      this.setState({description: weather.weather[0].description})
      // api data says default is in json format, try without the .json command and see if access to nested objects can be reached
    })
    .catch((error) => {
      alert("Something went wrong, try again");
    });
    this.setState({inputText: ""})
  }

// update state when the input is changed, nobinding needed bc of arrow function
  onInputChange = (e) => {
    e.preventDefault();
    const inputText = e.target.value;
    this.setState((prevState, props) => {
      return {
        inputText: inputText
      };
    });
  }

  render() {

    return (
      <div>
        <br/>
        <input
          onChange={this.onInputChange}
          placeholder="Enter city or ZIP code"
          value={this.state.inputText} />
        <button onClick={() => this.fetchWeather(this.state.inputText)}>Search</button>
        <br/><br/>
        <h2 className='results'>Results</h2>
        <h2>City: {this.state.weather.name}</h2>
        <h3>Description: {this.state.description}</h3>
        <h3>Temperature(&deg;F): {this.state.temp}</h3>
      </div>
    );
  }
}

export default FindWeather;
