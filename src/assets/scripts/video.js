var $ = require('jquery');
var Decode = require('./decode');
var Sandbox = require('javascript-sandbox');
var CodeMirror = require('codemirror');

var Recode = require('recode');

/**
 * General purpose video for video lessons
 *
 * @constructor
 * @param {Object} element - The element to video-ify
 */
var DecodeVideo = function (element) {
  'use strict';
  element = this.element = $(element);

  // Video Sources
  this.videoId = element.data('videoId');
  this.recodeUrl = element.data('videoRecode');

  // Transitions
  this.transitions = element.data('videoTransitions');
  this.transitionElements = { };
  this.activePlayback = '';

  // Timing Information
  this.isPlaying = false;
  this.duration = 0;
  this.time = 0;

  // Loading Information
  this.loadingElements = 0;
  this.readyState = 0;

  // HTML Elements
  this.container = $('<div class="playback-container"></div>');
  this.controls = $('<div class="video-controls"><div class="playback-button"></div><div class="seek-container" touch-action="none"><div class="seek-bar"><div class="seek-loaded"></div><div class="seek-needle"></div></div></div></div>');

  this.element.addClass('not-ready');
  this.element.append(this.container);
  this.element.append(this.controls);

  this.elements = {
    playback: this.controls.find('.playback-button'),
    seek: this.controls.find('.seek-container'),
    loaded: this.controls.find('.seek-loaded'),
    needle: this.controls.find('.seek-needle')
  };

  if (this.recodeUrl) {
    this.hasRecode = true;
    this.loadElement();

    this.recodeContainer = $('<div class="video-playback video-recode-container"></div>');
    this.transitionElements.recode = this.recodeContainer;
    this.container.append(this.recodeContainer);
    var isSandbox = !!element.data('videoSandbox');

    DecodeVideo.loadCodeMirror(function () {
      var options = { };
      if (isSandbox) {
        this.element.addClass('has-sandbox');
        var sandboxOutputContainer = $('<div class="video-sandbox-output"><div class="iframe-container"></div></div>').insertBefore(this.container);
        var sandboxOutput = $('<iframe src="/sandbox-output"></iframe>').appendTo(sandboxOutputContainer.find('.iframe-container'));
        this.jsSandbox = new Sandbox(this.recodeContainer[0], sandboxOutput[0]);
        options.codemirror = this.jsSandbox.cm;
        console.log(options.codemirror);
      }

      $.ajax({
        url: this.recodeUrl,
        success: function (data) {
          this.recode = new Recode({ element: this.recodeContainer[0], adapter: 'codemirror', recorddata: data, adapterOptions: options });
          this.recode.render = function () {
            Recode.prototype.render.call(this);
          };
          if (!isSandbox) {
            this.recode.adapter.codemirror.setOption('readOnly', true);
          }
          this.loadedElement();
        }.bind(this)
      });
    }.bind(this));
  } else {
    this.hasRecode = false;
  }

  // Async fun!
  if (this.videoId) {
    this.hasYT = true;
    this.activePlayback = 'youtube';
    this.YTVideo = $('<div class="video-playback video-playback-active yt-video"><span></span></div>');
    this.transitionElements.youtube = this.YTVideo;
    this.loadElement();
    this.container.append(this.YTVideo);

    DecodeVideo.loadYTAPI(function () {
      this.YTPlayer = new YT.Player(this.YTVideo.find('span')[0], {
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
          onReady: function (event) {
            this.duration = this.YTPlayer.getDuration();
            this.loadedElement();
          }.bind(this)
        }
      });
    }.bind(this));
  } else {
    this.hasYT = false;
  }

  this.readyState = 1;
  this.checkLoaded();
};

/**
 * Indicate that the video is ready and playable
 *
 * @private
 */
DecodeVideo.prototype.ready = function () {
  this.element.removeClass('not-ready').addClass('ready');
  this.readyState = 2;

  this.elements.playback.click(function () {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }.bind(this));

  var pointerMove = function (e) {
    var parentOffset = this.elements.seek.offset();
    var relX = e.pageX - parentOffset.left;
    var ratio = Math.max(0, Math.min(1, relX / this.elements.seek.width()));

    this.setTime(ratio * this.duration, true);
  }.bind(this);

  var pointerUp = function (e) {
    var parentOffset = this.elements.seek.offset();
    var relX = e.pageX - parentOffset.left,
        ratio = Math.max(0, Math.min(1, relX / this.elements.seek.width()));

    this.setTime(ratio * this.duration);

    this.elements.seek.off('pointerup', pointerUp);
    this.elements.seek.off('pointermove', pointerMove);
  }.bind(this);

  this.elements.seek.on('pointerdown', function (e) {
    console.log('?');
    this.pause();

    var parentOffset = this.elements.seek.offset();
    var relX = e.pageX - parentOffset.left,
        ratio = Math.max(0, Math.min(1, relX / this.elements.seek.width()));

    this.setTime(ratio * this.duration, true);

    this.elements.seek.on('pointerup', pointerUp).on('pointermove', pointerMove);
  }.bind(this));
};

