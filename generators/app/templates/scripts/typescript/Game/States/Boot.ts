module Game.States {
	export class Boot extends Phaser.State {
		constructor() {
			super();
		}

		create() {
			this.game.stage.backgroundColor = '#CCC';

			this.game.time.advancedTiming = true;

			this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.game.scale.parentIsWindow = true;

			this.game.scale.pageAlignHorizontally = true;
			this.game.scale.pageAlignVertically = true;

			this.game.state.start('preload', true, false);
		}
	}
}
