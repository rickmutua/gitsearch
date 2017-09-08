var apiKey = require('./../.env').apiKey;

function Search(){

}

Search.prototype.getRepos = function(userName){
  $.get('https://api.github.com/users/' + userName + '?access_token=' + apiKey).then(function(response){
    console.log(response);
    $('#failure').hide();
    $('#allRepositories').empty();
    $('#userPanel').show();
    $('#repositoryPanel').show();
    $('#userName').text(response.login);
    $('#avatar').attr("src", response.avatar_url);
    $('#githubLink').attr("href", response.html_url);
    $('#reposLink').attr("href", "https://github.com/" + userName + "?tab=repositories");
    $('#follow').text("Followers: " + response.followers + " -- Following: " + response.following);
    $('#name').text(response.name);
    $('#bio').text(response.bio);
    $('#location').text(response.location);
    $('#company').text(response.company);
  });

  $.get('https://api.github.com/users/' + userName + '/repos?&per_page=1000&access_token=' + apiKey).then(function(response){
    for(var i = 0; i < response.length; i++) {
      var description = (response[i].description);
      if (description === null) {
        description = "No description";
      }
      $('#allRepositories').append('<li><a href ="' + response[i].html_url + '">' + '<h3>' +  response[i].name + '</h3>' + '</a>' + '<h5>' + description + '</h5></li>');
    }
  }).fail(function(error){
    $('#failure').show();
  });
};

exports.searchModule = Search;
