'use strict';
import { generateBg } from './get-bg.js';
const audioPlayer = document.querySelector('.audio-player');
const songInput = document.querySelector('.audio-input');

const lastSongBtn = document.querySelector('.last-song');
const nextSongBtn = document.querySelector('.next-song');
const playBtn = document.querySelector('#play-pause');
const playIcon = document.querySelector('#play-pause__icon');
const songTitle = document.querySelector(".song-title");

const songs = [];
let currSongIndex = 0;

async function newBg() {
  const bgObj = await generateBg();
  console.log(bgObj.src.original);
  document.body.style.backgroundImage = `url(${bgObj.src.original})`;
}
newBg();
const createAlert = (title,timeout) => {
  const alertEl = document.createElement("div");
  alertEl.innerHTML = `
  <div class="alert">
  <h3>${title}</h3>
  <div class="loadbar"></div>
  </div>`
  document.body.append(alertEl);
  setTimeout(() => alertEl.remove(),timeout * 1000)
}
songInput.addEventListener('change', function (e) {
  e.preventDefault();
  const songsToAdd = [...this.files];
  songsToAdd.forEach((song) => {
    const songObj = {
      name: song.name,
      URL: URL.createObjectURL(song),
    };
    songs.push(songObj);
  });
});
playBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (songs.length === 0) {
    createAlert("There are no songs to play!",5);
    return;
  };
  playPause();
});
nextSongBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (songs.length === 0) {
    createAlert("There are no songs to play!",5);
    return;
  };
  nextSong();
});
lastSongBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (songs.length === 0) {
    createAlert("There are no songs to play!",5);
    return;
  };
  lastSong();
});

function nextSong() {
  currSongIndex = currSongIndex === songs.length - 1 ? 0 : currSongIndex + 1;
  playSong(songs[currSongIndex]);
  console.log(currSongIndex);
}
function lastSong() {
  currSongIndex = currSongIndex === 0 ? 0 : currSongIndex - 1;
  playSong(songs[currSongIndex]);
  console.log(currSongIndex);
}

const playSong = (song) => {
  audioPlayer.src = song.URL;
  songTitle.textContent = song.name;
  audioPlayer.currentTime = 0;
  audioPlayer.play();
};
function handlePlayIcon() {
  const toPause = playIcon.classList.contains('fa-play');
  if (toPause) {
    playIcon.classList.remove('fa-play');
    playIcon.classList.add('fa-pause');
  } else {
    playIcon.classList.remove('fa-pause');
    playIcon.classList.add('fa-play');
  }
}
const playPause = () => {
  handlePlayIcon();
  if (audioPlayer.paused) {
    audioPlayer.play();
  }
  else {
    audioPlayer.pause();
  }
}