var Guess = (function () {
    function Guess(success, letter) {
        this.success = success;
        this.value = letter;
    }
    return Guess;
})();
var Member;
(function (Member) {
    Member[Member["Head"] = 0] = "Head";
    Member[Member["Torso"] = 1] = "Torso";
    Member[Member["LeftArm"] = 2] = "LeftArm";
    Member[Member["RightArm"] = 3] = "RightArm";
    Member[Member["LeftLeg"] = 4] = "LeftLeg";
    Member[Member["RightLeg"] = 5] = "RightLeg";
})(Member || (Member = {}));
var Gallows = (function () {
    function Gallows() {
        this.gallowsDiv = document.getElementById("gallows");
    }
    Gallows.prototype.drawNextMember = function () {
        if (this.bodyState < Member.RightLeg) {
            this.bodyState = this.bodyState + 1;
        }
    };
    return Gallows;
})();
var Game = (function () {
    function Game(secret, guesses) {
        if (guesses === void 0) { guesses = null; }
        this.secret = secret;
        this.mask = secret.split('');
        this.guesses = guesses;
        this.mask = this.mask.map(function (char) {
            if (char.match(/[a-z]/i)) {
                return "_";
            }
            else if (char === " ") {
                return "  ";
            }
            else
                return char;
        });
    }
    Game.prototype.validateGuess = function () {
        var input = document.getElementById("guess-input");
        var maskDiv = document.getElementById("mask");
        var missesDiv = document.getElementById("misses");
        if (this.secret.indexOf(input.value) >= 0 && input.value.length === 1) {
            // success!!
            for (var i = 0; i < this.secret.length; i++) {
                var index = this.secret.indexOf(input.value, i);
                if (index > 0) {
                    this.mask[index] = input.value;
                }
            }
            maskDiv.innerHTML = this.mask.join(" ");
        }
        else if (input.value.length !== 1) {
            alert('invalid guess!');
        }
        else {
            this.gallows.drawNextMember();
            missesDiv.innerHTML = missesDiv.innerHTML.concat(input.value);
        }
        input.value = "";
    };
    return Game;
})();
var game = new Game("nacho libre!");
function submitGuess() {
    game.validateGuess();
}
function newGame() {
    game = new Game("thom yorke?");
}
