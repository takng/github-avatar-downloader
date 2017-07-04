var request = require('request');
var fs = require('fs');

var GITHUB_USER = "takng";
var GITHUB_TOKEN = "4c027e80b056b8dbdd22055d8c1a662b70a25cfe";
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

console.log(requestURL);

  request(url_obj, function(err, response, body) {
    if (err) {
      console.log(`Error fetching: ${requestURL}`, err);
      return;
    }

//  console.log(response.statusCode);

    if (response.statusCode === 200) {
      json = JSON.parse(body);
      cb(0, json);
    }
  });

}

function downloadImageByURL(url, filePath) {
  // ...

  url = url.replace(/\"/g, '');
  filePath = filePath.replace(/\"/g, '');
  filePath = filePath + ".jpeg";

  request.get(url)
       .on('error', function (err) {                                   
         throw err; 
       })
       .on('response', function (response) {                          
         console.log('Response Status Code: ', response.statusCode);
         console.log('Response Status Message: ', response.statusMessage);
         console.log('Response Status Message: ', response.headers['content-type']);
       })
       .pipe(fs.createWriteStream(filePath));
}

getRepoContributors("jquery", "jquery", function(err, result) {
  // console.log("Errors:", err);

  for (key in result) {  
  if (result.hasOwnProperty(key)) {  
    var obj = result[key];
    // console.log(key);
    console.log(obj.avatar_url);
    downloadImageByURL(JSON.stringify(obj.avatar_url), 'avatars/' + JSON.stringify(obj.login));
    // console.log('-----');
  }
}

});


