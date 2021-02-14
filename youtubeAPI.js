
const Youtube = require('youtube-api');
 //this does not work. DO NOT Bother
Youtube.authenticate({
    type: "oauth"
  , token: "token"
});

//const youtube = new YouTube("Token here");
 
Youtube.getVideo('https://www.youtube.com/watch?v=3odIdmuFfEY')
    .then(video => {
        console.log(video.contentDetails.duration);
    })
    .catch(console.log);
