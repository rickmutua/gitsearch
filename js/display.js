var apiKey = require('./../.env').apiKey;

function Search(){

}

Search.prototype.getRepos = function(userName){
  $.get('https://api.github.com/users/' + userName + '?access_token=' + apiKey).then(function(response){
    console.log(response);
    $('#error').hide();
    $('#repos').empty();
    $('#userProfile').show();
    $('#repoPanel').show();
    $('#userName').text(response.login);
    $('#profilePicture').attr("src", response.profilePicture_url);
    $('#githubLink').attr("href", response.html_url);
    $('#repoLink').attr("href", "https://github.com/" + userName + "?tab=repositories");
    $('#follow').text("Followers: " + response.followers + " -- Following: " + response.following);
    $('#name').text(response.name);
    $('#email').text(response.email);
    $('#location').text(response.location);
    $('#company').text(response.company);
  });

  $.get('https://api.github.com/users/' + userName + '/repos?&per_page=1000&access_token=' + apiKey).then(function(response){
    for(var i = 0; i < response.length; i++) {
      var description = (response[i].description);
      if (description === null) {
        description = "No description";
      }
      $('#repos').append('<li><a href ="' + response[i].html_url + '">' + '<h3>' +  response[i].name + '</h3>' + '</a>' + '<h5>' + description + '</h5></li>');
    }
  }).fail(function(error){
    $('#error').show();
  });
};

exports.searchModule = Search;
