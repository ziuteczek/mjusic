'use strict';
import { generateBg } from './get-bg.js';
async function newBg() {
 const bgObj = await generateBg();
 console.log(bgObj.src.original);
 document.body.style.backgroundImage = `url(${bgObj.src.original})`;
}
newBg();