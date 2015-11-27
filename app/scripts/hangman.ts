enum Member {Head, Torso, LeftArm, RightArm, LeftLeg, RightLeg}
class Gallows {
	bodyState: Member;
	stickman: HTMLCanvasElement;
	context: CanvasRenderingContext2D;
	
	constructor(){
		this.bodyState = Member.Head;
		this.stickman = <HTMLCanvasElement>document.getElementById("stickman");
		this.context = this.stickman.getContext('2d');
		this.context.fillStyle = "yellow";
		this.context.clearRect(0, 0, this.stickman.width, this.stickman.height);
		this.context.beginPath();
		this.drawGallows();
	}
	
	drawGallows(){
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
		this.context.moveTo(150,4);
		this.context.lineTo(150,10);
		this.context.stroke();
	}
	
	drawNextMember(){
		switch(this.bodyState){
			case Member.Head:
				this.context.beginPath();
				this.context.arc(150, 30, 20, 0, 2*Math.PI);
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
				this.context.stroke()
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
	}
}
class Game {
	mask: Array<string>;
	secret: string;
	incorrectGuesses: Array<string>;
	gallows: Gallows;
	
	constructor(secret: string){
		this.secret = secret;
		this.mask = secret.split('');
		this.gallows = new Gallows();
		this.incorrectGuesses = new Array<string>();
		
		var input: HTMLInputElement = <HTMLInputElement>document.getElementById("guess-input");
		var missesDiv: HTMLElement = document.getElementById("misses");
		var results = document.getElementById("results");
		
		missesDiv.innerHTML = "";
		results.style.display = "none";
		input.focus();
		
		this.mask = this.mask.map(function(char){
			if(char.match(/[a-z]/i)){
				return "_";
			}
			else if(char === " "){
				return "  ";
			}
			else return char;
		});
		
		var maskDiv: HTMLElement = document.getElementById("mask");
		maskDiv.innerHTML = this.mask.join(" ");
	}
	
	validateGuess(){
		var input: HTMLInputElement = <HTMLInputElement>document.getElementById("guess-input");
		var maskDiv: HTMLElement = document.getElementById("mask");
		var missesDiv: HTMLElement = document.getElementById("misses");
		
		if(this.secret.indexOf(input.value)>=0 && input.value.length===1){
			// success!!
			for(var i=0;i<this.secret.length;i++){
				var index = this.secret.indexOf(input.value, i)
				if(index>=0){
					this.mask[index] = input.value;
				}
			}
			maskDiv.innerHTML = this.mask.join(" ");
			
			if(this.mask.toString().indexOf("_")<0){
				this.showResults(true);
			}
		}
		else if(input.value.length>1){
			alert('invalid guess!');
		}
		else {
			var str = this.incorrectGuesses.join("");
			if(str.indexOf(input.value)<0){
				this.incorrectGuesses.push(input.value);
				this.gallows.drawNextMember();
				missesDiv.innerHTML = this.incorrectGuesses.toString();
				
				if(this.gallows.bodyState == Member.RightLeg+1){
					this.showResults(false);
				}
			}
		}
		input.value = "";
	}
	
	showResults(success){
		var results = document.getElementById("results");
		
		if(success){
			results.innerHTML = "You guessed it!";	
		}
		else{
			results.innerHTML = "Better luck next time :/";
		}
		results.style.display = "block"
	}
}

var game = new Game("nacho libre!");

function submitGuess(e){
	game.validateGuess();
}
function newGame(){
	game = new Game("thom yorke?");
}