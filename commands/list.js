const playlist = require('../core/playlist');

module.exports = {
  name: 'list',
  description: 'Lists all of the songs in the current playlist',
  execute(message, args) {
    message.channel.send(playlist.summary());
  },
};