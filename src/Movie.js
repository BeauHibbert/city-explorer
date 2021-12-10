import React, { Component } from 'react'

export default class Movie extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.movie.title}</h3>
        <img src={this.props.movie.image_url} alt={this.props.movie.overview} />
        <p>{this.props.movie.overview}</p>
      </div>
    )
  }
}
