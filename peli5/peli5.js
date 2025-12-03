
var rows = 5;
var columns = 5;

const correctOrder = Array.from({ length: rows * columns }, (_, i) => rows * columns - i);

var selectedTile = null;
var turns = 0;
var score = 10; // maksimi pisteet

var imgOrder = ["19", "4", "17", "10", "20", "18", "2", "11", "12", "8", "21", "5", "22", "15", "1", "6", "13","23", "7", "3", "24", "14", "16", "25", "9"];

window.onload = function() {
  const board = document.getElementById("board");

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const tile = document.createElement("img");
      tile.id = `${r}-${c}`;
      tile.src = "peli5_images/" + imgOrder.shift() + ".png";
      tile.alt = "Palapala";

      tile.setAttribute("role", "button");
      tile.setAttribute("tabindex", "0");

      tile.addEventListener("click", onTileClick);
      tile.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onTileClick.call(this, e);
        }
      });

      board.appendChild(tile);
    }
  }
};

function onTileClick() {
  const clicked = this;

  if (!selectedTile) {
    selectedTile = clicked;
    highlight(selectedTile, true);
    return;
  }

  if (selectedTile === clicked) {
    highlight(selectedTile, false);
    selectedTile = null;
    return;
  }

  swapImages(selectedTile, clicked);
  turns += 1;
  document.getElementById("turns").innerText = turns;

  // Laske pisteet porrastetusti
  score = calculateScore(turns);
  document.getElementById("score").innerText = score;

  highlight(selectedTile, false);
  selectedTile = null;

  if (checkWin()) {
    alert(`Voitit pelin ${turns} siirrolla! Pisteesi: ${score}/10`);
  }
}

function swapImages(tileA, tileB) {
  const tmp = tileA.src;
  tileA.src = tileB.src;
  tileB.src = tmp;
}

function highlight(tile, on) {
  tile.style.outline = on ? "3px solid #2a9d8f" : "";
  tile.style.boxShadow = on ? "0 0 0 3px rgba(42,157,143,0.3)" : "";
}

function calculateScore(turns) {
  if (turns < 30) return 10;
  if (turns < 40) return 8;
  if (turns < 50) return 6;
  if (turns < 60) return 4;
  if (turns < 70) return 2;
  return 0;
}

function checkWin() {
  const tiles = document.querySelectorAll("#board img");
  for (let i = 0; i < tiles.length; i++) {
    const fileName = tiles[i].src.split("/").pop(); // esim. "1.png"
    if (fileName !== correctOrder[i] + ".png") {
      return false;
    }
  }
  return true;
}
