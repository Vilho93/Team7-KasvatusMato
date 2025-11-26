const memoryGamePoints = sessionStorage.getItem('memoryGamePoints')
/*const mathPoints = sessionStorage.getItem('matikkaPisteet')*/ 
document.getElementById("scoreText").textContent =
  `Sait ${memoryGamePoints} pistettä muistipelissä`;

const wormContainer = document.getElementById("worm");

const head = document.createElement("div");
head.classList.add("memorySegment", "head");

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

const memoryBodyCount = Number(memoryGamePoints);
for (let i = 0; i < memoryBodyCount; i++) {
  const memorySegment = document.createElement("div");
  memorySegment.classList.add("memorySegment");
  wormContainer.appendChild(memorySegment);
}

const mathBodyCount = 8
for (let i = 0; i < mathBodyCount; i++) {
  const mathSegment = document.createElement("div");
  mathSegment.classList.add("mathSegment");
  wormContainer.appendChild(mathSegment)
}