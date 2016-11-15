import videojs from 'video.js';

const Button = videojs.getComponent('Button');
const Component = videojs.getComponent('Component');
const Tech = videojs.getTech('Tech');

// Default options for the plugin.
const defaults = {};

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 * @param    {Object} [options={}]
 */
const onPlayerReady = (player, options) => {
  player.addClass('vjs-kodi');
  console.log({
    'vjs-kodi player': player,
    options: options
  })
  if(!options.kodi){
    return false;
  }
  player.controlBar.kodi = player.controlBar.addChild('kodiButton', {
    kodi: options.kodi
  });

  player.controlBar.el().insertBefore(
      player.controlBar.kodi.el(),
      player.controlBar.fullscreenToggle.el()
  );
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function kodi
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
const kodi = function(options) {
  this.ready(() => {
    onPlayerReady(this, videojs.mergeOptions(defaults, options));
  });
};

class KodiButton extends Button {
  constructor(player, options) {
    super(player, options);
    this.kodi = player.getChild('KodiPlayer');
  }

  buildCSSClass() {
    return 'vjs-kodi-button';
  }


  handleClick() {
    this.kodi.trigger('toggle');
  }
}

Component.registerComponent('KodiButton', KodiButton);

class KodiPlayer extends Component {
  constructor(player, option) {
    super(player, option);


    this.on('stopKodi', this.handleStopKodi);
    this.on('startKodi', this.handleStartKodi);
    this.on('toggle', this.handleToggle);
    this.on('kodiAvailable', this.handleKodiAvailable);
    this.on('kodiUnavailable', this.handleKodiUnavailable);
    this.on('kodiConnected', this.handleKodiConnected);
    this.on('kodiDisconnected', this.handleKodiDisconnected);

    this.casting = false;

  }

  handleToggle() {
    if (this.casting) {
      this.trigger('stopKodi');
    } else {
      this.trigger('startKodi');
    }
  }

  handleKodiConnected() {
    videojs.log('handleKodiConnected');
    this.player_.textTrackDisplay.hide();
  }

  handleKodiDisconnected() {
    videojs.log('handleKodiDisconnected');
    this.player_.textTrackDisplay.show();
  }

  handleKodiAvailable() {
    videojs.log('handleKodiAvailable');
  }

  handleKodiUnavailable() {
    videojs.log('handleKodiUnavailable');
  }

  handleStopKodi() {
    videojs.log('onStopKodi');
    //this.stopKodiing();
  }

  handleStartKodi() {
    videojs.log('onStartKodi');
    /*if (this.apiInitialized) {
      if (this.apiSession) {
        this.onSessionSuccess(this.apiSession);
      } else {
        chrome.cast.requestSession(this.onSessionSuccess.bind(this),
            this.castError);
      }
    } else {
      videojs.log('Session not initialized');
    }*/
  }
}

videojs.registerComponent('KodiPlayer', KodiPlayer);

class KodiTech extends Tech {
  constructor(options, ready) {
    super(options, ready);

    this.featuresVolumeControl = true;
    this.movingMediaElementInDOM = false;
    this.featuresFullscreenResize = false;
    this.featuresProgressEvents = true;
    this.source = options.source;
    this.kodi = options.kodi;


  }

  dispose() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.textTracks().removeEventListener('change', this.onTrackChangeHandler);
    super.dispose();
  }

  createEl() {
    const kodi = this.options().kodi;
    const name = "Kodi";
    const el = videojs.createEl('div');

    el.className = 'vjs-tech vjs-tech-kodi';
    el.innerHTML = `
<div class=\'kodi-casting-image\' style=\'background-image: url('')\'></div>
<div class=\'kodi-casting-overlay\'>
<div class=\'kodi-casting-information\'>
<div class=\'kodi-casting-icon\'>&#58880</div>
<div class=\'kodi-casting-description\'><small>Streaming to</small><br>${name}</div>
</div>
</div>`;
    return el;
  }

  play() {
    if (!this.kodi) {
      return;
    }

    console.log(this);
    return;
    this.kodi.playFile();

    if (this._paused) {
      this.apiMedia.play(null,
          this.onPlaySuccess.bind(this),
          this.onError);
      this._paused = false;
    }
  }
}

videojs.registerComponent('KodiTech', KodiTech);

// Register the plugin with video.js.
videojs.plugin('kodi', kodi);

// Include the version number.
kodi.VERSION = '__VERSION__';

export default kodi;
