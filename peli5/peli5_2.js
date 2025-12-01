var rows = 5;
var columns = 5;

var currTile;
var otherTile;

var turns = 0;

window.onload = function() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.src = "./peli5_images/blank.png";

            document.getElementById("board").append(tile);
        }
    }

    let pieces = [];
    for (let i=1; i <= rows*columns; i++) {
        pieces.push(i.toString());
    }

    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = "./peli5_images/" + pieces[i] + ".png";
        this.document.getElementById("pieces").append(tile);
    }
}