//
//    Audio play
//
//  == Mozilla Reference ==
//    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
//    has a DOM interface of:
//    https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement
//    which inherits from:
//    https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
//    See: Methods
//
//    Attributes used: autoplay, loop, paused, src
//    Methods used: load(), play(), pause()
//    Quirks:  stop() is not available; fake it.
//
//  == Phonegap Reference ==
//    http://docs.phonegap.com/en/3.3.0/cordova_media_media.md.html#Media
//    Methods used: play(), pause(), stop()
//    Quirks: loop() is not well defined; fake it.
//    Quirks: load() is not available.
//
//  == Test for phonegap ==
//
function WebAudio(source, id, autoplay) {

    var self = {};

    self.source       = source;
    // Mozilla ONLY
    self.elementId    = id;
    self.objectHandle = document.getElementById(self.elementId);
    // Phonegap ONLY
    self.androidRoot  = '/android_asset/www/';
    self.iOSRoot      = '';
    self.playbackRoot = null;  // set on initialization time
    self.my_media     = null;
    self.loop_it      = false; // used to fake an audio loop
    self.paused       = false;

    self.phoneGapAvailable = function() {
        // http://stackoverflow.com/questions/8068052/phonegap-detect-if-running-on-desktop-browser
        return navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/);
        // https://www.sencha.com/forum/showthread.php?144127-Checking-if-running-in-PhoneGap-or-Mobile-Web-Browser
        //return typeof(PhoneGap) != 'undefined';
    }

    self.onError   = function (e) {alert('audioShim has a problem\n' + JSON.stringify(e));};
    self.onSuccess = function ()  {self.replay();};
    self.replay    = function ()  {
        if (self.loop_it) {
            self.playAudio();
        }
    };
    //
    // Play audio
    //
    self.playAudio = function (src) {

        if (self.my_media === null) {
            // Create Media object from src
            self.my_media = new Media(self.playbackRoot + src, onSuccess, onError);
        } // else play current audio
        // Play audio
        self.my_media.play();
    };

    self.pauseAudio = function ( ) {
        if (self.my_media) {
            if (self.paused) {
                self.paused = false;
                self.my_media.play();
            } else {
                self.paused = true;
                self.my_media.pause();
            }
        }
    };

    self.stopAudio = function ( ) {
        if (self.my_media) {
            self.my_media.stop();
        }
    };

    self.loadAudio = function (src) {
    };

    self.loopAudio = function ( ) {
        if ( self.loop_it ) {
            self.loop_it = false;
        } else {
            self.loop_it = true;
        }
    };

    // NOTE: the inline functions were not 'hoisted'.
    console.log("detect mobile say:", self.phoneGapAvailable());

    self.playbackRoot = (device.platform == 'Android') ? self.androidRoot : self.iOSRoot;
    if (self.my_media === null) {
        // Create Media object
        self.my_media = new Media(self.playbackRoot + self.source, self.onSuccess, self.onError);
    }

    return self;
};
