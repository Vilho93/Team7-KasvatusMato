
var rows = 3;
var columns = 3;

var selectedTile = null;
var turns = 0;

var imgOrder = ["4", "2", "8", "5", "1", "6", "7", "3", "9"];

window.onload = function() {
  const board = document.getElementById("board");

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const tile = document.createElement("img");
      tile.id = `${r}-${c}`;
      tile.src = "peli5_images/" + imgOrder.shift() + ".jpg"; // ✅ polku päivitetty
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

function onTileClick(e) {
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

  highlight(selectedTile, false);
  selectedTile = null;
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
