import React, { Component } from 'react'
import axios from 'axios';
import Weather from './Weather';
import './App.css';
import Map from './Map'
import Movies from './Movies.js';

export default class App extends Component {

constructor(props) {
  super(props);
  this.state = {
    queryCity: '',
    locationObject: {},
    error: false,
    weather: [],
    movies: []
  }
}

getLocation = async() => {
  try {
    let result = await axios.get(`https://us1.locationiq.com/v1/search.php?key=pk.7ce20acb246bf3b79f66fcb7d5ae9d3e&q=${this.state.queryCity}&format=json`);
    this.setState({ locationObject: result.data[0], error: false}, this.getWeather);
  } catch (error) {
    console.error(error);
    this.setState({ error: true })
  }
}

getWeather = async() => {
  let url = `${process.env.REACT_APP_SERVER_URL}/weather?lat=${this.state.locationObject.lat}&lon=${this.state.locationObject.lon}`;
  try {
    let results = await axios.get(url);
    this.setState({ weather: results.data }, this.getMovies)
    this.setState({ error: false })
  } catch(e) {
    this.setState({ error: true })
    this.setState({ weather: [] })
  } 
}

getMovies = async () => {
  const city_name = this.state.locationObject.display_name.split(',')[0];
  const url = `${process.env.REACT_APP_SERVER_URL}/movies?city_name=${city_name}`
  let movieResponse = await axios.get(url);
  this.setState({ movies : movieResponse.data });
}

handleSubmit = (e) => {
  e.preventDefault();
  this.setState({ queryCity: e.target.city.value }, this.getLocation);
}

  render() {
    return(
      <div id="content-wrapper">
        <form id='form' onSubmit={this.handleSubmit}>
          <input type="text" placeholder="city name" name="city" />
          <button id='button' type="submit">Explore!</button>
        </form>
        <div>
          {this.state.error ? <p>There is no data on that city. Please enter another query.</p> : <></>}
        <div id="city-data">
          {this.state.locationObject.display_name ?
          <>
            <p>{this.state.locationObject.display_name}</p>
            <Map locationObject={this.state.locationObject}/>
          </>
           :
           <p>Search for a city to explore</p>
          }
          {this.state.weather.length > 0 && <Weather weather={this.state.weather}/>}
          {this.state.movies.length > 0 && <Movies movies={this.state.movies} />}
        </div>
        <div id="image-wrapper">
        </div>     
        </div>
      </div>
    )
  }
}







// handleError = (err) => {
//   console.log(err)
//   this.setState({showModal: true}, () => {
//     console.log('show modal state', this.state.showModal)
//     return (
//       <Modal show={this.state.showModal} onHide={this.handleClose}>
//           <Modal.Header closeButton>
//             <Modal.Title>Error!</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>{err.message}</Modal.Body>
//         </Modal>
//     )
//   })
// }
