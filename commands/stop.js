

module.exports = {
  name: "stop", 
  description: "Stops the currently playing youtube video",
  execute(msg, args) {
    if (msg.channel.type !== "text") return;

    const voiceChannel = msg.member.voice.channel;

    if (!voiceChannel) {
        return msg.reply(
            "how am I supposed to take you to flavortown like this? You gotta join a voice channel first, my brutha!"
          );    }

    voiceChannel.join().then(() => {
      console.log("leaving voice channel");
      voiceChannel.leave();
    });
  }
};
