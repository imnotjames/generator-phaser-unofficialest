'use strict';
var path = require('path');

var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;

describe('phaser generator:app meta', function () {
	before(function (done) {
		helpers.run(path.join( __dirname, '../generators/app' ))
			.withPrompts({
				appname: 'test app'
			})
			.on('end', done);
	});

	it('creates meta files', function (done) {
		assert.file([
			'.jshintrc',
			'.gitignore',
			'.bowerrc',
			'package.json',
			'README.md',
			'Gruntfile.js'
		]);

		done();
	});

	it('creates app files', function (done) {
		assert.file([
			'src/index.html',

			'src/assets/images/yeoman.png',
			'src/assets/styles/app.css'
		]);

		done();
	});
});
