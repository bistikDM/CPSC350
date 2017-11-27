// import React from 'react';
// import Api from './utils/api.js';
// import Results from './Results.js';
var React = require('react');
var Api = require('./utils/api.js');
var Results = require('./Results.js');

export default class Home extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state={results: []};
    this.getRequest=this.getRequest.bind(this);
  }
  
  getRequest()
  {
    Api.getUserData(document.getElementById('username').value).then(function (response)
    {
      this.setState({results: response});
    }.bind(this));
  }
  
  render()
  {
    console.log(this.state.results);
    return (
      <div>
        <input type='search' id='username' placeholder='Username' />
        <button onClick={this.getRequest}>Submit</button>
        
        {this.state.results && <Results userData={this.state.results} />}
      </div>
      );
  }
}

// module.exports = Home;