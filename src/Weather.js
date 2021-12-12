import React, { Component } from 'react';
import  WeatherDay from './WeatherDay';

export default class Weather extends Component {
  render() {
    return (
      <ul>
        {this.props.weather.map(day => <WeatherDay key={day.date}data={day}></WeatherDay>)}
      </ul>
    )
  }
}
