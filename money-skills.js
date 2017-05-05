
var player, iframe;
var $ = document.querySelector.bind(document);

// init player
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '0',
    width: '0',
    videoId: '3zjCJWZfrBA',
    events: {
      'onReady': onPlayerReady
    }
  });
}

// when ready, wait for clicks
function onPlayerReady(event) {
  var player = event.target;
  iframe = $('#player');
  setupListener();
}

function setupListener (){
  $('#playButton').addEventListener('click', playFullscreen);
}

function playFullscreen (){
  player.playVideo();//won't work on mobile

  var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
  if (requestFullScreen) {
    requestFullScreen.bind(iframe)();
  }
}

document.addEventListener("fullscreenchange", function() {
  if (!document.fullscreenElement) player.stopVideo();
}, false);

document.addEventListener("msfullscreenchange", function() {
  if (!document.msFullscreenElement) player.stopVideo();
}, false);

document.addEventListener("mozfullscreenchange", function() {
  if (!document.mozFullScreen) player.stopVideo();
}, false);

document.addEventListener("webkitfullscreenchange", function() {
  if (!document.webkitIsFullScreen) player.stopVideo();
}, false);