'use strict';
import { generateBg } from './get-bg.js';
const audioPlayer = document.querySelector('.audio-player');
const songInput = document.querySelector('.audio-input');

const lastSongBtn = document.querySelector('.last-song');
const nextSongBtn = document.querySelector('.next-song');
const playBtn = document.querySelector('#play-pause');
const playIcon = document.querySelector('#play-pause__icon');
const songTitle = document.querySelector('.song-title');

const songs = [];
let currSongIndex = 0;

async function newBg() {
  const bgObj = await generateBg();
  console.log(bgObj.src.original);
  document.body.style.backgroundImage = `url(${bgObj.src.original})`;
}
newBg();
const createAlert = (title, timeout) => {
  const alertEl = document.createElement('div');
  alertEl.innerHTML = `
  <div class="alert">
  <h3>${title}</h3>
  <div class="loadbar"></div>
  </div>`;
  document.body.append(alertEl);
  setTimeout(() => alertEl.remove(), timeout * 1000);
};
songInput.addEventListener('change', function (e) {
  e.preventDefault();
  const songsToAdd = [...this.files];
  songsToAdd.forEach(async function(song) {
    const songObj = {
      name: await insertSongData(song.name),
      URL: URL.createObjectURL(song),
    };
    songs.push(songObj);
  });
});
playBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (isSongsEmpty()) {
    return;
  }
  playPause();
});
nextSongBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (isSongsEmpty()) {
    return;
  }
  nextSong();
});
lastSongBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (isSongsEmpty()) {
    return;
  }
  lastSong();
});
const isSongsEmpty = () => {
  if (songs.length === 0) {
    createAlert('There are no songs to play!', 5);
    return true;
  } else {
    return false;
  }
};
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
  } else {
    audioPlayer.pause();
  }
};
function insertSongData(fileName) {
  const blurBg = document.createElement("div");
  blurBg.classList.add("blur")
  document.body.append(blurBg);
  const insertEl = document.createElement("div");
  insertEl.classList.add("insert-song");
  document.body.append(insertEl);
  insertEl.innerHTML = `
  <button class="close">x</button>
  <h3>Song name</h3>
  <input type="text">
  <button class="submit">Name it</button>`
  const input = insertEl.querySelector("input");
  const closeBtn = insertEl.querySelector(".close");
  const submitBtn = insertEl.querySelector(".submit");

  input.value = fileName;
  const closeModal = (...toRemove) => {
    toRemove.forEach(e => e.remove());
  }
  closeBtn.addEventListener("click",()=>closeModal(insertEl,blurBg));
  blurBg.addEventListener("click",()=>closeModal(insertEl,blurBg));
  return new Promise(resolve=>{
    submitBtn.addEventListener("click",()=>{
      closeModal(insertEl,blurBg);
      resolve(input.value);
    })
  })
}