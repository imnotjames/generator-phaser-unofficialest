'use strict';

var generators = require('yeoman-generator');
var path = require('path');
var fs = require('fs');

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

	default: {
		loadOldStates: function() {
			this.states = {};

			var trimExtension = function(value) {
				return value.substring(
					0,
					value.length - path.extname(value).length
				);
			};

			var files;

			try {
				files = fs.readdirSync(this.destinationPath('src/assets/scripts/Game/States/'));
			} catch (e) {
				// The directory doesn't exist, so make an empty array
				files = [];
			}

			// Add on the new file last so it gets included
			files.push(this.stateDestinationFilename);

			for(var i = 0; i < files.length; i++) {
				if (this.scriptLanguage === 'javascript') {
					if (files[i] === 'index.js') {
						// Skip the old state listing
						continue;
					}
				}

				var state = this.s(files[i])
					.tap(trimExtension)
					.humanize()
					.underscored();

				if (this.scriptLanguage === 'javascript') {
					this.states[state.value()] = './' + files[i];
				} else if (this.scriptLanguage === 'typescript') {
					this.states[state.value()] = this.s.classify(trimExtension(files[i]));
				}
			}
		}
	},

	writing: function() {
		this.fs.copyTpl(
			this.templatePath(path.join('scripts/', this.scriptLanguage, this.stateTemplateFilename)),
			this.destinationPath(path.join('src/assets/scripts/Game/States/', this.stateDestinationFilename)),
			this
		);

		this.fs.copyTpl(
			this.templatePath(path.join('scripts/', this.scriptLanguage, this.stateListFilename)),
			this.destinationPath(path.join('src/assets/scripts/Game/', this.stateListFilename)),
			this
		)
	},

});
