const ytdl = require('ytdl-core-discord');
const ytsr = require('ytsr');

module.exports = {
  name: "play", 
  description: "Searches for a youtube video matching the provided string and plays it in the user's voice channel",
  execute(msg, args) {
    console.log('invoking play command');
    if (msg.channel.type !== "text") return;

    const voiceChannel = msg.member.voice.channel;

    if (!voiceChannel) {
      return msg.reply(
        "how am I supposed to take you to flavortown like this? You gotta join a voice channel first, my brutha!"
      );
    }

    voiceChannel.join().then(connection => {
      connection.on('debug', console.log);

      const searchTerms = args.join(" ");
      console.log('searching for ', searchTerms);

      ytsr(searchTerms).then(results => {
        const ytUrl = results.items[0].link;
        ytdl(ytUrl, { filter: "audioonly" }).then(stream => {
            const dispatcher = connection.play(stream, { highWaterMark: 50, type: 'opus', volume: false });
            dispatcher.on("end", () => voiceChannel.leave());
        });
      });
    });
  }
};
