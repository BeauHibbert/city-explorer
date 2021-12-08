import React, { Component } from 'react'
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import './App.css';
export default class App extends Component {

constructor(props) {
  super(props);
  this.state = {
    queryCity: '',
    locationObject: {},
    imageURL: '',
    error: false,
    showModal: false,
  }
}


getLocation = async() => {
  try {
    let result = await axios.get(`https://us1.locationiq.com/v1/search.php?key=pk.7ce20acb246bf3b79f66fcb7d5ae9d3e&q=${this.state.queryCity}&format=json`);
      // console.log(result);
      this.setState({ locationObject: result.data[0]}, this.getMap);
  } catch (error) {
    console.log(error)
    this.setState({error: true});
    this.handleError(error)
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
    this.setState({error: true});
    this.handleError(error);
  }
}

handleSubmit = (e) => {
  e.preventDefault();
  this.setState({ queryCity: e.target.city.value }, this.getLocation);
}

handleClose = () => {
  if (this.state.showModal) {
    this.setState({showModal: false})
  }
}

handleError = (err) => {
  console.log(err)
  this.setState({showModal: true}, () => {
    console.log('show modal state', this.state.showModal)
    return (
      <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Error!</Modal.Title>
          </Modal.Header>
          <Modal.Body>{err.message}</Modal.Body>
        </Modal>
    )
  })
}

  render() {
    return(
      <div id="content-wrapper">
        <form id='form' onSubmit={this.handleSubmit}>
          <input type="text" placeholder="city name" name="city" />
          <button id='button' type="submit">Explore!</button>
        </form>
        <div>
        <div id="city-data">
          {this.state.locationObject.display_name? <p>{this.state.locationObject.display_name}</p> : <p>Search for a city to explore</p>}
          {this.state.locationObject.lat? <p>Latitude: {this.state.locationObject.lat}</p> : ""}
          {this.state.locationObject.lon? <p>Longitude: {this.state.locationObject.lon}</p> : ""}
        </div>
        <div id="image-wrapper">
        {this.state.imageURL? <img src={this.state.imageURL}/> : ""}
        </div>
        
        {/* {this.state.error && this.handleError} */}
        </div>
      </div>
    )
  }
}
