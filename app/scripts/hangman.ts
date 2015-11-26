class Guess {
	success: boolean;
	value: string;
	constructor(success: boolean, letter: string){
		this.success = success;
		this.value = letter;
	}
}
enum Member {Head, Torso, LeftArm, RightArm, LeftLeg, RightLeg}
class Gallows {
	bodyState: Member;
	gallowsDiv: HTMLElement;
	constructor(){
		this.gallowsDiv = document.getElementById("gallows");
	}
	
	drawNextMember(){
		if(this.bodyState<Member.RightLeg){
			this.bodyState = this.bodyState + 1;
		}
	}
}
class Game {
	mask: Array<string>;
	secret: string;
	guesses: Array<Guess>;
	gallows: Gallows;
	
	constructor(secret: string, guesses: Array<Guess> = null){
		this.secret = secret;
		this.mask = secret.split('');
		this.guesses = guesses;
		this.mask = this.mask.map(function(char){
			if(char.match(/[a-z]/i)){
				return "_";
			}
			else if(char===" "){return "  ";}
			else return char;
		});
	}
	
	validateGuess(){
		var input: HTMLInputElement = <HTMLInputElement>document.getElementById("guess-input");
		var maskDiv: HTMLElement = document.getElementById("mask");
		var missesDiv: HTMLElement = document.getElementById("misses");
	
		if(this.secret.indexOf(input.value)>=0 && input.value.length===1){
			// success!!
			for(var i=0;i<this.secret.length;i++){
				var index = this.secret.indexOf(input.value, i)
				if(index>0){
					this.mask[index] = input.value;
				}
			}
			maskDiv.innerHTML = this.mask.join(" ");
		}
		else if(input.value.length!==1){
			alert('invalid guess!');
		}
		else{
			this.gallows.drawNextMember();
			missesDiv.innerHTML = missesDiv.innerHTML.concat(input.value);
		}
		input.value = "";
	}
}
var game = new Game("nacho libre!");
function submitGuess(){
	game.validateGuess();
}
function newGame(){
	game = new Game("thom yorke?");
}