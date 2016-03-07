/**
 * @fileOverview 组件初始化, 定义实例, 引用css, 引用模板, 引用其他依赖模板
 * @author HISAME SHIZUMARU
 * @version
 * Created on 16/3/5.
 */


;'use strict';

require('./autocomplete.css');
var attrs = require('./attrs');
var defaults = require('./options');
var events = require('./events');


function AutoComplete(options) {

	var that = this;

	that._options = $.extend({}, defaults, options);

	that._attrs = $.extend({}, attrs);

	$.each(events.searchInput, function(eventType, bindEvent) {

		bindEvent.call(that);

	});

	//check options, if error, throw custom Error
	//@todo

	//return this;
}

//AutoComplete.prototype = {
//
//};

module.exports = AutoComplete;