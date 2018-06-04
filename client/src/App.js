import React, { Component } from 'react';
import axios from 'axios';

var querystring = require('querystring');

class App extends Component {
  render() {
    return (
      <div className="App">
        <NewMovie/>
      </div>
    );
  }
}

class NewMovie extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      allMovies: []
    }

    this.handleTextChange = this.handleTextChange.bind(this);
    this.insertNewMovie = this.insertNewMovie.bind(this);
    this.getData = this.getData.bind(this);
    this.onClick = this.onClick.bind(this);
  }

handleTextChange(event) {
  this.setState({
    name: event.target.value
  });
}

componentDidMount() {
  this.getData(this);
}

getData(event) {
  axios.get("api/movies")
  .then(function(response) {
    event.setState({allMovies: response.data});
      console.log(response.data)
  });
}

insertNewMovie() {
  axios.post("/api/movies",
    querystring.stringify({
      name: this.state.name
    }), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(function(response) {
      console.log(response.data);
    });
}

onClick(e) {
      this.insertNewMovie(this);
      this.getData(this);
    }

  render() {
    return (
      <div>
        <h2>Add new movie</h2>
        <input type="text" title="name" placeholder="Title" value={this.state.name} onChange={this.handleTextChange} />
        <button onClick={this.onClick}>Add</button>
        {
          this.state.allMovies.map(function(exp){
            return (
              <div key={exp._id}>
                <h3>{exp.name}</h3>
              </div>
            );
          })
        }
      </div>
    ) 
  }
}



export default App;
