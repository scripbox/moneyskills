
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

$(document).ready(function(){
  $('.subscribe-mailtrain-button').click(function(e){
    subscribeEmailtoMailTrain();
  });
});

function subscribeEmailtoMailTrain(){
  var subscriber_data={};
  subscriber_data.email=$('.subscribe-mailtrain-email-input').val();
  subscriber_data.name=$('.subscribe-mailtrain-name-input').val();
  subscriber_data.source=$('.subscribe-mailtrain-button').data("source");
  subscriber_data.mobile=$('.subscribe-mailtrain-mobile-input').val();
  subscriber_data.organisation=$('.subscribe-mailtrain-company-input').val();
  subscriber_data.designation=$('.subscribe-mailtrain-designation-input').val();

  if ((!subscriber_data.email== '') && (!subscriber_data.name== '') && (!subscriber_data.mobile== '')
    && (!subscriber_data.organisation== '') && (!subscriber_data.designation== '')) {
    if(isValidEmail(subscriber_data.email)) {
      $('.loading').show();
      $('.subscribe-mailtrain-input-info').hide();
      $.post("http://localhost:3000/moneyskills_subscribe", subscriber_data)
        .done(function(response) {
          $('.loading').hide();
          $('.mailtrain-just-subscribed').hide();
          if(response.success) {
            $('.mailtrain-just-subscribed').show();
            $('.subscribe-mailtrain-input-info').hide();
            $('.mailtrain-box').hide();
          }
          else {
            if (response.message) {
              $('.subscribe-mailtrain-input-info').html(response.message);
            }
            else {
              $('.subscribe-mailtrain-input-info .mini-sip-validation-error').html('Something went wrong');
            }
            $('.mailtrain-just-subscribed').hide();
            $('.loading').hide();
          }
        })
        .error(function(error) {
          $('.mailtrain-just-subscribed').hide();
          $('.loading').hide();
          if (response.message) {
            $('.subscribe-mailtrain-input-info').html(response.message);
          }
          else {
            $('.subscribe-mailtrain-input-info').html('Something went wrong');
          }
          $('.mailtrain-just-subscribed').hide();
        });
    }
    else {
      $('.subscribe-mailtrain-input-info').html('Enter Valid Email Id');
      $('.mailtrain-just-subscribed').hide();
    }
  }
  else {
    $('.subscribe-mailtrain-input-info').html('Please enter all details');
  }
}

function isValidEmail(email){
  var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  if(filter.test(email)) {
    return true;
  }
  return false;
}
