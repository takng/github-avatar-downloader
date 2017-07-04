var request = require('request');

var GITHUB_USER = "takng";
var GITHUB_TOKEN = "4c027e80b056b8dbdd22055d8c1a662b70a25cfe";
var API_KEY = "takng:4c027e80b056b8dbdd22055d8c1a662b70a25cfe";
var query = "jer";
var json;

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  // ...

var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

var url_obj = {
    url: requestURL,
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    },
  };

// var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';


//  var requestURL = `https://api.github.com/repos/jquery/jquery/contributors/search?key=${API_KEY}&q=${query}`;

console.log(requestURL);

//https://api.github.com/repos/jquery/jquery/contributors

  //request(requestURL, function(err, response, body) {
  request(url_obj, function(err, response, body) {
    if (err) {
      console.log(`Error fetching: ${requestURL}`, err);
      return;
    }

console.log(response.statusCode);
// json = JSON.parse(body);
// console.log(json.login);

    if (response.statusCode === 200) {
console.log(body);
      json = JSON.parse(body);
//console.log(json.avatar_url);
      cb(0, json);
    }
  });

}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  // console.log("Result:", result);

var i = 0;
for (key in result) {  
if (result.hasOwnProperty(key)) {  
    var obj = result[key];
    console.log(key);
    //console.log(obj);
    console.log(obj.avatar_url);
  console.log('-----');
}
}


    
});


