import React, { Component } from 'react'
import axios from 'axios';
export default class App extends Component {

constructor(props) {
  super(props);
  this.state = {
    queryCity: '',
    locationObject: {},
    imageURL: '',
    error: false
  }
}


getLocation = async() => {
  try {
    let result = await axios.get(`https://us1.locationiq.com/v1/search.php?key=pk.7ce20acb246bf3b79f66fcb7d5ae9d3e&q=${this.state.queryCity}&format=json`);
      // console.log(result);
      this.setState({ locationObject: result.data[0]}, this.getMap);
  } catch (error) {
    console.error(error);
    console.log('there was an error');
    this.setState({ error: true })
  }
}
getMap = async() => {
  try {
    let requestURL = `https://maps.locationiq.com/v3/staticmap?key=pk.7ce20acb246bf3b79f66fcb7d5ae9d3e&center=${this.state.locationObject.lat},${this.state.locationObject.lon}&zoom=11`;
    let result = await axios.get(requestURL);
    console.log('result of get request: ', result);
    this.setState({imageURL: requestURL});
    console.log('mapObject after setting requestURL', this.state.imageURL);
  } catch (error) {
    console.error(error);
    console.log('there was an error');
    this.setState({ error: true })
  }
}

handleSubmit = (e) => {
  e.preventDefault();
  this.setState({ queryCity: e.target.city.value }, this.getLocation);
}

  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="city name" name="city" />
          <button type="submit">Explore!</button>
        </form>
        <div>
        {this.state.locationObject.display_name? <p>{this.state.locationObject.display_name}</p> : <p>Search for a city to explore</p>}
        {this.state.locationObject.lat? <p>Latitude: {this.state.locationObject.lat}</p> : ""}
        {this.state.locationObject.lon? <p>Longitude: {this.state.locationObject.lon}</p> : ""}
        {this.state.imageURL? <img src={this.state.imageURL}/> : ""}
        {this.state.error && <p>There was an error with your request</p>}
        </div>
      </div>
    )
  }
}
