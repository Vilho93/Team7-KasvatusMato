
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
    const submitButton = document.getElementById("submit-answer");

    startButton.addEventListener("click", startGame);
    submitButton.addEventListener("click", checkAnswer);
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
    const answerInput = document.getElementById("answer");
    const questionEl = document.getElementById("question");
    
    // tyhjentää edellisen kierroksen
    gameArea.innerHTML = "";
    feedback.textContent = "";
    answerInput.value = "";

    // Haetaan kierroksen pääemoji, jooita käyttäjän tulee laskea
    const roundData = emojiRounds[currentRound - 1];
    const symbol = roundData.symbol;
    const namePartitive = roundData.namePartitive;

    // Arpoo pääemojien lukumäärän 1-10
    correctNumberForRound = Math.floor(Math.random() * 10) + 1;

    // Hämäysemojit
    //const distractorEmojis = ["🐄", "🐊", "🐢", "🦀", "🦗", "🐝", "🦂", "🐧", "🦡", "🫎",];
    
    // Valitsee 1 satunnaisen hämäysemojin ja ottaa muut emojiRounds listasta
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

    // Sekoottaa järjestyksen ( Fisher-Yates kaava)
    for (let i = displayEmojis.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [displayEmojis[i], displayEmojis[j]] = [displayEmojis[j], displayEmojis[i]];
  }

  // Piirtää emojit ruudulle
    displayEmojis.forEach(e => {
      const el = document.createElement("span");
      el.textContent = e;
      el.style.fontSize = "40px";
      el.style.margin = "6px";
      gameArea.appendChild(el);
    });


    questionEl.textContent = `Montako ${namePartitive} näet?`;
}

function checkAnswer() {
  const answerInput = document.getElementById("answer");
  const feedback = document.getElementById("feedback");

  const userAnswer = Number(answerInput.value);

 
  if (userAnswer === correctNumberForRound) {
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

  gameArea.innerHTML = "";
  questionEl.textContent = "Peli päättyi!";
  feedback.textContent = `Sait ${score} / ${totalRounds} oikein 👏`;
}