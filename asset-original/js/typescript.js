var tsContent = {
    status: "Everything"
};
var tsElement = document.querySelector("#ts");
var tsImage = tsElement.querySelector('img');
var tsParagraph = tsElement.querySelector("p");
tsImage.src = '/asset/img/happy-cat.png';
tsParagraph.textContent = "".concat(tsContent['status'], " is Working!");
