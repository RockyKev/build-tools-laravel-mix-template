
const jsElement = document.querySelector('#js');

// get image
// get header
// get description

const jsImage = jsElement.querySelector("img")
const jsHeader = jsElement.querySelector("h2")
const jsContent = jsElement.querySelector("p")

jsImage.src = '/asset/img/happy-cat.png';
jsContent.innerText = "Everything is working!";
