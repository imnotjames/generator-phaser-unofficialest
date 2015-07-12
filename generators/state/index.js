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
			var scriptLanguageCallback = function(answers) {
				this.scriptLanguage = answers.scriptLanguage;

				if (this.scriptLanguage === 'javascript') {
					this.stateTemplateFilename = 'state.js';
					this.stateDestinationFilename = this.s(this.statename).slugify().value() + '.js';
					this.stateListFilename = 'States/index.js';
				} else if (this.scriptLanguage === 'typescript') {
					this.stateTemplateFilename = 'State.ts';
					this.stateDestinationFilename = this.s(this.statename).classify().value() + '.ts';
					this.stateListFilename = 'KnownStates.ts';
				}
			}.bind(this);

			if (this.config.get('script-language')) {
				scriptLanguageCallback({
					scriptLanguage: this.config.get('script-language')
				});

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
				scriptLanguageCallback
			);

		},
	},

	writing: function() {
		this.fs.copyTpl(
			this.templatePath(path.join('scripts/', this.scriptLanguage, this.stateTemplateFilename)),
			this.destinationPath(path.join('src/assets/scripts/Game/States/', this.stateDestinationFilename)),
			this
		);
	},

});
