const images = ["one.png", "two.png", "three.png", "four.png", "five.png", "six.png", "seven.png", "eight.png", "nine.png", "ten.png"]
const cards = document.querySelectorAll("img");
const cardState = [
    {id: "card1", flipped: false},
    {id: "card2", flipped: false}, 
    {id: "card3", flipped: false},
    {id: "card4", flipped: false},
    {id: "card5", flipped: false},
    {id: "card6", flipped: false},
    {id: "card7", flipped: false}, 
    {id: "card8", flipped: false},
    {id: "card9", flipped: false},
    {id: "card10", flipped: false},
    {id: "card11", flipped: false},
    {id: "card12", flipped: false}, 
    {id: "card13", flipped: false},
    {id: "card14", flipped: false},
    {id: "card15", flipped: false},
    {id: "card16", flipped: false},
    {id: "card17", flipped: false}, 
    {id: "card18", flipped: false},
    {id: "card19", flipped: false},
    {id: "card20", flipped: false}
]
let deck = [...images, ...images]
let flippedCards = []

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

function checkPair() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.image === card2.dataset.image) {
        console.log("löytyi pari:", card1.dataset.image);
    } else {
        console.log("Ei ollut pari");
        setTimeout(() => {
            card1.src = "./muistipeli_kuvat/back.png";
            card2.src = "./muistipeli_kuvat/back.png";

            cardState.forEach(item => {
                if (item.id === card1.id || item.id === card2.id) {
                    item.flipped = false;
                    item.image = null
                }
            })
        }, 1000)
    }

    flippedCards = [];

}

function flipCard(event) {
  const card = event.currentTarget;
  const chosenImage = card.dataset.image;
  card.src = `./muistipeli_kuvat/${chosenImage}`;

  cardState.forEach(item => {
    if (item.id === card.id) {
      item.flipped = true;
      item.image = chosenImage;
    }
  });
  flippedCards.push(card);
  
  if (flippedCards.length === 2) {
    checkPair()
  }

  console.log(cardState);
}

cards.forEach(card => {
  card.addEventListener("click", flipCard);
});
