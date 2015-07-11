# generator-phaser-unofficialest [![Build Status](https://travis-ci.org/imnotjames/generator-phaser-unofficialest.svg)](https://travis-ci.org/imnotjames/generator-phaser-unofficialest)

An unofficial [Yeoman](http://yeoman.io/) generator to generate games with [phaser](http://phaser.io/).

For Javascript, scripts are broken up into CommonJS modules to make it easier to
build clean code, using `browserify` to create a usable `app.js`.

For Typescript, scripts are classes under the Game module.

## Usage

Install `yo`, `bower`, `grunt-cli`, and `generator-phaser-unofficialest`

```
npm-install -g yo bower grunt-cli generator-phaser-unofficialest
```

Create a new directory for the project, and change to that directory
```
mkdir my-cool-game && cd my-cool-game
```

Run `yo phaser-unofficialest`
```
yo phaser-unofficialest
```

## Generators

Available Generators:

* [phaser-unofficialest](#app)
* [phaser-unofficialest:state](#app)


### App

Sets up the Phaser application, giving you a bit of boilerplate to get started.

The following packages are installed by the generator.

* `phaser-official`
* `lodash`

These are compiled into the application with `grunt`.


### State

Sets up a new Phaser State, choosing the boilerplate language that you have
chosen for your application.

An optional argument allows you to set the name non-interactively.  Otherwise,
a name will be requested.
