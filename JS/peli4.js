
const shapes = [
    { name: "Ympyrä", file: "ympyrä.png" },
    { name: "Neliö", file: "neliö.png" },
    { name: "Kolmio", file: "kulmio.png" },
    { name: "Suorakulmio", file: "suorakulmio.png" },
    { name: "Tähti", file: "tähti.png" },
    { name: "Sydän", file: "sydän.png" },
    { name: "Viisikulmio", file: "Viisikulmio.png" },
    { name: "Soikio", file: "Soikio.png" }
];
const shapeOrder = [...shapes].sort(() => Math.random() - 0.5);

let score = 0, currentShape = null, gameActive = true;
let roundsPlayed = 0;
const MAX_ROUNDS = shapes.length; //8 kertaa pelattu

function loadNewShape() {

    if (roundsPlayed >= MAX_ROUNDS) {
        endGame();
        return;
    }

    gameActive = true;

    // yksi muoto per kerros per kierros
    currentShape = shapeOrder[roundsPlayed];
    roundsPlayed++;

    document.getElementById("shape-name").textContent = currentShape.name;
    document.getElementById("message").textContent = "";
    document.getElementById("message").className = "message";
    document.getElementById("next-btn").style.display = "none";
    
    const wrongShapes = shapes
        .filter(s => s.name !== currentShape.name)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

    const allShapes = [currentShape, ...wrongShapes].sort(() => Math.random() - 0.5);
    
    const container = document.getElementById("shapes-container");
    container.innerHTML = "";
    allShapes.forEach(shape => {
        const img = document.createElement("img");
        img.src = `peli4-kuvat/${shape.file}`;
        img.className = "shape-img";
        img.alt = shape.name;
        img.onclick = () => checkAnswer(shape.name, img);
        container.appendChild(img);
    });
}


function checkAnswer(selectedName, imgElement) {
    if (!gameActive) return;
    gameActive = false;
    const allImages = document.querySelectorAll(".shape-img");
    
    if (selectedName === currentShape.name) {
    score++;
    document.getElementById("score").textContent = score;

    sessionStorage.setItem('peli4Points', score);

    document.getElementById("message").textContent = "Oikein! 🎉";
    document.getElementById("message").className = "message correct";
    imgElement.classList.add("correct");
} else {

        document.getElementById("message").textContent = "Väärin! 😔";
        document.getElementById("message").className = "message wrong";
        imgElement.classList.add("wrong");
        allImages.forEach(img => img.alt === currentShape.name && img.classList.add("correct"));
    }
    
    allImages.forEach(img => {
        img.classList.add("disabled");
        img.onclick = null;
    });
    document.getElementById("next-btn").style.display = "block";
}

function endGame() {
    gameActive = false;

    const messageEl = document.getElementById("message");
    messageEl.textContent = `Peli loppui! Sait ${score} / ${MAX_ROUNDS} pistettä.`;
    messageEl.className = "message final";

    // Estetään klikkaukset
    const allImages = document.querySelectorAll(".shape-img");
    allImages.forEach(img => {
        img.classList.add("disabled");
        img.onclick = null;
    });

    // Piilotetaan "Seuraava" -nappi
    document.getElementById("next-btn").style.display = "none";

    // Tallennetaan lopullinen pistemäärä pisteet-sivua varten
    sessionStorage.setItem('peli4Points', score);
}

document.getElementById("next-btn").onclick = loadNewShape;
loadNewShape();

