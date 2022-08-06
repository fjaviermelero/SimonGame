initializePressLogic();

let inputs = [];
let sequence = [];
let level = 0;
let fail = false;

document.addEventListener("keydown", function startGame(event) {
    if (event.key === "a" && level === 0) {
        addLevel();
    }
})

document.addEventListener("click", step)

function step() {

    if (level > 0) {
        for (let i = 0; i < inputs.length; i++) {
            if (sequence[i] !== inputs [i]) {
                youLost();
            }
        }
        if (sequence.length === inputs.length && level > 0) {
            setTimeout(function () {
                    addLevel()
                }
                , 1000)
        }
    }

}

function youLost() {
    inputs = [];
    sequence = [];
    level = 0;
    fail = false;

    document.querySelector("body").classList.add("game-over");

    setTimeout(function () {
            document.querySelector("body").classList.remove("game-over");
        }
        , 200);

    playSound("wrong");

    document.getElementById("level-title").textContent = "You failed, press A to play again";
}

function addLevel() {
    inputs = [];
    sequence.push(getNextColor());
    reproducePress(sequence[level]);
    level++;
    document.getElementById("level-title").textContent = "Level " + level;
}

function reproducePress(color) {
    switch (color) {

        case "green":
            document.getElementById("green").classList.add("pressed");

            setTimeout(function () {
                    document.getElementById("green").classList.remove("pressed");
                }
                , 300);
            playSound("green");
            break;

        case "red":
            document.getElementById("red").classList.add("pressed");

            setTimeout(function () {
                    document.getElementById("red").classList.remove("pressed");
                }
                , 300);
            playSound("red");
            break;

        case "yellow":
            document.getElementById("yellow").classList.add("pressed");

            setTimeout(function () {
                    document.getElementById("yellow").classList.remove("pressed");
                }
                , 300);
            playSound("yellow");
            break;

        case "blue":
            document.getElementById("blue").classList.add("pressed");

            setTimeout(function () {
                    document.getElementById("blue").classList.remove("pressed");
                }
                , 300);
            playSound("blue");
            break;
    }
}

function getNextColor() {

    let randomNumber = randomIntFromInterval(1, 4);

    switch (randomNumber) {

        case 1:
            return "green";

        case 2:
            return "red";

        case 3:
            return "yellow";

        case 4:
            return "blue";
    }

}

function initializePressLogic() {

    let buttons = document.getElementsByClassName("btn");
    for (button of buttons) {

        button.addEventListener("mousedown", function (event) {
            inputs.push(this.id);
            this.classList.add("pressed");
            playSound(this.id);
        })

        button.addEventListener("mouseup", function (event) {
            this.classList.remove("pressed");
        })
    }
}

function playSound(color) {

    switch (color) {
        case "green":
            var audio = new Audio('sounds/green.mp3');
            audio.play();
            break;

        case "red":
            var audio = new Audio('sounds/red.mp3');
            audio.play();
            break;

        case "yellow":
            var audio = new Audio('sounds/yellow.mp3');
            audio.play();
            break;

        case "blue":
            var audio = new Audio('sounds/blue.mp3');
            audio.play();
            break;

        case "wrong":
            var audio = new Audio('sounds/wrong.mp3');
            audio.play();
            break;
    }
}

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}