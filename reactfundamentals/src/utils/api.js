var Axios = require('axios');

function getUserData(username)
{
  var stars = 0;
  var userData = {};
  var profile = {};
  var repos = {};
  
  /*
  Axios.get('https://api.github.com/users/' + username).then(function (response)
  {
    profile = response.data;
    
    userData.avatar = profile.avatar_url;
    userData.username = profile.login;
    userData.bio = profile.bio;
    userData.location = profile.location;
    userData.company = profile.company;
    userData.blog = profile.blog;
    userData.followers = profile.followers;
    userData.following = profile.following;
    userData.repos = profile.public_repos;
  });
  
  Axios.get('https://api.github.com/users/' + username + '/repos').then(function (response)
  {
    repos = response.data;
    for(let x = 0; x < repos.length; x++)
    {
      stars += repos[x].stargazers_count;
    }
    userData.stars = stars;
  });
  */
  
  return Axios.all([
    Axios.get('https://api.github.com/users/' + username),
    Axios.get('https://api.github.com/users/' + username + '/repos')]).then(Axios.spread(function (userResponse, reposResponse)
    {
      profile = userResponse.data;
      userData.avatar = profile.avatar_url;
      userData.username = profile.login;
      userData.bio = profile.bio;
      userData.location = profile.location;
      userData.company = profile.company;
      userData.blog = profile.blog;
      userData.followers = profile.followers;
      userData.following = profile.following;
      userData.repos = profile.public_repos;
      
      repos = reposResponse.data;
      for(let x = 0; x < repos.length; x++)
      {
        stars += repos[x].stargazers_count;
      }
      userData.stars = stars;
      return userData;
    }));
  
  // return userData;
}

module.exports = {getUserData: function (username)
  {
    return getUserData(username).then(function(info)
    {
      return info;
    });
  }
};