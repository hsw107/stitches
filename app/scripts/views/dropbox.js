/**
 * # views/dropbox
 *
 * Constructor for the drag and drop view. Used to allow users to drag
 * files onto a DOM element to initiate processing
 *
 * > http://draeton.github.io/stitches<br/>
 * > Copyright 2013 Matthew Cobbs<br/>
 * > Licensed under the MIT license.
 */

var config = require('../config');
var messages = require('../messages');
var template = require('../templates/dropbox.hbs');

/**
 * @return {DropboxView}
 */
module.exports = Backbone.View.extend({

	/**
	 * @type {Object}
	 */
	events: {
		'dragenter .dropbox': 'onDragStart',
		'dragleave .overlay': 'onDragStop',
		'dragexit .overlay': 'onDragStop',
		'dragover .overlay': 'onDragOver',
		'drop .overlay': 'onDrop'
	},

	/**
	 * Set up instance properties and call startup methods
	 */
	initialize: function () {
		console.info('dropbox : initialize()');

		this.elements = {};

		// prepare in dom
		this.render();
	},

	/**
	 * Create the html for the view and append to the element.
	 *
	 * @return {View}
	 */
	render: function () {
		console.info('dropbox : render()');

		var html = template();

		this.$el.empty().append(html);
		this.elements.dropbox = this.$el.find('.dropbox');
		this.elements.overlay = this.$el.find('.overlay');

		return this;
	},

	/**
	 * Show the overlay
	 */
	showOverlay: function () {
		console.info('dropbox : showOverlay()');

		this.elements.overlay.addClass('active');
	},

	/**
	 * Hide the overlay
	 */
	hideOverlay: function () {
		console.info('dropbox : hideOverlay()');

		this.elements.overlay.removeClass('active');
	},

	/**
	 * Close all palettes and block the UI when dragging
	 *
	 * @param {Event} e
	 */
	onDragStart: function () {
		console.info('dropbox : onDragStart()');

		messages.trigger(config.events.close);
		messages.trigger(config.events.busy);
	},

	/**
	 * If we're on the target, unblock the UI
	 *
	 * @param {Event} e
	 */
	onDragStop: function (e) {
		console.info('dropbox : onDragStop()');

		var contains = $.contains(this.el, e.target);

		if (contains) {
			messages.trigger(config.events.idle);
		}
	},

	/**
	 * Do nothing
	 *
	 * @param {Event} e
	 */
	onDragOver: function (e) {
		console.info('dropbox : onDragOver()');

		e.preventDefault();
	},

	/**
	 * When a drop event occurs, check for files. If there are files, start
	 * processing them
	 *
	 * @param {Event} e
	 */
	onDrop: function (e) {
		console.info('dropbox : onDrop()');

		e.originalEvent.stopPropagation();
		e.originalEvent.preventDefault();

		var files = (e.originalEvent.files || e.originalEvent.dataTransfer.files);

		if (files.length) {
			messages.trigger(config.events.process, files);
		} else {
			messages.trigger(config.events.idle);
		}
	}

});