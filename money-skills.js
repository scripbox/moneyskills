
var myVideo = document.getElementById('myVideo');
var playButton = document.getElementById('playButton');

playButton.addEventListener('click', function () {
  if (myVideo.paused) {
    if (myVideo.requestFullscreen) {
      myVideo.requestFullscreen();
    }
    else if (myVideo.msRequestFullscreen) {
      myVideo.msRequestFullscreen();
    }
    else if (myVideo.mozRequestFullScreen) {
      myVideo.mozRequestFullScreen();
    }
    else if (myVideo.webkitRequestFullScreen) {
      myVideo.webkitRequestFullScreen();
    }
    myVideo.play();
  }
  else {
    myVideo.pause();
  }
}, false);

$(function () {
  $('a[href*=#]').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 1000, 'linear');
  });
});

$('button').click(function () {
  if (this.id == 'form-submit-button') {
    $('#thanku').show();
    $('#myform').hide();
  }
})