/**
 * Play the video. If the video is playing, nothing happens
 */
DecodeVideo.prototype.play = function() {
  if (this.hasYT) {
    this.YTPlayer.playVideo();
  } else if (!this.isPlaying) {
    this.setPlayState('playing');
  }
};

/**
 * Pause the video. If the video is paused, nothing happens
 */
DecodeVideo.prototype.pause = function() {
  if (this.hasYT) {
    this.YTPlayer.pauseVideo();
  } else if (this.isPlaying) {
    this.setPlayState('paused');
  }
};

/**
 * Sets the current time of the video in seconds
 *
 * @param {number} time - The time in seconds to skip to
 * @param {boolean} [notunderlying=false] - Whether to update the underlying mechanism or just update visually
 * @param {boolean} [lookahead=true] - (YOUTUBE ONLY) Whether the video should seek ahead
 */
DecodeVideo.prototype.setTime = function(time, notunderlying, lookahead) {
  if (this.hasYT) {
    if (!notunderlying) {
      this.YTPlayer.seekTo(time, lookahead || true);
    }
    this._setTime(time);
  } else {
  }
};

/**
 * Internal function for visually setting the time
 *
 * @private
 */
DecodeVideo.prototype._setTime = function(time) {
  this.time = time;
  this.elements.needle.css({left: time / this.duration * 100 + '%'});
  if (this.hasRecode) {
    this.recode.setTime(this.time * 1000);
  }

  // If we have transitions, figure out if we need to transition
  if (this.transitions) {
    var truePlayback = this.activePlayback;
    this.transitions.some(function (transition) {
      if (this.time >= transition.at) {
        truePlayback = transition.to;
      } else {
        return true;
      }
    }.bind(this));
    console.log(truePlayback);

    if (truePlayback !== this.activePlayback) {
      this.transitionElements[this.activePlayback].removeClass('video-playback-active');
      this.transitionElements[truePlayback].addClass('video-playback-active');
      this.activePlayback = truePlayback;
    }
  }
};

/**
 * Internal function for updating the player visually
 *
 * @private
 */
DecodeVideo.prototype.update = function() {
  if (this.hasYT) {
    this._setTime(this.YTPlayer.getCurrentTime());
    this.elements.loaded.css("width", this.YTPlayer.getVideoLoadedFraction() * 100 + '%');
  } else {
    // ????
  }
};

/**
 * Sets the play state to either 'paused' or 'playing'
 *
 * @private
 * @param {string} state - The state to set it to
 */
DecodeVideo.prototype.setPlayState = function(state) {
  switch (state) {
    case 'playing':
      if (!this.isPlaying) {
        this.element.addClass('playing');
        this.isPlaying = true;
        this.update.timer = setInterval(this.update.bind(this), 30);
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

/**
 * Indicate that something is loading
 *
 * @private
 */
DecodeVideo.prototype.loadElement = function () {
  this.loadingElements += 1;
};

/**
 * Indicate that something has finished loading
 *
 * @private
 */
DecodeVideo.prototype.loadedElement = function () {
  this.loadingElements -= 1;
  this.checkLoaded();
};

/**
 * Check if everything has loaded
 *
 * @private
 */
DecodeVideo.prototype.checkLoaded = function () {
  console.log(this.readyState, this.loadingElements);
  if ((this.readyState == 1) && (this.loadingElements == 0)) {
    this.ready();
  }
};

/**
 * Event passed for when the YouTube video changes state
 *
 * @private
 * @param {Object} event
 */
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

// Static methods and properties

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
        DecodeVideo.YTAPILoadState = 2;
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

DecodeVideo.codeMirrorLoadState = 0;
DecodeVideo.codeMirrorCallbacks = [];

DecodeVideo.loadCodeMirror = function (callback) {
  // Until we actually need to load Code Mirror
  callback();
};

exports = module.exports = DecodeVideo;

