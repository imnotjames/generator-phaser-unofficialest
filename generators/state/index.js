'use strict';

var generators = require('yeoman-generator');
var path = require('path');

var underscoreString = require('underscore.string');

var Generator = module.exports = generators.Base.extend({
	constructor: function () {
		generators.Base.apply(this, arguments);

		this.argument('statename', { type: String, required: false });

		this.s = underscoreString;
	},

	initializing: function() {
		this.pkg = require('../../package.json');
	},

	configuring: function() {
		this.config.set('script-language', this.scriptLanguage);

		this.config.save();
	},

	prompting: {
		name: function() {
			if (this.statename) {
				return;
			}

			var done = this.async();

			this.prompt(
				{
					type: 'input',
					name: 'statename',
					message: 'State Name',
					default: this.statename
				},
				function (answers) {
					this.statename = answers.statename || 'state';

					done();
				}.bind(this)
			);
		},

		scriptLanguage: function() {
			if (this.config.get('script-language')) {
				this.scriptLanguage = this.config.get('script-language');

				return;
			}

			var done = this.async();

			this.prompt(
				{
					type: 'list',
					name: 'scriptLanguage',
					message: 'Boilerplate Scripting Language',
					choices: [
						{
							value: 'javascript',
							name: 'Javascript'
						},
						{
							value: 'typescript',
							name: 'Typescript'
						}
					]
				},
				function (answers) {
					this.scriptLanguage = answers.scriptLanguage;

					done();
				}.bind(this)
			);

		},
	},

	writing: function() {
		var inputFilename;
		var outputFilename;

		if (this.scriptLanguage === 'javascript') {
			inputFilename = 'state.js';
			outputFilename = this.s(this.statename).slugify().value() + '.js';

		} else if (this.scriptLanguage === 'typescript') {
			inputFilename = 'State.ts';
			outputFilename = this.s(this.statename).classify().value() + '.ts';
		}

		this.fs.copyTpl(
			this.templatePath(path.join('scripts/', this.scriptLanguage, inputFilename)),
			this.destinationPath(path.join('src/assets/scripts/Game/States/', outputFilename)),
			this
		);
	},

});
