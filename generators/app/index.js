'use strict';

var generators = require('yeoman-generator');

var fs = require('fs');
var util = require('util');
var path = require('path');

var chalk = require('chalk');

var underscoreString = require('underscore.string');

var Generator = module.exports = generators.Base.extend({
	constructor: function () {
		generators.Base.apply(this, arguments);

		this.s = underscoreString;
	},

	initializing: function() {
		this.pkg = require('../../package.json');

		this.appname = this.appname || path.basename(process.cwd());

		this.serverPort = 8080;
	},

	configuring: function() {
		this.config.set('script-language', this.scriptLanguage);

		this.config.save();
	},

	prompting: {
		name: function() {
			var done = this.async();

			this.prompt(
				{
					type: 'input',
					name: 'appname',
					message: 'What\'s the name of your game',
					default: this.appname
				},
				function (answers) {
					this.appname = answers.appname || 'phaser-game';

					done();
				}.bind(this)
			);
		},

		scriptLanguage: function() {
			var done = this.async();

			this.prompt(
				{
					type: 'list',
					name: 'scriptLanguage',
					message: 'Scripting Language',
					choices: [
						{
							value: 'javascript',
							name: 'Javascript'
						},
						{
							value: 'typescript',
							name: 'Typescript'
						}
					],
					default: this.config.get('scriptLanguage') || 'javascript'
				},
				function (answers) {
					this.scriptLanguage = answers.scriptLanguage;

					done();
				}.bind(this)
			);

		},

		build: function () {
			var done = this.async();

			this.prompt(
				{
					type: 'list',
					name: 'phaserBuild',
					message: 'Which build of Phaser do you want?',
					choices: [
						{
							value: 'phaser.js',
							name: 'Standard'
						},
						{
							value: 'custom/phaser-arcade-physics.js',
							name: 'Arcade Physics Only'
						},
						{
							value: 'custom/phaser-no-physics.js',
							name: 'No Physics'
						},
						{
							value: 'custom/phaser-minimum.js',
							name: 'Minimum'
						}
					]
				},
				function (answers) {
					this.phaserBuild = answers.phaserBuild || 'phaser.js';

					done();
				}.bind(this)
			);
		},

		resolution: function() {
			var done = this.async();

			this.prompt(
				[
					{
						type: 'input',
						name: 'width',
						message: 'What\'s pixel width of your game',
						validate: function(n) { return n === +n && n === (n|0); },
						filter: function(n) { return +n; },
						default: 800
					},
					{
						type: 'input',
						name: 'height',
						message: 'What\'s pixel width of your game',
						validate: function(n) { return n === +n && n === (n|0); },
						filter: function(n) { return +n; },
						default: 600
					}
				],
				function (answers) {
					this.appResolution = {
						'width': answers.width,
						'height': answers.height
					};

					done();
				}.bind(this)
			);
		}

	},

	writing: {
/*
		gruntfile: function() {
			this.gruntfile.loadNpmTasks([
				'grunt-browserify',
				'grunt-contrib-connect',
				'grunt-contrib-copy',
				'grunt-contrib-jshint',
				'grunt-contrib-watch'
			]);

			this.gruntfile.insertConfig(
				'copy',
				JSON.stringify({
					app: {
						files: [
							{
								src: 'src/index.html',
								dest: 'dist/index.html'
							},
							{
								expand: true,
								cwd: 'src/',
								src: 'assets/images/**',
								dest: 'dist/'
							},
							{
								expand: true,
								cwd: 'src/',
								src: 'assets/fonts/**',
								dest: 'dist/'
							},
							{
								expand: true,
								cwd: 'src/',
								src: 'assets/tilemap/**',
								dest: 'dist/'
							},
							{
								src: path.join('bower_components/phaser-official/build/', this.phaserBuild),
								dest: 'dist/assets/scripts/phaser.js'
							},
						]
					}
				})
			);

			if (this.scriptLanguage === 'javascript') {
				this.gruntfile.insertConfig(
					'jshint',
					JSON.stringify({
						options: {
							jshintrc: '.jshintrc'
						},
						app: [ 'src/assets/scripts/*.js' ]
					})
				);

				this.gruntfile.insertConfig(
					'browserify',
					JSON.stringify({
						app: {
							files: {
								'dist/assets/scripts/app.js' : [
									'src/assets/scripts/index.js'
								]
							},
							options: {
								transform: [ 'browserify-shim' ],
								browserifyOptions: {
									paths: [
										'src/assets/scripts'
									]
								}
							}
						}
					})
				)
			}

			this.gruntfile.insertConfig(
				'connect',
				JSON.stringify({
					app: {
						options: {
							port: this.serverPort,
							base: 'dist/'
						}
					}
				})
			);

			this.gruntfile.insertConfig(
				'watch',
				JSON.stringify({
					app: {
						files: [
							'src/**'
						],
						tasks: [ 'default' ]
					}
				})
			);

			this.gruntfile.registerTask('default', [ 'browserify:app', 'copy:app' ]);
			this.gruntfile.registerTask('serve', [ 'default', 'connect:app', 'watch:app' ]);
		},
*/
		meta: function() {
			this.fs.copy(
				this.templatePath('common/meta/_jshintrc'),
				this.destinationPath('.jshintrc')
			);

			this.fs.copy(
				this.templatePath('common/meta/_bowerrc'),
				this.destinationPath('.bowerrc')
			);

			this.fs.copy(
				this.templatePath('common/meta/_gitignore'),
				this.destinationPath('.gitignore')
			);

			this.fs.copyTpl(
				this.templatePath('common/meta/_bower.json'),
				this.destinationPath('bower.json'),
				this
			);

			this.fs.copyTpl(
				this.templatePath('common/meta/_package.json'),
				this.destinationPath('package.json'),
				this
			);

			this.fs.copyTpl(
				this.templatePath('common/meta/README.md'),
				this.destinationPath('README.md'),
				this
			);

			// The grunt editor included with yeoman is a bit buggy
			// so until it's fixed we'll do the gruntfile this way.
			this.fs.copyTpl(
				this.templatePath('common/meta/_Gruntfile.js'),
				this.destinationPath('Gruntfile.js'),
				this
			);
		},

		app: function() {
			this.fs.copy(
				this.templatePath('common/app/assets/'),
				this.destinationPath('src/assets/')
			);

			this.fs.copyTpl(
				this.templatePath('common/app/index.html'),
				this.destinationPath('src/index.html'),
				this
			);
		},

		scripts: function() {
			this.fs.copyTpl(
				this.templatePath(path.join('scripts/', this.scriptLanguage)),
				this.destinationPath('src/assets/scripts/'),
				this
			);
		}
	},

	install: function() {
		this.installDependencies();
	}
});
