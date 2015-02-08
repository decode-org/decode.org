$(document).ready(function() {
  console.log('Decode is going ;)');

  $('.lesson-video').each(function() {
    createVideo($(this), $(this).data('video-config'));
  });
});
