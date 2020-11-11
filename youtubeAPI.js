
const Youtube = require('youtube-api');
 
Youtube.authenticate({
    type: "oauth"
  , token: "Token here"
});

//const youtube = new YouTube("Token here");
 
Youtube.getVideo('https://www.youtube.com/watch?v=3odIdmuFfEY')
    .then(video => {
        console.log(`The video's width is ${video.fileDetails.videoStreams().widthPixels}`);
    })
    .catch(console.log);
