var Search = require('./../js/display.js').searchModule;

$('Button') .click(function () {
  $('#hiddenBody') .show();
});

  $('Button') .click(function () {
    $('#landingPage') .hide();
  });




  $(document).ready(function() {
    $('#searchBar').submit(function(event){
      event.preventDefault();
      var userName = $('#search').val();
      console.log(userName);
      userSearch = new Search(userName);
      userSearch.getRepos(userName);
    });
  });
