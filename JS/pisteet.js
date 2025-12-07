const peli1Points = Number(sessionStorage.getItem('peli1Points'));
const peli2Points = Number(sessionStorage.getItem('peli2Points'));
const peli3Points = Number(sessionStorage.getItem('peli3Points'));
const peli4Points = Number(sessionStorage.getItem('peli4Points'));
const peli5Points = Number(sessionStorage.getItem('peli5Points'));



document.getElementById("scoreText").textContent =
  `Sait ${peli1Points} pistettä 1. pelissä, ${peli2Points} pistettä 2. pelissä, ${peli3Points} pistettä 3. pelissä, ${peli4Points} pistettä 4. pelissä ja ${peli5Points} pistettä 5. pelissä.`;

const wormContainer = document.getElementById("worm");

const head = document.createElement("div");
head.classList.add("worm-head");

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


for (let i = 0; i < peli1Points; i++) {
  const seg = document.createElement("div");
  seg.classList.add("worm-body", "peli1Segment");
  wormContainer.appendChild(seg);
}

for (let i = 0; i < peli2Points; i++) {
  const seg = document.createElement("div");
  seg.classList.add("worm-body", "peli2Segment");
  wormContainer.appendChild(seg);
}

for (let i = 0; i < peli3Points; i++) {
  const seg = document.createElement("div");
  seg.classList.add("worm-body", "peli3Segment");
  wormContainer.appendChild(seg);
}

for (let i = 0; i < peli4Points; i++) {
  const seg = document.createElement("div");
  seg.classList.add("worm-body", "peli4Segment");
  wormContainer.appendChild(seg);
}

for (let i = 0; i < peli5Points; i++) {
  const seg = document.createElement("div");
  seg.classList.add("worm-body", "peli5Segment");
  wormContainer.appendChild(seg);
}