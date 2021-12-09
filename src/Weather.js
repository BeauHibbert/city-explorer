import React, { Component } from 'react'

export default class Weather extends Component {
  render() {
    return (
      <ul>
        {this.props.weather.map(day => <li key={day.date}>{day.date}: {day.description}</li>)}
      </ul>
    )
  }
}
