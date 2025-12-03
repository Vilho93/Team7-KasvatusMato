
var rows = 5;
var columns = 5;

var firstTile = null;
var turns = 0;

window.onload = function() {
    // Luo pelilauta
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.src = "./peli5_images/blank.png";
            tile.addEventListener("click", selectTile);
            document.getElementById("board").append(tile);
        }
    }

    // Luo palat
    let pieces = [];
    for (let i = 1; i <= rows * columns; i++) {
        pieces.push(i.toString());
    }

    // Sekoita palat
    for (let i = 0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);
        [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
    }

    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = "./peli5_images/" + pieces[i] + ".png";
        tile.addEventListener("click", selectTile);
        document.getElementById("pieces").append(tile);
    }
}

function selectTile() {
    if (firstTile === null) {
        // Ensimmäinen valinta
        firstTile = this;
        this.style.border = "2px solid red"; // Visuaalinen merkki
    } else {
        // Toinen valinta -> vaihdetaan kuvat
        let secondTile = this;

        // Estä sama tile
        if (firstTile === secondTile) {
            firstTile.style.border = "none";
            firstTile = null;
            return;
        }

        // Vaihda kuvat
        let tempSrc = firstTile.src;
        firstTile.src = secondTile.src;
        secondTile.src = tempSrc;

        // Nollaa valinta
        firstTile.style.border = "none";
        firstTile = null;

        // Päivitä siirrot
        turns++;
        document.getElementById("turns").innerText = turns;
    }
}