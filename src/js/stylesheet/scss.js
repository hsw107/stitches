/**
 * # stylesheet/scss
 *
 * Base constructor for the SCSS stylesheet manager
 *
 * > http://draeton.github.io/stitches<br/>
 * > Copyright 2016 Johannes Walter<br/>
 * > Licensed under the MIT license.
 */

define([
    "wrap/jquery",
    "util/util",
    "util/templates",
    "stylesheet/base"
],
function ($, util, templates, BaseStylesheet) {

    "use strict";

    var defaults = {
        filename: "spritesheet.png"
    };

    /**
     * ## ScssStylesheet
     * Create a new `ScssStylesheet` instance
     *
     * @constructor
     * @param {object} options
     */
    var ScssStylesheet = function (options) {
        this.settings = $.extend({}, defaults, options);
    };

    util.inherit(ScssStylesheet, BaseStylesheet, {
        template: templates.scssMarkup,

        /**
         * ### @get
         * Returns a stylesheet to place images with spritesheet
         *
         * @param {array} sprites A list of sprites
         * @param {string} spritesheet The data URL of the spritesheet
         * @param {string} prefix Used to create CSS classes
         * @param {boolean} uri Switch including image as data URI
         * @return string
         */
        get: function (sprites, spritesheet, prefix, uri) {
            var backgroundImage = uri ? spritesheet : this.settings.filename;

            return templates.scss({
                prefix: prefix,
                backgroundImage: backgroundImage,
                sprites: sprites
            });
        }
    });

    return ScssStylesheet;

});
