'use strict';
var path = require('path');

var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('phaser generator:app ts', function () {
	before(function (done) {
		helpers.run(path.join( __dirname, '../generators/app' ))
			.withPrompts({
				scriptLanguage: 'typescript'
			})
			.on('end', done);
	});

	it('creates typescript files', function (done) {
		assert.file([
			'src/assets/scripts/Bootstrap.ts',
			'src/assets/scripts/Game/Main.ts',
			'src/assets/scripts/Game/KnownStates.ts',
			'src/assets/scripts/Game/States/Boot.ts',
			'src/assets/scripts/Game/States/Preload.ts',
			'src/assets/scripts/Game/States/MainMenu.ts'
		]);

		done();
	});
});
