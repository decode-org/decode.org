var DecodeVideo = function(element) {
  element = this.element = $(element);

  this.dataUrl = element.data('url');
  this.videoId = element.data('videoId');
  this.transitions = element.data('transitions');

  if (this.videoId) {
    this.element.append('<iframe class="yt-video" src="http://www.youtube.com/embed/' + this.videoId + '?enablejsapi=1&controls=0&showinfo=0&wmode=transparent&fs=0&rel=0&iv_load_policy=3" frameborder="0"></iframe>');
  }
}
