'use strict';
var path = require('path');

var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('phaser generator:app js', function () {
	before(function (done) {
		helpers.run(path.join( __dirname, '../generators/app' ))
			.withPrompts({
				scriptLanguage: 'javascript'
			})
			.on('end', done);
	});

	it('creates a javascript-oriented gruntfile', function(done) {
		assert.fileContent('Gruntfile.js', /browserify: \{/);
		assert.fileContent('Gruntfile.js', /'browserify:app'/);

		assert.noFileContent('Gruntfile.js', /'ts:app'/);
		assert.noFileContent('Gruntfile.js', /ts: \{/);


		done();
	});

	it('creates javascript files', function (done) {
		assert.file([
			'src/assets/scripts/index.js',
			'src/assets/scripts/Phaser.js',
			'src/assets/scripts/Game/index.js',
			'src/assets/scripts/Game/States/index.js',
			'src/assets/scripts/Game/States/boot.js',
			'src/assets/scripts/Game/States/mainmenu.js',
			'src/assets/scripts/Game/States/preload.js'
		]);

		done();
	});
});
