var Phaser = require('../Phaser');

var Game = {};

Game.States = require("./States");

Game.boot = function(element) {
	var phaserGame = new Phaser.Game(
		<%= appResolution.width %>,
		<%= appResolution.height %>,
		Phaser.AUTO,
		element
	);

	for (var state in Game.States) {
		if (Game.States.hasOwnProperty(state)) {
			phaserGame.state.add(
				state,
				Game.States[state]
			);
		}
	}

	phaserGame.state.start('boot');
};

module.exports = Game;
