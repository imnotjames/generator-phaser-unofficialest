# generator-phaser-unofficialest [![Build Status](https://travis-ci.org/imnotjames/generator-phaser-unofficialest.svg)](https://travis-ci.org/imnotjames/generator-phaser-unofficialest)

An unofficial [Yeoman](http://yeoman.io/) generator to generate games with [phaser](http://phaser.io/).

The scripts are broken up into CommonJS modules to make it easier to build clean
code, using `browserify` to create a usable `app.js`.

## Usage

Install `yo`, `bower`, `grunt-cli`, and `generator-phaser-unnoficialest`

```
npm-install -g yo bower grunt-cli generator-phaser-unnoficialest
```

Create a new directory for the project, and change to that directory
```
mkdir my-cool-game && cd my-cool-game
```

Run `yo phaser-unnoficialest`
```
yo phaser-unnoficialest
```

## Generators

Available Generators:

* [phaser-unofficialest](#app)


### App

Sets up the Phaser application, giving you a bit of boilerplate to get started.

The following packages are installed by the generator.

* `phaser-official`
* `lodash`

These are compiled into the application with `grunt` and `browserify`.
