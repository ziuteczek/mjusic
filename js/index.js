'use strict';
import { generateBg } from './get-bg.js';
const songs = [];
const songInput = document.querySelector('.audio-input');

songInput.addEventListener('change', function (e) {
  e.preventDefault();
  const loadFile = async (song) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsArrayBuffer(song);
    });
  };
  const loadFiles = async () => {
    songs.push(...await Promise.all([...this.files].map(loadFile)));
  };
  loadFiles();
  console.log(songs);
});
async function newBg() {
  const bgObj = await generateBg();
  console.log(bgObj.src.original);
  document.body.style.backgroundImage = `url(${bgObj.src.original})`;
}
newBg();
