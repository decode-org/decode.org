var $ = require('jquery');

try { (function() {
  var lastTime = 0;
var lastCheckTime = 0;
var currentIndex = 0;
var currentView = 0;
var toLoad = -3;


var editor;
var aceRange = ace.require('ace/range').Range;
var aceSelection = ace.require('ace/selection').Selection;
var selection;

function countProperties(obj) {
    var count = 0;

    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
        ++count;
    }

    return count;
}

function blank() { // what is this used for? Dead method?
}

function eventClock() {
    //console.log();
    var curTime = player.getCurrentTime(),
        i;
    if (curTime < lastCheckTime) {
        lastTime = 0;
        currentIndex = 0;
        currentView = 0;
        for (i in config.files) {
            config.files[i].session = new ace.EditSession(config.files[i].data, "ace/mode/actionscript");
        }
    }
    for (i = currentIndex + 1; i < recordData.length; i += 1) {
        var ev = recordData[i];
        var doc = editor.getSession().getDocument();

        if (Math.abs(lastTime - curTime * 1000) >= ev.distance) {
            //console.log(lastTime + ":" + curTime * 1000 + "\nMode:" + ev.mode);
            lastTime += ev.distance;
            currentIndex += 1;
            switch (ev.mode) {
                case 0:
                    doc.insert({
                        column: ev.position.col,
                        row: ev.position.row
                    }, ev.data);
                    editor.scrollToLine(ev.position.row, true, true, blank);
                    break;
                case 1:
                    var start = {
                        column: ev.position.col,
                        row: ev.position.row
                    };
                    var end = {
                        column: ev.position.col + ev.length.col,
                        row: ev.position.row + ev.length.row
                    };
                    var rang = new aceRange(start.row, start.column, end.row, end.column);
                    editor.scrollToLine(ev.position.row, true, true, blank);
                    //console.log(start, end, rang);
                    doc.remove(rang);
                    break;

                case 2:
                    //editor.clearSelection();
                    var rang = new aceRange(0, 0, 0, 0);
                    var p1 = {
                        row: ev.position.row,
                        column: ev.position.col
                    };
                    var p2 = {
                        row: ev.position.row + ev.length.row,
                        column: ev.position.col + ev.length.col
                    };
                    if ((ev.length.row < 0) || ((ev.length.row == 0) && (ev.length.col < 0))) {
                        selection.start = p2;
                        selection.end = p1;
                    } else {
                        selection.start = p1;
                        selection.end = p2;
                    }
                    editor.scrollToLine(ev.position.row, true, true, blank);

                    selection.cursor.column = ev.position.col;
                    selection.cursor.row = ev.position.row;
                    editor.updateSelectionMarkers();
                    break;
                case 3:
                    editor.clearSelection();
                    editor.removeSelectionMarker(selection);
                    editor.getSession().$selectionMarkers = [];
                    editor.updateSelectionMarkers();

                    editor.setSession(config.files[ev.data].session);
                    $('.code-playing').html(config.files[ev.data].path);
                    doc = editor.getSession().getDocument();
                    editor.clearSelection();
                    editor.getSession().$selectionMarkers = [];

                    selection = editor.addSelectionMarker(new aceRange(0, 0, 0, 0));
                    editor.updateSelectionMarkers();
                    break;
            }
        } else {
            break;
        }
    }

    var newView = currentView;
    for (i = currentView + 1; i < config.transitions.length; i++) {
        if (config.transitions[i].time <= curTime) {
            newView = i;
        }
    }

    if (currentView != newView) {
        switch (config.transitions[newView].to) {
            case 0:
                $('#editor').fadeOut();
                $('.video-playing').fadeIn();
                $('.code-playing').fadeOut();
                break;
            case 1:
                $('#editor').fadeIn();
                $('.video-playing').fadeOut();
                $('.code-playing').fadeIn();
                break;
        }
    }
    currentView = newView;

    $(".buffered").css("width", player.getVideoLoadedFraction() * 100 + "%");
    $(".needle").css("left", curTime / player.getDuration() * 100 + "%");
    setTimeout(eventClock, 30);

    lastCheckTime = curTime;

}

function onPlayerReady(event) {
    addToLoad("Video");
    player.setSize(containerWidth, $('.video-container').height())
    player.setPlaybackQuality("default");
}

function onStateChange(event) {
    switch (event.data) {
    case 1:
        $('.play-button').addClass('running');
        break;
    case 2:
        $('.play-button').removeClass('running');
        break;
    }
}

function addToLoad(mesg) {
    if (toLoad < 0) {
        toLoad += 1;
        console.log(mesg + ":" + toLoad);
        if (toLoad >= 0) {
            eventClock();
        }
    }
}
var config;
var recordData;
var derp; // this variable is not used

function loadConfig(url) {
    $.ajax({
        url: url + "/config.json",
        success: function (data) {
            config = data;
            toLoad -= countProperties(config.files);

            $('#player').attr('src', 'http://www.youtube.com/embed/' + config.video_id + '?enablejsapi=1&controls=0&showinfo=0&wmode=transparent&fs=0&rel=0&iv_load_policy=3');

            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            addToLoad("Config");
            for (var i in config.files) {
                $.ajax({
                    url: url + "/" + i,
                    success: function (data, status, obj) {
                        config.files[obj.index].data = data;
                        config.files[obj.index].session = new ace.EditSession(data, "ace/mode/actionscript");
                        addToLoad("file");
                    }
                }).index = i;
            }
        }
    });
    $.ajax({
        url: url + "/recorder-data.json",
        success: function (data) {
            recordData = data;
            addToLoad("Record");
        }
    });


}

var containerWidth = 0;

function resizePlayer() {
    if (containerWidth != $(".video-container").width()) {
        containerWidth = $(".video-container").width();
        $(".video-container").height(containerWidth / 16 * 9);
        if (typeof player != 'undefined') {
            player.setSize(containerWidth, $('.video-container').height())
            player.setPlaybackQuality("default");
        }
        editor.resize(true);
    }
}

var player;

window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player('player', {
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onStateChange
        }
    });
}

var createVideo = module.exports = function(elem, url) {
    //callEvent(0);

    elem.append("<div class='old-video'><div class='current-playing'><div class='video-playing'>Video</div><div class='code-playing'></div></div><div class='video-container'><iframe id='player' frameborder='0'></iframe><div id='editor'></div></div><div class='controls'><div class='play-button'>Go</div><div class='seek'><div class='buffered'></div><div class='needle'></div></div></div>");
    loadConfig(url);


    editor = ace.edit("editor");
    editor.setReadOnly(true);
    selection = editor.addSelectionMarker(new aceRange(0, 0, 0, 0))


    resizePlayer();
    $(window).resize(resizePlayer);
    $('.seek').click(function (e) {
        var posX = e.pageX - $(this).offset().left,
            posY = e.pageY - $(this).offset().top;
        //alert((e.pageX - posX) + ' , ' + (e.pageY - posY));
        player.seekTo(posX / $('.seek').width() * player.getDuration(), true);
    });
    $('.play-button').click(function (e) {
        if (player.getPlayerState() == 1) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
    });

}
})(); } catch (e) {
}
