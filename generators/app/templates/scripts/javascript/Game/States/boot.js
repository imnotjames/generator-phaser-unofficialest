var Boot = function(game) {
	// noop
};

Boot.prototype = {
	preload: function() {
		this.load.baseURL = 'assets/';
	},

	create: function() {
		this.game.stage.backgroundColor = '#CCC';

		this.game.time.advancedTiming = true;

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.parentIsWindow = true;

		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

		this.state.start('preload');
	},
};

module.exports = Boot;
