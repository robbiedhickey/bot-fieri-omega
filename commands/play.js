const ytdl = require('ytdl-core-discord');
const ytsr = require('ytsr');
const playlist = require('../core/playlist');

function play(connection) {
  const searchTerms = playlist.next();
  console.log('Playing ', searchTerms);

  ytsr(searchTerms).then(results => {
    const ytUrl = results.items[0].link;
    ytdl(ytUrl, { filter: "audioonly" }).then(stream => {
      const dispatcher = connection.play(stream, { highWaterMark: 50, type: 'opus', volume: false });
      dispatcher.on("end", () => {
        console.log("Song complete.");
        if (playlist.empty()) {
          playlist.completed();
          voiceChannel.leave()
        } else {
          play(connection);
        }
      });
    });
  });
}

module.exports = {
  name: "play",
  description: "Searches for a youtube video matching the provided string and plays it in the user's voice channel",
  execute(msg, args) {
    console.log('invoking play command');

    if (msg.channel.type !== "text") return;

    const searchTerms = args.join(" ");

    if (!playlist.playing()) {
      console.log('Starting playlist with ', searchTerms);
      playlist.add(searchTerms);
      const voiceChannel = msg.member.voice.channel;

      if (!voiceChannel) {
        return msg.reply(
          "how am I supposed to take you to flavortown like this? You gotta join a voice channel first, my brutha!"
        );
      }

      voiceChannel.join()
        .then(connection => {
          play(connection);
        });
    } else {
      console.log('Playlist alread in progress, adding ', searchTerms);
      playlist.add(searchTerms);
    }
  }
};
