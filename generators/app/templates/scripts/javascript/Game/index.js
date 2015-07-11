var Phaser = require('../Phaser');
var KnownStates = require("./States");

var Game = function (element) {
	Phaser.Game.call(
		this,
		<%= appResolution.width %>,
		<%= appResolution.height %>,
		Phaser.AUTO,
		element
	);

	for (var state in KnownStates) {
		if (!KnownStates.hasOwnProperty(state)) {
			continue;
		}

		this.state.add(
			state,
			KnownStates[state]
		);
	}
};

Game.prototype = Object.create(Phaser.Game.prototype);
Game.prototype.constructor = Game;

Game.prototype.startup = function() {
	// Any other code before we startup

	this.state.start('boot');
};

module.exports = Game;
