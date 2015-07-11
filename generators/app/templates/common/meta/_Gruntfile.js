module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-ts');

	grunt.initConfig({

<% if (scriptLanguage === 'javascript') { %>

		jshint: {
			options: { jshintrc: '.jshintrc' },
			app: ['src/assets/scripts/*.js']
		},

		browserify: {
			app: {
				files: { 'dist/assets/scripts/app.js': ['src/assets/scripts/index.js'] },
				options: {
					transform: ['browserify-shim'],
					browserifyOptions: { paths: ['src/assets/scripts'] }
				}
			}
		},

<% } else if (scriptLanguage === 'typescript') { %>

		ts: {
			app: {
				src: [
					"bower_components/phaser-official/typescript/phaser.d.ts",
					"src/assets/scripts/**/*.ts"
				],
				out: 'dist/assets/scripts/app.js',
				options: {
					fast: 'never'
				}
			}
		},

<% } %>

		copy: {
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
						expand: true,
						cwd: 'src/',
						src: 'assets/styles/**',
						dest: 'dist/'
					},
					{
						src: 'bower_components/phaser-official/build/<%= phaserBuild %>',
						dest: 'dist/assets/scripts/phaser.js'
					}
				]
			}
		},

		connect: {
			app: {
				options: {
					port: <%= serverPort %>,
					base: 'dist/'
				}
			}
		},
		watch: {
			app: {
				files: ['src/**'],
				tasks: ['default']
			}
		}
	});
	grunt.registerTask('default', [
		<% if (scriptLanguage === 'javascript') { %>
		'browserify:app',
		<% } else if (scriptLanguage === 'typescript') { %>
		'ts:app',
		<% } %>
		'copy:app'
	]);
	grunt.registerTask('serve', [
		'default',
		'connect:app',
		'watch:app'
	]);
};
