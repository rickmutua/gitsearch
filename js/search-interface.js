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
