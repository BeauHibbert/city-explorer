import React, { Component} from 'react';
import Movie from './Movie';

export default class Movies extends Component {
  render() {
    return (
      <div className='moviediv'>
       {this.props.movies.map(movie => <Movie movie={movie}/>)}
      </div>
    )
  }
}