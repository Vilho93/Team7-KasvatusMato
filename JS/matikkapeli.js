
const totalRounds = 10;
let currentRound = 0;
let correctNumberForRound = 0;
let score = 0;

const emojiRounds = [
    { symbol: "❤️", namePartitive: "sydäntä" },
    { symbol: "🐈", namePartitive: "kissaa" },
    { symbol: "🐔", namePartitive: "kanaa" },
    { symbol: "🐖", namePartitive: "possua" },
    { symbol: "🐁", namePartitive: "hiirtä" },
    { symbol: "🐟", namePartitive: "kalaa" },
    { symbol: "🐦", namePartitive: "lintua" },
    { symbol: "🕷️", namePartitive: "hämähäkkiä" },
    { symbol: "🍕", namePartitive: "pitsapalaa" },
    { symbol: "🍬", namePartitive: "karkkia" },
    { symbol: "🍓", namePartitive: "mansikkaa" },
    { symbol: "🍎", namePartitive: "omenaa" },
    { symbol: "🚗", namePartitive: "autoa" },
    { symbol: "🚲", namePartitive: "polkupyörää" }, 
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

    // Haetaan kierroksen emoji
    const roundData = emojiRounds[currentRound - 1];
    const symbol = roundData.symbol;
    const namePartitive = roundData.namePartitive;

    // Arpoo emojien lukumäärän 1-10
    correctNumberForRound = Math.floor(Math.random() * 10) + 1;

    questionEl.textContent = `Montako ${namePartitive} näet?`;

    // Emojit näkyviin
    for (let i = 0; i < correctNumberForRound; i++) {
        const el = document.createElement("span");
        el.textContent = symbol;
        el.style.fontSize = "40px";
        el.style.margin = "4px";
        gameArea.appendChild(el);
    }
}

function checkAnswer() {
  const answerInput = document.getElementById("answer");
  const feedback = document.getElementById("feedback");

  const userAnswer = Number(answerInput.value);

  if (Number.isNaN(userAnswer)) {
    feedback.textContent = "Kirjoita jokin numero 😊";
    return;
  }

  if (userAnswer === correctNumberForRound) {
    feedback.textContent = "Oikein! 🎉";
    score++;
    // pieni viive ja seuraava kierros
    setTimeout(newRound, 800);
  } else {
    feedback.textContent = "Ei ihan oikein, kokeile uudestaan 🙂";
  }
}

function endGame() {
  const gameArea = document.getElementById("game-area");
  const feedback = document.getElementById("feedback");
  const questionEl = document.getElementById("question");

  gameArea.innerHTML = "";
  questionEl.textContent = "Peli päättyi!";
  feedback.textContent = `Sait ${score} / ${totalRounds} oikein 👏`;

  // Halutessasi voit tässä tarjota "Pelaa uudestaan" -napin
}