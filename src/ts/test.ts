interface Content {
  status: string;
}

const tsContent: Content = {
  status: "Everything",
};

const tsElement = document.querySelector<HTMLElement>("#ts")

const tsImage = tsElement.querySelector<HTMLImageElement>('img')
const tsParagraph = tsElement.querySelector<HTMLElement>("p")

tsImage.src = '/asset/img/happy-cat.png';
tsParagraph.textContent = `${tsContent['status']} is Working!`

