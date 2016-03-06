/**
 * @fileOverview 组件事件
 * @author HISAME SHIZUMARU
 * @version
 * Created on 16/3/5.
 */


var handler = require('./handlers');

var event = {

	searchInput: {

		onInput: function() {

			var $input = this._options.$input;

			$input.on('input', $.proxy(handler.searchInput.onInputHandler, this));
		},

		onClick: function() {

			var $input = this._options.$input;

			$input.on('click', $.proxy(handler.searchInput.onClickHandler, this));

		},

		onFoucsIn: function() {

			var $input = this._options.$input;

			$input.on('foucsin', $.proxy(handler.searchInput.onFoucsInHandler, this));
		},

		onFocusOut: function() {

			var $input = this._options.$input;

			$input.on('focusout', $.proxy(handler.searchInput.onFocusOutHandler, this));
		},

		onKeyDown: function() {

			var $input = this._options.$input;

			$input.on('keydown', $.proxy(handler.searchInput.onKeyDownHandler, this));
		},

	},

	searchMenu: {

		onMouseEnter: function() {

			var $searchMenu = this._attrs.$searchMenu;

			$searchMenu.on('mouseenter', this._attrs.searchItemSelector, $.proxy(handler.searchMenu.onMouseEnterHandler, this));

		},

		onMouseLeave: function() {

			var $searchMenu = this._attrs.$searchMenu;

			$searchMenu.on('mouseleave', $.proxy(handler.searchMenu.onMouseLeaveHandler, this));

		},

		onClick: function() {

			var $searchMenu = this._attrs.$searchMenu;

			$searchMenu.on('click', this._attrs.searchItemSelector, $.proxy(handler.searchMenu.onClickHandler, this));

		}

	},

};

module.exports = event;
