
const totalRounds = 10;
let currentRound = 0;
let correctNumberForRound = 0;
let score = 0;

const emojiRounds = [ 
    { symbol: "🐴", namePartitive: "HEVOSTA" },
    { symbol: "🐈‍⬛", namePartitive: "KISSAA" },
    { symbol: "🦮", namePartitive: "KOIRAA" },
    { symbol: "🐖", namePartitive: "POSSUA" },
    { symbol: "🦉", namePartitive: "PÖLLÖÄ" },
    { symbol: "🐟", namePartitive: "KALAA" },
    { symbol: "🦖", namePartitive: "DINOSAURUSTA" },
    { symbol: "🕷️", namePartitive: "HÄMÄHÄKKIÄ" },
    { symbol: "🐒", namePartitive: "APINAA" },
    { symbol: "🪰", namePartitive: "KÄRPÄSTÄ" }, 
];

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-game");

  startButton.addEventListener("click", startGame);
});

// käynnistää pelin
function startGame() {
    const introSection = document.querySelector(".intro");
    const gameSection = document.getElementById("game");

    // Piilottaa intron ja pelisectio tulee näkyviin
    introSection.hidden = true;
    gameSection.hidden = false;

    currentRound = 0;
    score = 0;

    newRound();
}

// luo uuden tehtävän
function newRound() {
  currentRound++;

  // Peli loppuu jos kierrokset loppuu
  if (currentRound > totalRounds) {
    endGame();
    return;
  }

  const gameArea = document.getElementById("game-area");
  const feedback = document.getElementById("feedback");
  const answersEl = document.getElementById("answers");
  const questionEl = document.getElementById("question");
  
  // tyhjentää edellisen kierroksen
  gameArea.innerHTML = "";
  feedback.textContent = "";
  answersEl.innerHTML = "";

  // Haetaan kierroksen pääemoji, joita käyttäjän tulee laskea
  const roundData = emojiRounds[currentRound - 1];
  const symbol = roundData.symbol;
  const namePartitive = roundData.namePartitive;

  // Arpoo pääemojien lukumäärän 1–10
  correctNumberForRound = Math.floor(Math.random() * 10) + 1;

  questionEl.textContent = `Montako ${namePartitive} ${symbol} näet?`;

  // Valitsee 1 satunnaisen hämäysemojin emojiRounds-listasta
  const otherEmojis = emojiRounds
    .map(e => e.symbol)
    .filter(e => e !== symbol);

  const distractorSymbol =
    otherEmojis[Math.floor(Math.random() * otherEmojis.length)];

  // Arpoo hämäysemojien määrän  
  const distractorCount = Math.floor(Math.random() * 8) + 1;

  // Kerää taulukon kaikista näytettävistä emojista
  const displayEmojis = [];

  // pääemojit jotka lasketaan
  for (let i = 0; i < correctNumberForRound; i++) {
    displayEmojis.push(symbol);
  }

  // yksi hämääjäemoji, monta kappaletta
  for (let i = 0; i < distractorCount; i++) {
    displayEmojis.push(distractorSymbol);
  }

  // Sekoittaa järjestyksen (Fisher–Yates)
  for (let i = displayEmojis.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [displayEmojis[i], displayEmojis[j]] = [displayEmojis[j], displayEmojis[i]];
  }

  // Piirtää emojit ruudulle
  displayEmojis.forEach(e => {
    const el = document.createElement("span");
    el.textContent = e;
    el.style.fontSize = "80px";
    el.style.margin = "10px";
    gameArea.appendChild(el);
  });

  // vastausnapit
  const options = new Set();
  options.add(correctNumberForRound);

// arvotaan muita vaihtoehtoja väliltä 1–10
  while (options.size < 3) {
    const candidate = Math.floor(Math.random() * 10) + 1; 
    if (candidate !== correctNumberForRound) {
      options.add(candidate);
    }
  }

  Array.from(options)
  .sort((a, b) => a - b)
  .forEach(num => {
    const btn = document.createElement("button");
    btn.textContent = num;
    btn.className = "answer-btn";
    btn.addEventListener("click", () => handleAnswer(num));
    answersEl.appendChild(btn);
  });
}


// vastauksen käsittely
function handleAnswer(selectedNumber) {
  const feedback = document.getElementById("feedback");
  const answersEl = document.getElementById("answers");

  // Napit disabloidaan, kun on vastattu
  const buttons = answersEl.querySelectorAll("button");
  buttons.forEach(btn => {
    btn.disabled = true;
  });

  if (selectedNumber === correctNumberForRound) {
    feedback.textContent = "Oikein! 🎉";
    score++;
  } else {
    feedback.textContent = `Väärin 😕 Oikea vastaus olisi ollut ${correctNumberForRound}`;
  }

  // muutaman sekunnin viive ja kysymys vaihtuu
  setTimeout(newRound, 3000);
}

function endGame() {
  const gameArea = document.getElementById("game-area");
  const feedback = document.getElementById("feedback");
  const questionEl = document.getElementById("question");
  const answersEl = document.getElementById("answers");

  gameArea.innerHTML = "";
  answersEl.innerHTML = "";
  questionEl.textContent = "Peli päättyi!";
  feedback.textContent = `Sait ${score} / ${totalRounds} oikein`;

  // Hakee aiemman ennätyksen ja näyttää sen pelin lopussa ja päivittää jos uusi syntyy.
  const previousBest = Number(sessionStorage.getItem("bestScore")) || 0;
  if (score > previousBest) {
    sessionStorage.setItem("bestScore", score);
    feedback.innerHTML += `Uusi ennätys! 🎉 ${score} pistettä`; 
  } else {
    feedback.innerHTML += `Paras tulos: ${previousBest}`;
  }
  
  sessionStorage.setItem("lastScore", score);


}