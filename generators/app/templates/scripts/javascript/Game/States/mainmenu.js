var MainMenu = function(game) {
	// noop
};

MainMenu.prototype = {
	create: function() {
		this.sprite = this.game.add.sprite(400, 300, 'yeoman');
		this.sprite.anchor.setTo(0.5, 0.5);
	},

	update: function() {
		this.sprite.angle += 1;
	}
}

module.exports = MainMenu;
