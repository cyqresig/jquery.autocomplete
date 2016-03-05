/**
 * @fileOverview 组件事件
 * @author HISAME SHIZUMARU
 * @version
 * Created on 16/3/5.
 */


var handler = require('./handlers');

var event = {

	onInput: function() {

		var $input = this._options.$input;

		$input.on('input', $.proxy(handler.onInputHandler, this));
	},

	onClick: function() {

		var $input = this._options.$input;

		$input.on('click', $.proxy(handler.onClickHandler, this));

	},

	onFoucsIn: function() {

		var $input = this._options.$input;

		$input.on('foucsin', $.proxy(handler.onFoucsInHandler, this));
	},

	onFocusOut: function() {

		var $input = this._options.$input;

		$input.on('focusout', $.proxy(handler.onFocusOutHandler, this));
	},

	onKeyDown: function() {

		var $input = this._options.$input;

		$input.on('keydown', $.proxy(handler.onKeyDownHandler, this));
	},


};

module.exports = event;
