import Aux from '../SlotEnum';
import Tile from './Tile';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Reel extends cc.Component {
	@property({ type: cc.Node })
	public reelAnchor = null;

	@property({ type: cc.Enum(Aux.Direction) })
	public spinDirection = Aux.Direction.Down;

	@property({ type: [cc.Node], visible: false })
	private tiles = [];

	@property({ type: cc.Prefab })
	public _tilePrefab = null;

	@property({ type: cc.Prefab })
	get tilePrefab(): cc.Prefab {
		return this._tilePrefab;
	}

	set tilePrefab(newPrefab: cc.Prefab) {
		this._tilePrefab = newPrefab;
		this.reelAnchor.removeAllChildren();
		this.tiles = [];

		if (newPrefab !== null) {
			this.createReel();
			this.shuffle();
		}
	}

	private result: Array<number> = [];

	public stopSpinning = false;

	//Start 1 - creates the reel and populate them
	createReel(): void {
		let newTile: cc.Node;
		for (let i = 0; i < 5; i += 1) {

			newTile = cc.instantiate(this.tilePrefab);
			this.reelAnchor.addChild(newTile);
			this.tiles[i] = newTile;

		}
	}

	//Start 2 - sets tiles as random and not glowing
	shuffle(): void {
		for (let i = 0; i < this.tiles.length; i += 1) {
			this.tiles[i].getComponent('Tile').setRandom();
			this.tiles[i].getComponent('Tile').SetGlow(false);
		}
	}

	//Gets the predefined result and populate them on the right direction
	readyStop(newResult: Array<number>): void {
		const check = this.spinDirection === Aux.Direction.Down || newResult == null;
		this.result = check ? newResult : newResult.reverse();
		this.stopSpinning = true;
	}

	//Changes tile if it reached the border, setting new position and new animal
	changeCallback(element: cc.Node = null): void {
		const el = element;
		const dirModifier = this.spinDirection === Aux.Direction.Down ? -1 : 1;
		if (el.position.y * dirModifier > 288) {
			el.position = cc.v3(0, -288 * dirModifier, 0);

			let pop = null;
			if (this.result != null && this.result.length > 0) {
				pop = this.result.pop();
			}
			if (pop != null && pop >= 0) {
				el.getComponent('Tile').setTile(pop);
			}
			else {
				el.getComponent('Tile').setRandom();
			}
		}
	}

	//Gets checked if it is time to stop, otherwise spins again
	checkEndCallback(element: cc.Node = null): void {
		const el = element;
		if (this.stopSpinning) {
			this.getComponent(cc.AudioSource).play();
			this.doStop(el);
		}
		else {
			this.doSpinning(el);
		}
	}

	//Starts the spin
	doSpin(windUp: number): void {
		this.stopSpinning = false;
		this.reelAnchor.children.forEach(element => {
			const dirModifier = this.spinDirection === Aux.Direction.Down ? -1 : 1;

			const delay = cc.tween(element).delay(windUp);
			const start = cc.tween(element).by(0.25, { position: cc.v2(0, 144 * dirModifier) }, { easing: 'backIn' });
			const doChange = cc.tween().call(() => this.changeCallback(element));
			const callSpinning = cc.tween(element).call(() => this.doSpinning(element, 5));

			delay
				.then(start)
				.then(doChange)
				.then(callSpinning)
				.start();
		});
	}

	//Spin Loop, goes on until receives the Stop
	doSpinning(element: cc.Node = null, times = 1): void {
		const dirModifier = this.spinDirection === Aux.Direction.Down ? -1 : 1;

		const move = cc.tween().by(0.04, { position: cc.v2(0, 144 * dirModifier) });
		const doChange = cc.tween().call(() => this.changeCallback(element));
		const repeat = cc.tween(element).repeat(times, move.then(doChange));
		const checkEnd = cc.tween().call(() => this.checkEndCallback(element));

		repeat.then(checkEnd).start();
	}

	//Final loop with a bouce effect when it stops
	doStop(element: cc.Node = null): void {
		const dirModifier = this.spinDirection === Aux.Direction.Down ? -1 : 1;

		const move = cc.tween(element).by(0.04, { position: cc.v3(0, 144 * dirModifier, 0) });
		const doChange = cc.tween().call(() => this.changeCallback(element));
		const up = cc.tween(element).by(0.2, { position: cc.v3(0, 50 * dirModifier, 0) }, { easing: 'bounceOut' });
		const down = cc.tween(element).by(0.2, { position: cc.v3(0, 50 * dirModifier * -1, 0) }, { easing: 'bounceOut' });

		move
			.then(doChange)
			.then(move)
			.then(doChange)
			.then(move)
			.then(doChange)
			.then(up)
			.then(down)
			.start();
	}

	//Used by the Celebrate Win to locate the tiles that should glow
	getTileByPosition(position): Tile {
		var tile;
		var newPosition = (position - 2) * -144;
		for (var i = 0; i < this.tiles.length; i += 1) {
			var thisNode = this.tiles[i];
			if (thisNode.position.y === newPosition) {
				tile = this.tiles[i].getComponent('Tile');
			}
		}
		return tile;
	}

	//Debugging tool
	debugLog(string): any {
		console.log(string);
	}
}
