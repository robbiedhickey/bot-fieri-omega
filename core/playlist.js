class Playlist {
  queue = [];
  isPlaying = false;
  currentlyPlaying = "";

  empty() {
    return this.queue.length === 0;
  }

  playing() {
    return this.isPlaying;
  }

  next() {
    let nextTrack = this.queue.shift();
    this.currentlyPlaying = nextTrack;
    return nextTrack;
  }

  add(searchTerms) {
    this.isPlaying = true;
    this.queue.push(searchTerms);
  }

  completed() {
    this.isPlaying = false;
    this.currentlyPlaying = "";
  }

  summary() {
    let current = `Currently playing: ${this.currentlyPlaying}\r\n\r\n`;
    let next = `Up next: \r\n\r\n ${this.queue.join('\r\n')}`;
    return current + next;
  }
}

module.exports = new Playlist();