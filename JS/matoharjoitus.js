const memoryGamePoints = sessionStorage.getItem('muistipeliPisteet')
document.getElementById("scoreText").textContent =
  `Sait ${memoryGamePoints} pistettä muistipelissä`;

const wormContainer = document.getElementById("worm");

const head = document.createElement("div");
head.classList.add("segment", "head");

const smile = document.createElement("div");
smile.classList.add("smile");
head.appendChild(smile);

const antennaLeft = document.createElement("div");
antennaLeft.classList.add("antenna", "left");
head.appendChild(antennaLeft);

const antennaRight = document.createElement("div");
antennaRight.classList.add("antenna", "right");
head.appendChild(antennaRight);

wormContainer.appendChild(head);

const bodyCount = Number(memoryGamePoints);
for (let i = 0; i < bodyCount; i++) {
  const segment = document.createElement("div");
  segment.classList.add("segment");
  wormContainer.appendChild(segment);
}