// import React from 'react';
var React = require('react');

class Results extends React.Component
{
  render()
  {
    var data = this.props.userData;
    
    return (
      <ul>
        <li>
          <div>
            <img src={data.avatar} alt={data.username} />
          </div>
        </li>
        <li>@{data.username}</li>
        <li>Stars: {data.stars}</li>
        <li>Bio: {data.bio}</li>
        <li>Location: {data.location}</li>
        <li>Company: {data.company}</li>
        <li>Blog: {data.blog}</li>
        <li>Followers: {data.followers}</li>
        <li>Following: {data.following}</li>
        <li>Public repos: {data.repos}</li>
      </ul>
      );
  }
}

module.exports = Results;