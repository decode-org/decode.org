var DecodeVideo = function(element) {
  element = this.element = $(element);

  this.dataUrl = element.data('url');
  this.videoId = element.data('videoId');
  this.transitions = element.data('transitions');
  this.isPlaying = false;

  this.container = $('<div class="playback-container"></div>');
  this.controls = $('<div class="video-controls"><div class="playback-button"></div><div class="seek-bar"><div class="seek-loaded"></div><div class="seek-needle"></div></div></div>');

  this.element.append(this.container);
  this.element.append(this.controls);

  this.elements = {
    playback: this.controls.find('.playback-button'),
    seek: this.controls.find('.seek-bar'),
    loaded: this.controls.find('.seek-loaded'),
    needle: this.controls.find('.seek-needle')
  };

  this.elements.playback.click(function() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }.bind(this));

  // Async fun!
  if (this.videoId) {
    this.hasYT = true;
    this.YTVideo = $('<div class="yt-video"></div>');
    console.log(this.YTVideo);
    this.container.append(this.YTVideo);

    DecodeVideo.loadYTAPI(function() {
      this.YTPlayer = new YT.Player(this.YTVideo[0], {
        videoId: this.videoId,
        width: '',
        height: '',
        playerVars: {
          enablejsapi: '1',
          controls: '0',
          showinfo: '0',
          wmode: 'transparent',
          fs: '0',
          rel: '0',
          iv_load_policy: '3'
        },
        events: {
          onStateChange: this.onYTStateChange.bind(this)
        }
      });
    }.bind(this));
  } else {
    this.hasYT = false;
  }
}

DecodeVideo.prototype.play = function() {
  if (this.hasYT) {
    this.YTPlayer.playVideo();
  } else if (!this.isPlaying) {
    this.setPlayState('playing');
  }
};

DecodeVideo.prototype.pause = function() {
  if (this.hasYT) {
    this.YTPlayer.pauseVideo();
  } else if (this.isPlaying) {
    this.setPlayState('paused');
  }
};

// Private
DecodeVideo.prototype.setPlayState = function(state) {
  switch (state) {
    case 'playing':
      if (!this.isPlaying) {
        this.element.addClass('playing');
        this.isPlaying = true;
      }
      break;
    case 'paused':
      if (this.isPlaying) {
        this.element.removeClass('playing');
        this.isPlaying = false;
      }
      break;
  }
};

DecodeVideo.prototype.onYTStateChange = function(event) {
  switch (event.data) {
    case 1:
      this.setPlayState('playing');
      break;
    case 2:
      this.setPlayState('paused');
      break;
  }
};

// 0 = Not loading
// 1 = Loading
// 2 = Ready
DecodeVideo.YTAPILoadState = 0;

DecodeVideo.YTCallbacks = [];

DecodeVideo.loadYTAPI = function(callback) {
  switch (DecodeVideo.YTAPILoadState) {
    case 0:
      var tag = document.createElement('script');

      window.onYouTubeIframeAPIReady = function() {
        DecodeVideo.YTCallbacks.forEach(function(fn) {
          fn();
        });
      };

      DecodeVideo.YTAPILoadState = 1;

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    case 1:
      if (callback) {
        DecodeVideo.YTCallbacks.push(callback);
      }
      break;
    case 2:
      callback();
      break;
  }
};

