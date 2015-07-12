var Phaser = require('Phaser');

var <%- s(statename).classify().value() %> = module.exports = function() {
	Phaser.State.apply(this);
};

<%- s(statename).classify().value() %>.prototype = Object.create(Phaser.State.prototype);
<%- s(statename).classify().value() %>.prototype.constructor = <%- s(statename).classify().value() %>;


<%- s(statename).classify().value() %>.prototype.init = function() {
	//
};

<%- s(statename).classify().value() %>.prototype.preload = function() {
	//
};

<%- s(statename).classify().value() %>.prototype.loadUpdate = function() {
	//
};

<%- s(statename).classify().value() %>.prototype.loadRender = function() {
	//
};

<%- s(statename).classify().value() %>.prototype.create = function() {
	//
};

<%- s(statename).classify().value() %>.prototype.update = function() {
	//
};

<%- s(statename).classify().value() %>.prototype.render = function() {
	//
};

<%- s(statename).classify().value() %>.prototype.resize = function() {
	//
};

<%- s(statename).classify().value() %>.prototype.paused = function() {
	//
};

<%- s(statename).classify().value() %>.prototype.pauseUpdate = function() {
	//
};

<%- s(statename).classify().value() %>.prototype.shutdown = function() {
	//
};
