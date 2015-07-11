module Game.States {
	export class Preload extends Phaser.State {
		constructor() {
			super();
		}

		preload() {
			this.game.load.image('yeoman', 'images/yeoman.png');
		}

		create() {
			this.game.state.start('mainmenu');
		}
	}
}
