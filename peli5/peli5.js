
var rows = 5;
var columns = 5;

const correctOrder = Array.from({ length: rows * columns }, (_, i) => rows * columns - i);

var selectedTile = null;
var turns = 0;
var score = 10; // maksimi

var imgOrder = ["19", "4", "17", "10", "20", "18", "2", "11", "12", "8", "21", "5", "22", "15", "1", "6", "13","23", "7", "3", "24", "14", "16", "25", "9"];

window.onload = function() {
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
  const board = document.getElementById("board");

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const tile = document.createElement("img");
      tile.id = `${r}-${c}`;
      tile.src = "peli5_images/" + imgOrder.shift() + ".png";
      tile.alt = "Pala";

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

  score = calculateScore(turns);
  document.getElementById("score").innerText = score;

  highlight(selectedTile, false);
  selectedTile = null;

  if (checkWin()) {
    sessionStorage.setItem('peli5_score', String(score));
    openWinDialog(turns, score);
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
    const fileName = tiles[i].src.split("/").pop(); 
    if (fileName !== correctOrder[i] + ".png") {
      return false;
    }
  }
  return true;
}

let lastFocusedBeforeDialog = null;

function openWinDialog(turns, score) {
  const dialog = document.getElementById("win-dialog");
  const msgEl = document.getElementById("win-message");
  const restartBtn = document.getElementById("win-restart");
  const closeBtn = document.getElementById("win-close");

  if (!dialog || !msgEl || !restartBtn || !closeBtn) {
    console.warn("Voittodialogin elementtejä ei löytynyt.");
    return;
  }

  msgEl.textContent = `Onneksi olkoon. Ratkaisit palapelin ${turns} siirrolla! Pisteesi: ${score}/10.`;

  lastFocusedBeforeDialog = document.activeElement;

  dialog.classList.remove("is-hidden");
  document.body.classList.add("modal-open");

  restartBtn.focus();

  restartBtn.onclick = () => {
    closeWinDialog();
    resetGame();
  };
  closeBtn.onclick = () => closeWinDialog();

  dialog.onkeydown = (e) => {
    if (e.key === "Escape") { e.preventDefault(); closeWinDialog(); }
  };

  trapFocus(dialog);
}

function closeWinDialog() {
  const dialog = document.getElementById("win-dialog");
  if (!dialog) return;
  dialog.classList.add("is-hidden");
  document.body.classList.remove("modal-open");

  if (lastFocusedBeforeDialog && typeof lastFocusedBeforeDialog.focus === "function") {
    lastFocusedBeforeDialog.focus();
  }
}

function trapFocus(container) {
  const focusable = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (focusable.length === 0) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  container.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

function resetGame() {
  turns = 0;
  score = 10;
  document.getElementById("turns").innerText = turns;
  document.getElementById("score").innerText = score;

  const total = rows * columns;
  const newOrder = Array.from({ length: total }, (_, i) => String(i + 1));
  for (let i = newOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newOrder[i], newOrder[j]] = [newOrder[j], newOrder[i]];
  }

  const tiles = document.querySelectorAll("#board img");
  tiles.forEach((tile, idx) => {
    tile.src = "peli5_images/" + newOrder[idx] + ".png";
    tile.alt = `Pala ${newOrder[idx]}`;
  });
}

