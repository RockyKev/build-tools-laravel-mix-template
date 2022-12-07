import { initConsoleLogImg } from 'console-log-img';

// Run this once to initialize the library
initConsoleLogImg({
  // Optionally, disable image dimensions logging (enabled by default)
  printDimensions: true,
});

const consoleImage = '/asset/img/happy-cat.png';

// Print an image from a URI, at original size
console.img(consoleImage);

console.log("im here in library")

const libElement = document.querySelector('#lib');

const libImage = libElement.querySelector("img")
const libHeader = libElement.querySelector("h2")
const libContent = libElement.querySelector("p")

libImage.src = consoleImage;
libContent.innerText = "Everything is working!";
