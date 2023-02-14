import {RollData} from "./modules/roll-data.js";
import {save, load, isSaved} from "./modules/local-storage.js";

// preload dice image files to reduce flickering
let images = [];
for (let i = 1; i <= 6; i++) {
    let image = new Image();
    image.src = dieImageSrc(i);
    images.push(image);
}

function dieImageSrc(side) {
    return `images/dice/side_${side}.png`;
}

let $select; // select tag to input the number of dice
let $dice; // tag to contain the image tags
let $total; // tag for the displayed number

$(document).ready(function () {
    $select = $("select");
    $dice = $("#dice_images");
    $total = $(".total_number");
    if (isSaved()) {
        console.log("loading saved data from local storage");
        let rollData = load();
        $select.val(rollData.numberOfDice);
        displayRollData(rollData);
    }

    handleRollButtonClicks();
});

function displayRollData(rollData) {
    updateImages(rollData);
    updateTotal(rollData);
}

function updateImages(rollData) {
    $dice.empty();
    for (let value of rollData.values) {
        let src = dieImageSrc(value);
        $dice.append(`<img src="${src}" alt="side ${value}">`);
    }
}

function updateTotal(rollData) {
    $total.text(rollData.total);
}

function handleRollButtonClicks() {
    $("#roll_button").click(function () {
        console.log("the click event handler is called");
        requestRollData(parseInt($select.val()))
    });
}

function requestRollData(numberOfDice) {
    console.log(`requesting roll data for numberOfDice = ${numberOfDice}`)
    $.getJSON("/api/roll-dice", {numberOfDice: numberOfDice}, function (data) {
        let rollData = new RollData(data.values, data.total, data.numberOfDice)
        console.log(rollData);
        displayRollData(rollData);
        save(rollData);
    })
}


