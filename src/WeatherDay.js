import React, { Component} from 'react';

export default class WeatherDay extends Component {
  render() {
    return (
      <div>
        {this.props.data.date}
        {this.props.data.description}
      </div>
    )
  }
}