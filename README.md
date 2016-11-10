# videojs-kodi

Play to kodi

## Table of Contents

<!-- START doctoc -->
<!-- END doctoc -->
## Installation

```sh
npm install --save videojs-kodi
```

The npm installation is preferred, but Bower works, too.

```sh
bower install  --save videojs-kodi
```

## Usage

To include videojs-kodi on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-kodi.min.js"></script>
<script>
  var player = videojs('my-video');

  player.kodi();
</script>
```

### Browserify

When using with Browserify, install videojs-kodi via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-kodi');

var player = videojs('my-video');

player.kodi();
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-kodi'], function(videojs) {
  var player = videojs('my-video');

  player.kodi();
});
```

## License

MIT. Copyright (c) s


[videojs]: http://videojs.com/
