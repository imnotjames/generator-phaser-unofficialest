var Preload = function(game) {
	// noop
};

Preload.prototype = {
	preload: function() {
		this.load.image('yeoman', 'images/yeoman.png');
	},

	create: function() {
		this.state.start('mainmenu');
	}
};

module.exports = Preload;
