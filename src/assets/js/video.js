var DecodeVideo = function(element) {
  element = this.element = $(element);

  this.dataUrl = element.data('url');
  this.videoId = element.data('videoId');
  this.transitions = element.data('transitions');



  this.container = $('<div class="playback-container"></div>');
  this.controls = $('<div class="video-controls"><div class="playback-button"></div><div class="seek-bar"><div class="seek-loaded"></div><div class="seek-needle"></div></div></div>');

  if (this.videoId) {
    this.container.append('<iframe class="yt-video" src="http://www.youtube.com/embed/' + this.videoId + '?enablejsapi=1&controls=0&showinfo=0&wmode=transparent&fs=0&rel=0&iv_load_policy=3" frameborder="0"></iframe>');
  }

  this.element.append(this.container);
  this.element.append(this.controls);
}

DecodeVideo.prototype.play = function() {
};

DecodeVideo.prototype.pause = function() {
};
