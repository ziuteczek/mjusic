'use strict';
import { generateBg } from './get-bg.js';
const audioPlayer = document.querySelector('.audio-player');
const songInput = document.querySelector('.audio-input');

const lastSongBtn = document.querySelector('.last-song');
const nextSongBtn = document.querySelector('.next-song');
const playBtn = document.querySelector('#play-pause');
const playIcon = playBtn.querySelector('#play-pause__icon');

const songs = [];
let currSongIndex = 0;

async function newBg() {
  const bgObj = await generateBg();
  console.log(bgObj.src.original);
  document.body.style.backgroundImage = `url(${bgObj.src.original})`;
}
// newBg();
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
  const pause = playIcon.classList.contains('fa-play');
  handlePlayIcon(pause);
});
nextSongBtn.addEventListener('click', function (e) {
  e.preventDefault();
  currSongIndex = currSongIndex >= songs.length ? 0 : currSongIndex + 1;
  console.log(currSongIndex);
});
lastSongBtn.addEventListener('click', function (e) {
  e.preventDefault();
  currSongIndex = currSongIndex === 0 ? 0 : currSongIndex - 1;
  console.log(currSongIndex);
});
function playSong (song) {
  audioPlayer.src = song.URL;
  audioPlayer.currentTime = 0;
}
function handlePlayIcon(toPause) {
  if (toPause) {
    playIcon.classList.remove('fa-play');
    playIcon.classList.add('fa-pause');
  } else {
    playIcon.classList.remove('fa-pause');
    playIcon.classList.add('fa-play');
  }
}
