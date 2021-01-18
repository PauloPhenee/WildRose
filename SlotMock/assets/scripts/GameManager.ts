import SlotEnum from '../scripts/SlotEnum';
import Aux from '../scripts/SlotEnum';

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {
	@property(cc.Node)
	machine = null;

	@property({ type: cc.AudioClip })
	audioClick = null;

	@property({ type: cc.Enum(Aux.Direction) })

	private block = false;
	private result = null;
	private winningRows = [];

	start(): void {
		this.machine.getComponent('Machine').createMachine();
	}

	update(): void {
		if (this.block && this.result != null) {
			this.informStop();
			this.result = null;
		}
	}

	//call function for when the button is pressed
	click(): void {
		cc.audioEngine.playEffect(this.audioClick, false);

		if (this.machine.getComponent('Machine').spinning === false) {
			this.block = false;
			this.machine.getComponent('Machine').spin();
			this.requestResult();
		}
		else if (!this.block) {
			this.block = true;
			this.machine.getComponent('Machine').lock();
		}
	}

	//functin that calls the actual result
	async requestResult(): Promise<void> {
		this.result = null;
		this.result = await this.getAnswer();
	}

	//randomNumber generator
	randomNumber(): number {
		let random = Math.floor(Math.random() * 30);
		(random === 30) ? 29 : random;
		return random;
	}

	//randomNumber generator that avoids a particular number
	avoidRandomNumber(number): number {
		let random = this.randomNumber();
		while (number === random) {
			random = this.randomNumber();
		}
		return random;
	}

	//sets a matching row
	getMatchingRow(number, reels): Array<number> {
		var row = [reels];
		for (var i = 0; i < reels; i++) {
			row[i] = number;
		}
		return row;
	}

	//sets a row that is not match, the for loop is to make sure if isn't an actual random match
	getUnmatchingRow(number): Array<number> {
		var row = [number, this.randomNumber(), this.randomNumber(), this.randomNumber(), this.randomNumber()];
		let allEqual = true;
		for (let i = 0; i < row.length; i += 1) {
			if (number != row[i]) {
				allEqual = false;
			}
		}
		if (allEqual) {
			number = this.avoidRandomNumber(number);
		}
		return row;
	}

	//the result is a 5x5 Array so there is room for it to enter the screen
	defineResult(): Array<Array<number>> {
		var finalResult = [];
		var leadNumbers = [];
		var numberOfReels = this.machine.getComponent('Machine')._numberOfReels;
		leadNumbers = [this.randomNumber(), this.randomNumber(), this.randomNumber(), this.randomNumber(), this.randomNumber()]
		var row0 = this.getUnmatchingRow(leadNumbers[0]);
		var row1;
		var row2;
		var row3;
		var row4 = this.getUnmatchingRow(leadNumbers[4]);
		let random = Math.random();
		if (random <= 0.07) {
			row1 = this.getMatchingRow(leadNumbers[1], numberOfReels);
			row2 = this.getMatchingRow(leadNumbers[2], numberOfReels);
			row3 = this.getMatchingRow(leadNumbers[3], numberOfReels);
			this.winningRows = [1, 2, 3];
		}
		else if (random <= 0.17) {
			let chance = Math.random();
			row1 = this.getMatchingRow(leadNumbers[1], numberOfReels);
			row2 = this.getMatchingRow(leadNumbers[2], numberOfReels);
			row3 = this.getMatchingRow(leadNumbers[3], numberOfReels);
			if (chance <= 0.33) {
				row1 = this.getUnmatchingRow(leadNumbers[1]);
				this.winningRows = [2, 3];
			}
			else if (chance <= 0.66) {
				row2 = this.getUnmatchingRow(leadNumbers[2]);
				this.winningRows = [1, 3];
			}
			else {
				row3 = this.getUnmatchingRow(leadNumbers[3]);
				this.winningRows = [1, 2];
			}
		}
		else if (random <= 0.50) {
			let chance = Math.random();
			row1 = this.getUnmatchingRow(leadNumbers[1]);
			row2 = this.getUnmatchingRow(leadNumbers[2]);
			row3 = this.getUnmatchingRow(leadNumbers[3]);
			if (chance <= 0.33) {
				row1 = this.getMatchingRow(leadNumbers[1], numberOfReels);
				this.winningRows = [1];
			}
			else if (chance <= 0.66) {
				row2 = this.getMatchingRow(leadNumbers[2], numberOfReels);
				this.winningRows = [2];
			}
			else {
				row3 = this.getMatchingRow(leadNumbers[3], numberOfReels);
				this.winningRows = [3];
			}
		}
		else {
			row1 = this.getUnmatchingRow(leadNumbers[1]);
			row2 = this.getUnmatchingRow(leadNumbers[2]);
			row3 = this.getUnmatchingRow(leadNumbers[3]);
			this.winningRows = [];
		}
		//rows become collumn for better tranfer to the reels (reel 0 will receive the element 0 of each row)
		finalResult = [
			[row0[0], row1[0], row2[0], row3[0], row4[0]],
			[row0[1], row1[1], row2[1], row3[1], row4[1]],
			[row0[2], row1[2], row2[2], row3[2], row4[2]],
			[row0[3], row1[3], row2[3], row3[3], row4[3]],
			[row0[4], row1[4], row2[4], row3[4], row4[4]],
			[row0[5], row1[5], row2[5], row3[5], row4[5]],
		]
		this.machine.getComponent('Machine').winningRows = this.winningRows;
		return finalResult;
	}

	//returns the sequence
	getAnswer(): Promise<Array<Array<number>>> {
		var slotResult = this.defineResult();
		var promise = new Promise<Array<Array<number>>>
			(resolve => { setTimeout(() => { resolve(slotResult); }, 1000 + 500 * Math.random()); });
		return promise;
	}

	//debuging tool
	debugLog(string): any {
		console.log(string);
	}

	//transfers result to the machine 
	informStop(): void {
		const resultRelayed = this.result;
		this.machine.getComponent('Machine').stop(resultRelayed);
	}
}
