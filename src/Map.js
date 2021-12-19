import React, { Component } from 'react'

export default class Map extends Component {
  render() {
    return (
      <div>
        <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.props.locationObject.lat},${this.props.locationObject.lon}&zoom=12`} alt={this.props.locationObject.display_name}/>
      </div>
    )
  }
}