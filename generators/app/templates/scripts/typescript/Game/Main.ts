module Game {
	export class Main extends Phaser.Game {
		constructor(element) {
			super(
				<%= appResolution.width %>,
				<%= appResolution.height %>,
				Phaser.AUTO,
				element
			);

			for (var state in Game.KnownStates) {
				this.state.add(state, Game.States[Game.KnownStates[state]]);
			}
		}

		startup() {
			this.state.start('boot');
		}
	}
}
