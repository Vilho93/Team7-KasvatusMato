const cards = document.querySelectorAll("img");
const cardState = [{id: "heart", flipped: false}, {id: "star", flipped: false}]

function flipCard(event) {
    const card = event.currentTarget;
    card.src = `./muistipeli_kuvat/${card.id}.png`;
    cardState.forEach(item => {
        if (item.id === card.id) {
            item.flipped = true
        }
    })
     console.log(cardState);
}

cards.forEach(card => {
    card.addEventListener("click", flipCard);
    
});

