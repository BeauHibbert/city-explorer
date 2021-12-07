import React, { Component } from 'react'

export default class App extends Component {

constructor(props) {
  super(props);
  this.state = {
    queryCity: ''
  }
}



  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="city name" name="city" />
          <button type="submit">Explore!</button>
        </form>
      </div>
    )
  }
}
