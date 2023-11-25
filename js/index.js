'use strict';
import { generateBg } from './get-bg.js';
const songs = [];
const audioPlayer = document.querySelector('.audio-player');
const songInput = document.querySelector('.audio-input');

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
