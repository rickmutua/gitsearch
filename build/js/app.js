(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports .apiKey = "17cb2ffeea2f1bb04f80f15de4e90c43558c5f2d"

},{}],2:[function(require,module,exports){
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

},{"./../.env":1}],3:[function(require,module,exports){
var Search = require('./../js/search.js').searchModule;

$(document).ready(function() {
  $('#searchBar').submit(function(event){
    event.preventDefault();
    var userName = $('#search').val();
    console.log(userName);
    userSearch = new Search(userName);
    userSearch.getRepos(userName);
  });
});

},{"./../js/search.js":2}]},{},[3]);
