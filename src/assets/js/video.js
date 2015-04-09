var DecodeVideo = function(element) {
  element = this.element = $(element);

  this.dataUrl = element.data('url');
  this.videoId = element.data('videoId');
  this.transitions = element.data('transitions');
  this.isPlaying = false;
  this.duration = 0;
  this.container = $('<div class="playback-container"></div>');
  this.controls = $('<div class="video-controls"><div class="playback-button"></div><div class="seek-container" touch-action="none"><div class="seek-bar"><div class="seek-loaded"></div><div class="seek-needle"></div></div></div></div>');

  this.element.append(this.container);
  this.element.append(this.controls);

  this.elements = {
    playback: this.controls.find('.playback-button'),
    seek: this.controls.find('.seek-container'),
    loaded: this.controls.find('.seek-loaded'),
    needle: this.controls.find('.seek-needle')
  };


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
          onStateChange: this.onYTStateChange.bind(this),
          onReady: function(event) {
            this.duration = this.YTPlayer.getDuration();
            this.ready();
          }.bind(this)
        }
      });
    }.bind(this));
  } else {
    this.hasYT = false;
    this.ready();
  }
}

// Private
DecodeVideo.prototype.ready = function() {
  this.elements.playback.click(function() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }.bind(this));

  console.log(this.elements.seek);

  var pointerMove = function(e) {
    var parentOffset = this.elements.seek.offset();
    var relX = e.pageX - parentOffset.left,
        ratio = Math.max(0, Math.min(1, relX / this.elements.seek.width()));

    this.setTime(ratio * this.duration, true);
  }.bind(this);

  var pointerUp = function(e) {
    var parentOffset = this.elements.seek.offset();
    var relX = e.pageX - parentOffset.left,
        ratio = Math.max(0, Math.min(1, relX / this.elements.seek.width()));

    this.setTime(ratio * this.duration);

    this.elements.seek.off('pointerup', pointerUp);
    this.elements.seek.off('pointermove', pointerMove);
  }.bind(this);

  this.elements.seek.on('pointerdown', function(e) {
    console.log('?');
    this.pause();

    var parentOffset = this.elements.seek.offset();
    var relX = e.pageX - parentOffset.left,
        ratio = Math.max(0, Math.min(1, relX / this.elements.seek.width()));

    this.setTime(ratio * this.duration, true);

    this.elements.seek.on('pointerup', pointerUp).on('pointermove', pointerMove);
  }.bind(this));
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

DecodeVideo.prototype.setTime = function(time, notunderlying, lookahead) {
  if (this.hasYT) {
    if (!notunderlying) {
      this.YTPlayer.seekTo(time, lookahead || true);
    }
    this._setTime(time);
  } else {
  }
};

DecodeVideo.prototype._setTime = function(time) {
  this.elements.needle.css({left: time / this.duration * 100 + '%'});
};

DecodeVideo.prototype.update = function() {
  if (this.hasYT) {
    console.log('update!');
    this._setTime(this.YTPlayer.getCurrentTime());
    this.elements.loaded.css("width", this.YTPlayer.getVideoLoadedFraction() * 100 + '%');
  } else {
    // ????
  }
};

// Private
DecodeVideo.prototype.setPlayState = function(state) {
  switch (state) {
    case 'playing':
      if (!this.isPlaying) {
        this.element.addClass('playing');
        this.isPlaying = true;
        this.update.timer = setInterval(this.update.bind(this), 100);
      }
      break;
    case 'paused':
      if (this.isPlaying) {
        this.element.removeClass('playing');
        this.isPlaying = false;
        clearInterval(this.update.timer);
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


/*    var pointerdown = function(e) {
        scrubbing = true;

        if (!audio.paused) {
          audio.pause();
        }

        var parentOffset = elements.scrubContainer.offset();
        //or $(this).offset(); if you really just want the current element's offset
        var relX = e.pageX - parentOffset.left,
            ratio = Math.max(0, Math.min(1, relX / elements.scrubContainer.width()));

        setTime(audio.duration * ratio);


        container.addClass('scrubbing');

        $(document).on('pointermove', pointermove).on('pointerup', pointerup);

        e.preventDefault();
      };

      var pointerup = function(e) {
        if (scrubbing) {
          scrubbing = false;
          var parentOffset = elements.scrubContainer.offset();
          //or $(this).offset(); if you really just want the current element's offset
          var relX = e.pageX - parentOffset.left,
              ratio = Math.max(0, Math.min(1, relX / elements.scrubContainer.width()));

          if (audio.duration) {
            audio.currentTime = audio.duration * ratio;
            elements.needle.css({left: ratio * 100 + '%'});
          }

          $(document).off('pointermove', pointermove).off('pointerup', pointerup);
          container.removeClass('scrubbing');

          setTime(audio.duration * ratio);
        }
      };

      var pointermove = function(e) {
        if (scrubbing) {
          var parentOffset = elements.scrubContainer.offset();
          //or $(this).offset(); if you really just want the current element's offset
          var relX = e.pageX - parentOffset.left,
              ratio = Math.max(0, Math.min(1, relX / elements.scrubContainer.width()));

          setTime(audio.duration * ratio);
        }
      };*/

