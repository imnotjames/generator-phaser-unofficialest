var Phaser = require('Phaser');
var KnownStates = require("./States");

var Game = function (element) {
	Phaser.Game.call(
		this,
		<%- JSON.stringify(appResolution.width) %>,
		<%- JSON.stringify(appResolution.height) %>,
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

Game.prototype.boot = function() {
	Phaser.Game.prototype.boot.apply(this, arguments);

	if (this.isRunning) {
		this.load.baseURL = 'assets/';
		this.state.start('boot');
	}
};

module.exports = Game;
