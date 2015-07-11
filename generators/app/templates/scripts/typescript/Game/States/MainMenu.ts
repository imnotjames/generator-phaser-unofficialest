module Game.States {
	export class MainMenu extends Phaser.State {
		constructor() {
			super();
		}

		sprite: Phaser.Sprite;

		create() {
			this.sprite = this.game.add.sprite(400, 300, 'yeoman');
			this.sprite.anchor.setTo(0.5, 0.5);
		}

		update() {
			this.sprite.angle += 1;
		}
	}
}
