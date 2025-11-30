
const totalRounds = 10;
let currentRound = 0;
let correctNumberForRound = 0;
let score = 0;
let restartBtn;

const emojiRounds = [ 
    { symbol: "🐴", namePartitive: "hevosta" },
    { symbol: "🐈‍⬛", namePartitive: "kissaa" },
    { symbol: "🦮", namePartitive: "koiraa" },
    { symbol: "🐖", namePartitive: "possua" },
    { symbol: "🦉", namePartitive: "pöllöä" },
    { symbol: "🐟", namePartitive: "kalaa" },
    { symbol: "🦖", namePartitive: "dinosaurusta" },
    { symbol: "🕷️", namePartitive: "hämähäkkiä" },
    { symbol: "🐒", namePartitive: "apinaa" },
    { symbol: "🪰", namePartitive: "kärpästä" }, 
];

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-game");
  restartBtn = document.getElementById("restart-game");
    
  startButton.addEventListener("click", startGame)
  restartBtn.addEventListener("click", startGame);
  

// Ohje-modaali
  const modal = document.getElementById("instructions-modal");
  const openBtn = document.getElementById("open-instructions");
  const closeBtn = document.getElementById("close-instructions");

  console.log({ modal, openBtn, closeBtn });

  if (modal && openBtn && closeBtn) {
      
      openBtn.addEventListener("click", () => {
        modal.hidden = false;
        document.body.classList.add("modal-open");
      });
   
      closeBtn.addEventListener("click", () => {
        modal.hidden = true;
        document.body.classList.remove("modal-open");
      });        
    }
  });

// Pelin käynistys
function startGame() {
    const introSection = document.querySelector(".intro");
    const gameSection = document.getElementById("game"); 

    introSection.hidden = true;
    gameSection.hidden = false;
    restartBtn.hidden = true;

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

  questionEl.innerHTML = `Montako ${namePartitive} <span class="question-symbol"> ${symbol}</span> näet?`;

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
  const buttons = answersEl.querySelectorAll("button");

  // Napit disabloidaan, kun on vastattu
  buttons.forEach(btn => {
    btn.disabled = true;

  // värit vastaustyypeille
    if (Number(btn.textContent) === correctNumberForRound) {
      btn.classList.add("correct"); 
    } else if (Number(btn.textContent) === selectedNumber) {
      btn.classList.add("wrong"); 
    }
  });

  if (selectedNumber === correctNumberForRound) {
    feedback.textContent = "Oikein! 👍";
    score++;
  } else {
    feedback.textContent = `Väärin 😕 Oikea vastaus olisi ollut ${correctNumberForRound}`;
  }

  
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
  feedback.textContent = `Sait ${score} / ${totalRounds} oikein.`;

  // Hakee aiemman ennätyksen ja näyttää sen pelin lopussa ja päivittää jos uusi syntyy.
  const previousBest = Number(sessionStorage.getItem("bestScore")) || 0;
  if (score > previousBest) {
    sessionStorage.setItem("bestScore", score);
    feedback.innerHTML += ` Teit uuden ennätyksen! 🎉`; 
  } else {
    feedback.innerHTML += `<br><br> Paras tulos: ${previousBest}`;
  }
  
  sessionStorage.setItem("lastScore", score);

  restartBtn.hidden = false;
}

  



