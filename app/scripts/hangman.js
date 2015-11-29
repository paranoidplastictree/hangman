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
        this.bodyState = Member.Head;
        this.stickman = document.getElementById("stickman");
        this.context = this.stickman.getContext('2d');
        this.context.fillStyle = "yellow";
        this.context.clearRect(0, 0, this.stickman.width, this.stickman.height);
        this.context.beginPath();
        this.drawGallows();
    }
    Gallows.prototype.drawGallows = function () {
        // base
        this.context.moveTo(50, 140);
        this.context.lineTo(90, 140);
        this.context.stroke();
        // upright
        this.context.moveTo(70, 140);
        this.context.lineTo(70, 4);
        this.context.stroke();
        // horizontal beam
        this.context.moveTo(70, 4);
        this.context.lineTo(150, 4);
        this.context.stroke();
        // noose
        this.context.moveTo(150, 4);
        this.context.lineTo(150, 10);
        this.context.stroke();
    };
    Gallows.prototype.drawNextMember = function () {
        switch (this.bodyState) {
            case Member.Head:
                this.context.beginPath();
                this.context.arc(150, 30, 20, 0, 2 * Math.PI);
                this.context.closePath();
                this.context.fill();
                this.context.stroke();
                break;
            case Member.Torso:
                this.context.moveTo(150, 50);
                this.context.lineTo(150, 100);
                this.context.stroke();
                break;
            case Member.LeftArm:
                this.context.moveTo(150, 60);
                this.context.lineTo(200, 70);
                this.context.stroke();
                break;
            case Member.RightArm:
                this.context.moveTo(150, 60);
                this.context.lineTo(100, 70);
                this.context.stroke();
                break;
            case Member.LeftLeg:
                this.context.moveTo(150, 100);
                this.context.lineTo(200, 120);
                this.context.stroke();
                break;
            case Member.RightLeg:
                this.context.moveTo(150, 100);
                this.context.lineTo(100, 120);
                this.context.stroke();
                break;
            default:
                break;
        }
        this.bodyState = this.bodyState + 1;
    };
    return Gallows;
})();
var RandomWordGenerator = (function () {
    function RandomWordGenerator() {
    }
    RandomWordGenerator.prototype.getRandomWord = function (callback, wordLength) {
        if (wordLength === void 0) { wordLength = 0; }
        if (wordLength === 0) {
            wordLength = this.getRandomInt(3, 8);
        }
        var requestUrl = "http://randomword.setgetgo.com/get.php?len=" + wordLength;
        this.httpGetAsync(requestUrl, callback);
    };
    RandomWordGenerator.prototype.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    RandomWordGenerator.prototype.httpGetAsync = function (theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        };
        xmlHttp.open("GET", theUrl, true); // true for asynchronous 
        xmlHttp.send(null);
    };
    return RandomWordGenerator;
})();
var Game = (function () {
    function Game() {
        var input = document.getElementById("guess-input");
        var missesDiv = document.getElementById("misses");
        var results = document.getElementById("results");
        this.gallows = new Gallows();
        this.incorrectGuesses = new Array();
        this.wordGenerator = new RandomWordGenerator();
        this.wordGenerator.getRandomWord(this.getSecret);
        missesDiv.innerHTML = "";
        results.style.display = "none";
        input.focus();
    }
    Game.prototype.getSecret = function (data) {
        this.secret = data;
        this.mask = this.secret.split('');
        this.mask = this.mask.map(function (char) {
            if (char.match(/[a-z]/i)) {
                return "_";
            }
            else
                return char;
        });
        var maskDiv = document.getElementById("mask");
        maskDiv.innerHTML = this.mask.join(" ");
    };
    Game.prototype.validateGuess = function () {
        var input = document.getElementById("guess-input");
        var maskDiv = document.getElementById("mask");
        var missesDiv = document.getElementById("misses");
        if (this.secret != undefined && this.secret.indexOf(input.value) >= 0 && input.value.length === 1) {
            // match found!
            for (var i = 0; i < this.secret.length; i++) {
                var index = this.secret.indexOf(input.value, i);
                if (index >= 0) {
                    this.mask[index] = input.value;
                }
            }
            maskDiv.innerHTML = this.mask.join(" ");
            if (this.mask.toString().indexOf("_") < 0) {
                this.showResults(true);
            }
        }
        else if (input.value.length > 1) {
            alert('invalid guess!');
        }
        else {
            var str = this.incorrectGuesses.join("");
            if (str.indexOf(input.value) < 0) {
                this.incorrectGuesses.push(input.value);
                this.gallows.drawNextMember();
                missesDiv.innerHTML = this.incorrectGuesses.toString();
                if (this.gallows.bodyState == Member.RightLeg + 1) {
                    this.showResults(false);
                }
            }
        }
        input.value = "";
    };
    Game.prototype.showResults = function (success) {
        var results = document.getElementById("results");
        if (success) {
            results.innerHTML = "You guessed it!";
        }
        else {
            results.innerHTML = "You lose. Better luck next time :/";
            var maskDiv = document.getElementById("mask");
            maskDiv.innerHTML = this.secret;
        }
        results.style.display = "block";
    };
    return Game;
})();
var game = new Game();
function submitGuess(e) {
    game.validateGuess();
}
function newGame() {
    game = new Game();
}
