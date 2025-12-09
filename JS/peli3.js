const images = ["one.png", "two.png", "three.png", "four.png", "five.png", "six.png", "seven.png", "eight.png", "nine.png", "ten.png"]

const cardContainer = document.getElementById("cards");
const totalCards = 20;

for (let i = 1; i <= totalCards; i++) {
  const card = document.createElement("img");
  card.id = `card${i}`;
  card.src = "./peli3_kuvat/back.png";
  card.alt = "kortti";
  cardContainer.appendChild(card)
}

const cards = document.querySelectorAll("img");

const cardState = Array.from({ length: 20 }, (_, i) => ({
  id: `card${i + 1}`,
  flipped: false
}));

const feedback = document.getElementById("feedback");

let deck = [...images, ...images]
let flippedCards = []
let lockBoard = false;
let startTime = null;
let timerInterval = null
let endTime = null

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

deck = shuffle(deck)

cards.forEach((card, index) => {
  card.dataset.image = deck[index];
});

function startTimer() {
  if (timerInterval) return;
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  const points = calculatePoints(elapsed);

  document.getElementById("status").textContent =
    `Aika: ${minutes}:${seconds.toString().padStart(2, "0")} | Pisteet: ${points}`;
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function calculatePoints(elapsedSeconds) {
    if (elapsedSeconds < 40) return 10;
        else if (elapsedSeconds < 45) return 9;
        else if (elapsedSeconds < 50) return 8;
        else if (elapsedSeconds < 55) return 7;
        else if (elapsedSeconds < 60) return 6;
        else if (elapsedSeconds < 65) return 5;
        else if (elapsedSeconds < 70) return 4;
        else if (elapsedSeconds < 75) return 3;
        else if (elapsedSeconds < 80) return 2;
        else return 1;

}

function checkPair() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.image === card2.dataset.image) {
        flippedCards = [];
        lockBoard = false
    } else {
        setTimeout(() => {
            card1.src = "./peli3_kuvat/back.png";
            card2.src = "./peli3_kuvat/back.png";

            cardState.forEach(item => {
                if (item.id === card1.id || item.id === card2.id) {
                    item.flipped = false;
                    item.image = null
                }
            })

            flippedCards = []
            lockBoard = false
        }, 1000)
    }

}

function flipCard(event) {

  if (lockBoard) return;  

  if (!startTime) {
    startTimer();
  }

  const card = event.currentTarget;

  if (cardState.find(item => item.id === card.id && item.flipped)) {
    return;
  }

  const chosenImage = card.dataset.image;
  card.src = `./peli3_kuvat/${chosenImage}`;

  cardState.forEach(item => {
    if (item.id === card.id) {
      item.flipped = true;
      item.image = chosenImage;
    }
  });

  flippedCards.push(card);
  
  if (flippedCards.length === 2) {
    lockBoard = true
    checkPair()
  } 
  
  if (cardState.every(item => item.flipped)) {
    stopTimer();
    endTime = Date.now();
    const elapsed = Math.floor((endTime - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;

    const points = calculatePoints(elapsed);

    sessionStorage.setItem('peli3Points', points)

  
  }

}

cards.forEach(card => {
  card.addEventListener("click", flipCard);
});


